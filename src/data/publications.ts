// Update the Word CV and run npm run cv:sync; do not duplicate entries here.
import type { Publication } from "../types";
import cv from "./generated/cv.json";

export const publications: Publication[] = cv.data.publications;
