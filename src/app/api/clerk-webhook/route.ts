import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

// Init Notion client
const notion = new Client({ auth: process.env.NOTION_RESUMEDB_INT });
const databaseId = process.env.NOTION_RESUMEDB_ID!;

export async function POST(req: Request) {
  try {
    const event = await req.json();

    // Clerk sends event type
    if (event.type === "user.created") {
      const user = event.data;

      // Extract user info
      const name =
        `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
        user.username ||
        "Unnamed User";
      const email = user.email_addresses?.[0]?.email_address || "no-email";

      // Write to Notion DB
      await notion.pages.create({
        parent: { database_id: databaseId },
        properties: {
          name: { title: [{ text: { content: name } }] },
          email: { email },
          role: { select: { name: "basic" } }, // default role
          chef: { select: { name: "no" } },    // default chef
        },
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
