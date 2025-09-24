export interface NotionFile {
  file: {
    url: string;
  };
}

export interface NotionTitle {
  title: {
    plain_text: string;
  }[];
}

export interface NotionRichText {
  rich_text: {
    plain_text: string;
  }[];
}

export interface NotionDate {
  date: {
    start: string;
  };
}

export interface NotionSelect {
  select: {
    name: string;
  };
}

export interface NotionMultiSelect {
  multi_select: {
    id: string;
    name: string;
  }[];
}

export interface NotionUrl {
  url: string;
}

export interface NotionCheckbox {
  checkbox: boolean;
}

export interface NotionNumber {
  number: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'pro' | 'basic';
  chef: 'yes' | 'no';
  photo?: string;
  createdAt: string;
  updatedAt: string;
}

// Resume Types
export interface Resume {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  education: string;
  skills: string[];
  languages: string[];
  certifications: string[];
  availability: string;
  salary: string;
  photo?: string;
  resumeFile?: string;
  createdAt: string;
  updatedAt: string;
}

// Raw Notion Resume interface for API responses
export interface RawNotionResume {
  id: string;
  properties: {
    name?: NotionRichText;
    email?: NotionTitle;
    mobile?: {
      phone_number: string;
    };
    experience?: NotionNumber;
    profession?: NotionSelect;
    location?: NotionRichText;
    education?: NotionRichText;
    skills?: NotionMultiSelect;
    languages?: NotionMultiSelect;
    certifications?: NotionMultiSelect;
    availability?: NotionSelect;
    salary?: NotionRichText;
    photo?: NotionFile;
    'Resume File'?: NotionFile;
    'Created time'?: NotionDate;
    'Last edited time'?: NotionDate;
  };
  created_time: string;
  last_edited_time: string;
}

// Helper function to extract plain text from Notion rich text
export function extractPlainText(richText: NotionRichText | undefined): string {
  if (!richText || !richText.rich_text) return '';
  return richText.rich_text.map(text => text.plain_text).join('');
}

// Helper function to extract title text from Notion title
export function extractTitleText(title: NotionTitle | undefined): string {
  if (!title || !title.title) return '';
  return title.title.map(text => text.plain_text).join('');
}

// Helper function to extract multi-select values
export function extractMultiSelect(multiSelect: NotionMultiSelect | undefined): string[] {
  if (!multiSelect || !multiSelect.multi_select) return [];
  return multiSelect.multi_select.map(item => item.name);
}

// Helper function to extract select value
export function extractSelect(select: NotionSelect | undefined): string {
  if (!select || !select.select) return '';
  return select.select.name;
}

// Helper function to extract file URL
export function extractFileUrl(file: NotionFile | undefined): string {
  if (!file || !file.file) return '';
  return file.file.url;
}

// Helper function to extract date
export function extractDate(date: NotionDate | undefined): string {
  if (!date || !date.date) return '';
  return date.date.start;
}

// Helper function to extract phone number
export function extractPhoneNumber(phone: { phone_number: string } | undefined): string {
  if (!phone || !phone.phone_number) return '';
  return phone.phone_number;
}