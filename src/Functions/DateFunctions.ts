import { Content } from "../Types";

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

export function getContentForDate(
  contents: Content[] | undefined,
  date: Date
): Content[] {
  if (!contents || contents.length === 0) return [];

  const dateString = convertDateToString(date);
  return contents.filter((content) => {
    const contentDate = content.date ? convertDateToString(content.date) : null;
    return contentDate === dateString;
  });
}
