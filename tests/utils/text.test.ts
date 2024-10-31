import { describe, it, expect } from 'vitest';
import { truncateText } from '../../src/utils/text';

describe('truncateText', () => {
  it('should return an empty string for null input', () => {
    expect(truncateText(null, 10)).toBe('');
  });

  it('should return an empty string for undefined input', () => {
    expect(truncateText(undefined, 10)).toBe('');
  });

  it('should return the same text when it is shorter than maxLength', () => {
    const result = truncateText('Hello', 10);
    expect(result).toBe('Hello');
  });

  it('should return the same text when it is equal to maxLength', () => {
    const result = truncateText('Hello', 5);
    expect(result).toBe('Hello');
  });

  it('should truncate the text and add ellipsis when it exceeds maxLength', () => {
    const result = truncateText('Hello, world!', 5);
    expect(result).toBe('Hello...');
  });

  it('should handle maxLength of zero', () => {
    const result = truncateText('Hello, world!', 0);
    expect(result).toBe('...');
  });

  it('should handle maxLength greater than the length of the text', () => {
    const result = truncateText('Hi', 10);
    expect(result).toBe('Hi');
  });
});
