import { describe, expect, it } from 'vitest';
import {
  buildPersonalFeed,
  buildPersonalSummary,
  defaultPreferences,
  interestOptions,
} from './personalization';

describe('personalized Palestine feed', () => {
  it('returns only the categories selected by the user', () => {
    const feed = buildPersonalFeed({
      governorate: 'جنين',
      interests: ['news', 'jobs'],
    });

    expect(feed.length).toBeGreaterThan(0);
    expect(new Set(feed.map((item) => item.category))).toEqual(new Set(['أخبار', 'وظائف']));
  });

  it('puts local content ahead of national fallback content', () => {
    const feed = buildPersonalFeed({
      governorate: 'جنين',
      interests: ['news'],
    });

    expect(feed[0].local).toBe(true);
    expect(feed[0].meta).toContain('جنين');
  });

  it('falls back safely when preferences are invalid', () => {
    const feed = buildPersonalFeed({ governorate: 'غير موجودة', interests: ['unknown'] });
    expect(feed).toEqual([]);

    const defaultFeed = buildPersonalFeed();
    expect(defaultFeed.length).toBeGreaterThan(0);
    expect(defaultPreferences.interests).toHaveLength(6);
  });

  it('builds numeric summary metrics for every supported governorate', () => {
    const summary = buildPersonalSummary('نابلس');

    expect(Object.values(summary).every(Number.isInteger)).toBe(true);
    expect(summary.matchingJobs).toBeGreaterThan(0);
    expect(interestOptions.map((item) => item.id)).toContain('emergency');
  });
});

