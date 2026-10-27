// Update the Word CV and run npm run cv:sync; do not duplicate entries here.
import type { Presentation } from "../types";
import cv from "./generated/cv.json";

export const presentations: Presentation[] = cv.data.presentations;
