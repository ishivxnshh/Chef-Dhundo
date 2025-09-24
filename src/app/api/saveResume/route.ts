import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const notionApiKey = process.env.NOTION_RESUMEDBSUB_INT;
const notionDatabaseId = process.env.NOTION_RESUMEDBSUB_ID;

export async function GET() {
  // Check if API key and database ID are available
  if (!notionApiKey) {
    console.error('Notion API key is missing');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  if (!notionDatabaseId) {
    console.error('Notion database ID is missing');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  try {
    const notion = new Client({ auth: notionApiKey });
    
    // Convert database ID to string explicitly to avoid type errors
    const response = await notion.databases.query({
      database_id: notionDatabaseId as string,
    });
    
    return NextResponse.json(response.results);
  } catch (error) {
    console.error('Error fetching data from Notion:', error);
    return NextResponse.json({ error: 'Failed to fetch data from Notion' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (!notionApiKey || !notionDatabaseId) {
      return NextResponse.json(
        { error: "Missing Notion credentials" },
        { status: 500 }
      );
    }

    const notion = new Client({ auth: notionApiKey });
    const body = await req.json();

    const {
      name,
      email,
      mobile,
      location,
      age,
      experience,
      jobType,
      cuisines,
      totalExperienceYears,
      currentPosition,
      currentSalary,
      expectedSalary,
      preferredLocation,
      passportNo,
      probationPeriod,
      businessType,
      joiningType,
      readyForTraining,
      candidateConsent,
    } = body;

    await notion.pages.create({
      parent: { database_id: notionDatabaseId },
      properties: {
        Name: { title: [{ text: { content: name } }] },
        Email: { email },
        Mobile: { phone_number: mobile },
        Location: { rich_text: [{ text: { content: location } }] },
        Age: { number: age ? Number(age) : null },
        Experience: { rich_text: [{ text: { content: experience } }] },
        JobType: { select: { name: jobType } },
        Cuisines: { rich_text: [{ text: { content: cuisines } }] },
        TotalExperienceYears: { number: totalExperienceYears ? Number(totalExperienceYears) : null },
        CurrentPosition: { rich_text: [{ text: { content: currentPosition } }] },
        CurrentSalary: { rich_text: [{ text: { content: currentSalary } }] },
        ExpectedSalary: { rich_text: [{ text: { content: expectedSalary } }] },
        PreferredLocation: { rich_text: [{ text: { content: preferredLocation } }] },
        PassportNo: { rich_text: [{ text: { content: passportNo } }] },
        ProbationPeriod: { checkbox: probationPeriod },
        BusinessType: { select: { name: businessType } },
        JoiningType: { select: { name: joiningType } },
        ReadyForTraining: { select: { name: readyForTraining } },
        CandidateConsent: { checkbox: candidateConsent },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Error saving resume to Notion:", error);
    return NextResponse.json(
      { error: "Failed to save resume" },
      { status: 500 }
    );
  }
}
