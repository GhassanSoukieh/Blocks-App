import { Content } from "../Types";
import db from "../../db"; // Adjust the import path as necessary

export const convertDateToString = (date: any): string => {
  // Robustly handle Firestore Timestamp, string, or Date
  if (!date) return "";
  if (date instanceof Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  // Firestore Timestamp
  if (typeof date === "object" && typeof date.seconds === "number") {
    const d = new Date(date.seconds * 1000);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  // ISO string
  if (typeof date === "string") {
    const d = new Date(date);
    if (!isNaN(d.getTime())) {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
  }
  return "";
};

// Converts Firestore Timestamp object to JavaScript Date
export function convertTimestampToDate(ts: any): Date | undefined {
  if (!ts) return undefined;
  if (ts instanceof Date) return ts;
  if (typeof ts === "object" && typeof ts.seconds === "number") {
    return new Date(ts.seconds * 1000);
  }
  return undefined;
}

export async function fetchAndFilterContentByDate(date: Date): Promise<Content[]> {
  const collectionName = "Content";
  try {
    const allContent = await db.get(collectionName);
    const dateString = convertDateToString(date);
    if (!allContent) {
      return [];
    }
    return allContent.filter((content: Content) => {
      const contentDate = content.date ? convertDateToString(content.date) : null;
      return contentDate === dateString;
    });
  } catch (error) {
    console.error("Error fetching or filtering content:", error);
    return [];
  }
}

export function toLocalDateInputValue(date: Date) {
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);
  return localDate.toISOString().split("T")[0];
}