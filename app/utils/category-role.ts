export const CATEGORY_ROLES = [
  "destination",
  "routine",
  "seasonal",
  "convenience",
] as const;

export type CategoryRole = (typeof CATEGORY_ROLES)[number];

const CATEGORY_ROLE_LABELS: Record<CategoryRole, string> = {
  destination: "Destino",
  routine: "Rotina",
  seasonal: "Sazonal",
  convenience: "Conveniência",
};

export const CATEGORY_ROLE_OPTIONS = CATEGORY_ROLES.map((role) => ({
  label: CATEGORY_ROLE_LABELS[role],
  value: role,
}));

export const formatCategoryRole = (role: CategoryRole | null): string =>
  role ? CATEGORY_ROLE_LABELS[role] : "-";

const stripDiacritics = (value: string): string =>
  value.normalize("NFD").replace(/\p{Diacritic}/gu, "");

export const parseCategoryRole = (
  raw: string | null | undefined,
): CategoryRole | null => {
  const normalized = stripDiacritics(String(raw ?? "").trim()).toLowerCase();

  if (!normalized) return null;

  if (normalized.startsWith("destin")) return "destination";
  if (normalized.startsWith("rotin") || normalized.startsWith("routin")) {
    return "routine";
  }
  if (normalized.startsWith("sazon") || normalized.startsWith("season")) {
    return "seasonal";
  }
  if (normalized.startsWith("conven")) return "convenience";

  return null;
};
