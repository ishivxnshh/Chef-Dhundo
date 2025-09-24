import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

// Use server-side environment variables (without NEXT_PUBLIC_ prefix)
const notionApiKey = process.env.NOTION_USERDB_INT;
const notionDatabaseId = process.env.NOTION_USERDB_ID;

// Function to get database schema
// async function getDatabaseSchema() {
//   if (!notionApiKey || !notionDatabaseId) {
//     throw new Error('Missing Notion credentials');
//   }

//   const notion = new Client({ auth: notionApiKey });
  
//   try {
//     const response = await notion.databases.retrieve({
//       database_id: notionDatabaseId as string,
//     });
    
//     console.log('📋 Database schema:', {
//       properties: Object.keys(response.properties),
//       propertyDetails: response.properties
//     });
    
//     return response.properties;
//   } catch (error) {
//     console.error('❌ Error fetching database schema:', error);
//     throw error;
//   }
// }

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