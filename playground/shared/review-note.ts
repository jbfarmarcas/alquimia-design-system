export type ReviewNoteStatus = "open" | "resolved";

export type ReviewNote = {
  id: string;
  page: string;
  sectionId: string;
  sectionLabel: string;
  target: string;
  x: number;
  y: number;
  body: string;
  author: string;
  status: ReviewNoteStatus;
  createdAt: string;
  updatedAt: string;
};

export type ReviewNoteDraft = {
  page: string;
  sectionId: string;
  sectionLabel: string;
  target: string;
  x: number;
  y: number;
  body: string;
  author: string;
};

export function reviewPagePath(path: string) {
  const clean = path.trim().replace(/\/+$/, "");
  return clean || "/";
}
