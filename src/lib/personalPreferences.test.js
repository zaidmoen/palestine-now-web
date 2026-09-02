import { describe, expect, it } from 'vitest';
import { defaultPreferences } from '../data/personalization';
import {
  parsePersonalPreferences,
  sanitizePersonalPreferences,
  serializePersonalPreferences,
} from './personalPreferences';

describe('personal preferences persistence', () => {
  it('sanitizes unknown governorates, interests, and duplicates', () => {
    expect(sanitizePersonalPreferences({
      governorate: 'غير معروفة',
      interests: ['news', 'unknown', 'news'],
    })).toEqual({
      governorate: defaultPreferences.governorate,
      interests: ['news'],
    });
  });

  it('round-trips the versioned preference payload', () => {
    const value = { governorate: 'نابلس', interests: ['roads', 'jobs'] };

    expect(parsePersonalPreferences(serializePersonalPreferences(value))).toEqual(value);
  });

  it('migrates the legacy unversioned payload', () => {
    const legacy = JSON.stringify({ governorate: 'الخليل', interests: ['economy'] });

    expect(parsePersonalPreferences(legacy)).toEqual({
      governorate: 'الخليل',
      interests: ['economy'],
    });
  });

  it('falls back safely for malformed or empty preferences', () => {
    expect(parsePersonalPreferences('{broken')).toEqual(defaultPreferences);
    expect(parsePersonalPreferences(JSON.stringify({ governorate: 'جنين', interests: [] })))
      .toEqual(defaultPreferences);
  });
});
