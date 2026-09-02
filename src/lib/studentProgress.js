export const STUDENT_PROGRESS_STORAGE_KEY = 'palestine-now:student-progress:v1';

const STORAGE_VERSION = 1;

export function sanitizeCompletedIds(value, validIds) {
  if (!Array.isArray(value)) return [];

  const allowed = new Set(validIds);
  return [...new Set(value.filter((id) => typeof id === 'string' && allowed.has(id)))];
}

export function parseStudentProgress(rawValue, validIds) {
  if (!rawValue) return [];

  try {
    const parsed = JSON.parse(rawValue);
    if (parsed?.version !== STORAGE_VERSION) return [];
    return sanitizeCompletedIds(parsed.completedIds, validIds);
  } catch {
    return [];
  }
}

export function serializeStudentProgress(completedIds) {
  return JSON.stringify({ version: STORAGE_VERSION, completedIds });
}

export function toggleCompletedId(completedIds, id) {
  return completedIds.includes(id)
    ? completedIds.filter((item) => item !== id)
    : [...completedIds, id];
}
