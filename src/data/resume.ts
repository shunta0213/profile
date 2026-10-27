// CV content is generated from content/cv/Shunta_Ide_CV.docx.
// Update the Word document and run npm run cv:sync.
import cv from "./generated/cv.json";

export interface Education {
  degree: string;
  institution: string;
  period: string;
  details?: string[];
}

export interface Experience {
  title: string;
  organization: string;
  period: string;
  description: string[];
  url?: string;
}

export interface Activity {
  title: string;
  organization: string;
  url?: string;
  period: string;
  description: string[];
}

export const education: Education[] = cv.data.education;
export const research: Experience[] = cv.data.research;
export const teaching: Experience[] = cv.data.teaching;
export const experience: Experience[] = cv.data.experience;
export const honors: Activity[] = cv.data.honors;
export const activities: Activity[] = cv.data.activities;
