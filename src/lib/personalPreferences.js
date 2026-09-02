import {
  defaultPreferences,
  governorates,
  interestOptions,
} from '../data/personalization';

export const PREFERENCES_STORAGE_KEY = 'palestine-now:preferences:v2';
export const LEGACY_PREFERENCES_STORAGE_KEY = 'palestine-now-preferences-v1';

const STORAGE_VERSION = 2;
const interestIds = new Set(interestOptions.map((item) => item.id));

const cloneDefaults = () => ({
  governorate: defaultPreferences.governorate,
  interests: [...defaultPreferences.interests],
});

export function sanitizePersonalPreferences(value) {
  const governorate = governorates.includes(value?.governorate)
    ? value.governorate
    : defaultPreferences.governorate;
  const interests = Array.isArray(value?.interests)
    ? [...new Set(value.interests.filter((interest) => interestIds.has(interest)))]
    : [];

  return {
    governorate,
    interests: interests.length > 0 ? interests : [...defaultPreferences.interests],
  };
}

export function parsePersonalPreferences(rawValue) {
  if (!rawValue) return cloneDefaults();

  try {
    const parsed = JSON.parse(rawValue);
    const value = parsed?.version === STORAGE_VERSION ? parsed.preferences : parsed;
    return sanitizePersonalPreferences(value);
  } catch {
    return cloneDefaults();
  }
}

export function serializePersonalPreferences(preferences) {
  return JSON.stringify({
    version: STORAGE_VERSION,
    preferences: sanitizePersonalPreferences(preferences),
  });
}
