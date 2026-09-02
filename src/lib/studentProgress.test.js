import { describe, expect, it } from 'vitest';
import {
  parseStudentProgress,
  sanitizeCompletedIds,
  serializeStudentProgress,
  toggleCompletedId,
} from './studentProgress';

const validIds = ['identity', 'motivation', 'recommendation', 'deadline'];

describe('student progress persistence', () => {
  it('keeps only unique, known checklist ids', () => {
    expect(sanitizeCompletedIds(['identity', 'unknown', 'identity'], validIds)).toEqual(['identity']);
  });

  it('round-trips the versioned payload', () => {
    const serialized = serializeStudentProgress(['identity', 'deadline']);

    expect(parseStudentProgress(serialized, validIds)).toEqual(['identity', 'deadline']);
  });

  it('rejects malformed and unsupported payloads safely', () => {
    expect(parseStudentProgress('{broken', validIds)).toEqual([]);
    expect(parseStudentProgress('{"version":2,"completedIds":["identity"]}', validIds)).toEqual([]);
  });

  it('toggles an id without mutating the original array', () => {
    const current = ['identity'];

    expect(toggleCompletedId(current, 'deadline')).toEqual(['identity', 'deadline']);
    expect(toggleCompletedId(current, 'identity')).toEqual([]);
    expect(current).toEqual(['identity']);
  });
});
