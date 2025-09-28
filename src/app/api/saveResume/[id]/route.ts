import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import type { UpdatePageParameters } from "@notionhq/client/build/src/api-endpoints";

const notionApiKey = process.env.NOTION_RESUMEDBSUB_INT;
const notionDatabaseId = process.env.NOTION_RESUMEDBSUB_ID;

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!notionApiKey || !notionDatabaseId) {
      return NextResponse.json(
        { error: "Missing Notion credentials" },
        { status: 500 }
      );
    }

    const notion = new Client({ auth: notionApiKey });
    const body = await req.json();
    const resolvedParams = await params;
    const resumeId = resolvedParams.id;

    const {
      name,
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

    // Build properties object with only provided fields
    const properties: UpdatePageParameters['properties'] = {};

    if (name !== undefined) {
      properties.Name = { title: [{ text: { content: name } }] };
    }
    if (mobile !== undefined) {
      properties.Mobile = { phone_number: mobile };
    }
    if (location !== undefined) {
      properties.Location = { rich_text: [{ text: { content: location } }] };
    }
    if (age !== undefined) {
      properties.Age = { number: age ? Number(age) : null };
    }
    if (experience !== undefined) {
      properties.Experience = { rich_text: [{ text: { content: experience } }] };
    }
    if (jobType !== undefined) {
      properties.JobType = { select: { name: jobType } };
    }
    if (cuisines !== undefined) {
      properties.Cuisines = { rich_text: [{ text: { content: cuisines } }] };
    }
    if (totalExperienceYears !== undefined) {
      properties.TotalExperienceYears = { number: totalExperienceYears ? Number(totalExperienceYears) : null };
    }
    if (currentPosition !== undefined) {
      properties.CurrentPosition = { rich_text: [{ text: { content: currentPosition } }] };
    }
    if (currentSalary !== undefined) {
      properties.CurrentSalary = { rich_text: [{ text: { content: currentSalary } }] };
    }
    if (expectedSalary !== undefined) {
      properties.ExpectedSalary = { rich_text: [{ text: { content: expectedSalary } }] };
    }
    if (preferredLocation !== undefined) {
      properties.PreferredLocation = { rich_text: [{ text: { content: preferredLocation } }] };
    }
    if (passportNo !== undefined) {
      properties.PassportNo = { rich_text: [{ text: { content: passportNo } }] };
    }
    if (probationPeriod !== undefined) {
      properties.ProbationPeriod = { checkbox: probationPeriod };
    }
    if (businessType !== undefined) {
      properties.BusinessType = { select: { name: businessType } };
    }
    if (joiningType !== undefined) {
      properties.JoiningType = { select: { name: joiningType } };
    }
    if (readyForTraining !== undefined) {
      properties.ReadyForTraining = { select: { name: readyForTraining } };
    }
    if (candidateConsent !== undefined) {
      properties.CandidateConsent = { checkbox: candidateConsent };
    }

    await notion.pages.update({
      page_id: resumeId,
      properties,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Error updating resume in Notion:", error);
    return NextResponse.json(
      { error: "Failed to update resume" },
      { status: 500 }
    );
  }
}
