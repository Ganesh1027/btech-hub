export enum AcademicYear {
  FIRST = '1st Year',
  SECOND = '2nd Year',
  THIRD = '3rd Year',
  FOURTH = '4th Year',
}

export enum MaterialType {
  PDF = 'PDF',
  IMAGE = 'Image',
  YOUTUBE = 'YouTube',
}

export interface Material {
  id: string;
  title: string;
  type: MaterialType;
  year: AcademicYear;
  url: string; // For PDFs and YouTube links, or Base64 data URL for images
  fileName?: string; // For PDF file name
  uploaderId: string; // To track who can delete the material
}

export interface DiscussionMessage {
    id: string;
    author: string;
    authorId: string;
    text: string;
    timestamp: Date;
}