import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  try {
    const res = await fetch("https://medium.com/feed/@tanyas27", {
      next: { revalidate: 3600 }, // Cache on Next.js server for 1 hour
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch Medium RSS feed: ${res.status}`);
    }

    const xmlText = await res.text();

    // Simple regex-based XML parser for <item> tags
    const items: any[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    while ((match = itemRegex.exec(xmlText)) !== null) {
      const itemContent = match[1];

      // Extract title
      const titleMatch = itemContent.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/) || itemContent.match(/<title>([\s\S]*?)<\/title>/);
      const title = titleMatch ? titleMatch[1].trim() : "";

      // Extract link
      const linkMatch = itemContent.match(/<link>([\s\S]*?)<\/link>/);
      const link = linkMatch ? linkMatch[1].trim() : "";

      // Extract pubDate
      const pubDateMatch = itemContent.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
      const pubDateText = pubDateMatch ? pubDateMatch[1].trim() : "";

      // Format date to a readable form (e.g. "May 12, 2026")
      let date = pubDateText;
      try {
        if (pubDateText) {
          const d = new Date(pubDateText);
          date = d.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });
        }
      } catch (e) {
        // Fallback to raw pubDate
      }

      // Extract categories (tags)
      const categories: string[] = [];
      const categoryRegex = /<category><!\[CDATA\[([\s\S]*?)\]\]><\/category>/g;
      let catMatch;
      while ((catMatch = categoryRegex.exec(itemContent)) !== null) {
        categories.push(catMatch[1].trim());
      }
      if (categories.length === 0) {
        const categoryRegexNoCdata = /<category>([\s\S]*?)<\/category>/g;
        while ((catMatch = categoryRegexNoCdata.exec(itemContent)) !== null) {
          categories.push(catMatch[1].trim());
        }
      }

      // Extract content or description to find image and text
      const contentMatch =
        itemContent.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/) ||
        itemContent.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/) ||
        itemContent.match(/<description>([\s\S]*?)<\/description>/);

      const content = contentMatch ? contentMatch[1] : "";

      // Find the first image src inside the content
      const imgRegex = /<img[^>]+src=["']([^"']+)["']/i;
      const imgMatch = content.match(imgRegex);
      let imageUrl = "";
      if (imgMatch && imgMatch[1]) {
        imageUrl = imgMatch[1];
      }

      // If no image is found in description/content, check for enclosures
      if (!imageUrl) {
        const mediaMatch =
          itemContent.match(/<media:content[^>]+url=["']([^"']+)["']/i) ||
          itemContent.match(/<enclosure[^>]+url=["']([^"']+)["']/i);
        if (mediaMatch && mediaMatch[1]) {
          imageUrl = mediaMatch[1];
        }
      }

      // Extract excerpt - strip HTML tags from content and take first 160 characters
      let excerpt = "";
      if (content) {
        excerpt = content
          .replace(/<[^>]+>/g, " ") // replace tags with spaces
          .replace(/\s+/g, " ")     // normalize whitespace
          .trim();

        if (excerpt.length > 160) {
          excerpt = excerpt.substring(0, 157) + "...";
        }
      }

      // Generate ID from guid or title hash
      const guidMatch = itemContent.match(/<guid[^>]*>([\s\S]*?)<\/guid>/);
      const guid = guidMatch ? guidMatch[1].trim() : "";
      const id = guid.split("/").pop() || Math.random().toString(36).substring(7);

      // Approximate read time based on word count (200 words per minute)
      const wordCount = content.replace(/<[^>]+>/g, "").split(/\s+/).length;
      const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

      // Map raw tags to nicer displays (optional)
      const formattedTags = categories.length > 0 
        ? categories.slice(0, 3).map(tag => tag.charAt(0).toUpperCase() + tag.slice(1)) 
        : ["Medium", "Writing"];

      items.push({
        id,
        title,
        excerpt,
        date,
        readTime,
        tags: formattedTags,
        link,
        imageUrl,
      });
    }

    return NextResponse.json({ posts: items });
  } catch (error: any) {
    console.error("Error fetching/parsing Medium RSS:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
