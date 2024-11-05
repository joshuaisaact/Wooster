import { describe, test, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTheme } from '@/hooks/useTheme';

describe('useTheme Hook', () => {
  let mockMediaQueryList: {
    matches: boolean;
    addEventListener: Mock;
    removeEventListener: Mock;
  };

  let storageMock: { [key: string]: string } = {};
  let documentClassList: string[] = [];

  beforeEach(() => {
    // Reset storage mock
    storageMock = {};

    // Reset document classList mock
    documentClassList = [];

    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn((key: string) => storageMock[key]),
        setItem: vi.fn((key: string, value: string) => {
          storageMock[key] = value;
        }),
      },
      writable: true,
    });

    // Mock document.documentElement.classList
    Object.defineProperty(document.documentElement, 'classList', {
      value: {
        toggle: vi.fn((className: string, force?: boolean) => {
          if (force === undefined) {
            if (documentClassList.includes(className)) {
              documentClassList = documentClassList.filter((c) => c !== className);
            } else {
              documentClassList.push(className);
            }
          } else if (force) {
            if (!documentClassList.includes(className)) {
              documentClassList.push(className);
            }
          } else {
            documentClassList = documentClassList.filter((c) => c !== className);
          }
        }),
      },
      writable: true,
    });

    // Mock matchMedia with Vitest types
    mockMediaQueryList = {
      matches: false,
      addEventListener: vi.fn() as Mock,
      removeEventListener: vi.fn() as Mock,
    };

    window.matchMedia = vi.fn(() => mockMediaQueryList) as unknown as (
      query: string,
    ) => MediaQueryList;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('initializes with system preference when no stored theme', () => {
    mockMediaQueryList.matches = true;
    const { result } = renderHook(() => useTheme());

    expect(result.current.isDark).toBe(true);
    expect(documentClassList).toContain('dark');
    expect(window.localStorage.getItem).toHaveBeenCalledWith('theme');
  });

  test('initializes with stored theme when available', () => {
    storageMock['theme'] = 'dark';
    const { result } = renderHook(() => useTheme());

    expect(result.current.isDark).toBe(true);
    expect(documentClassList).toContain('dark');
    expect(window.localStorage.getItem).toHaveBeenCalledWith('theme');
    expect(window.matchMedia).not.toHaveBeenCalled();
  });

  test('toggles theme correctly', () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current.isDark).toBe(false);

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.isDark).toBe(true);
    expect(documentClassList).toContain('dark');
    expect(window.localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.isDark).toBe(false);
    expect(documentClassList).not.toContain('dark');
    expect(window.localStorage.setItem).toHaveBeenCalledWith('theme', 'light');
  });

  test('responds to system theme changes', () => {
    const { result } = renderHook(() => useTheme());

    expect(mockMediaQueryList.addEventListener).toHaveBeenCalled();

    // Get the listener function
    const [[eventName, listener]] = (mockMediaQueryList.addEventListener as Mock).mock.calls;
    expect(eventName).toBe('change');

    // Type assertion for the listener
    const mediaQueryListener = listener as (e: MediaQueryListEvent) => void;

    // Simulate media query changes
    act(() => {
      mediaQueryListener({ matches: true } as MediaQueryListEvent);
    });

    expect(result.current.isDark).toBe(true);
    expect(documentClassList).toContain('dark');

    act(() => {
      mediaQueryListener({ matches: false } as MediaQueryListEvent);
    });

    expect(result.current.isDark).toBe(false);
    expect(documentClassList).not.toContain('dark');
  });

  test('cleans up media query listener on unmount', () => {
    const { unmount } = renderHook(() => useTheme());

    unmount();

    expect(mockMediaQueryList.removeEventListener).toHaveBeenCalled();
  });

  test('persists theme choice across hook rerender', () => {
    storageMock['theme'] = 'dark';
    const { result, rerender } = renderHook(() => useTheme());

    expect(result.current.isDark).toBe(true);

    rerender();

    expect(result.current.isDark).toBe(true);
    expect(documentClassList).toContain('dark');
  });

  test('initializes with light theme when system prefers light', () => {
    mockMediaQueryList.matches = false;
    const { result } = renderHook(() => useTheme());

    expect(result.current.isDark).toBe(false);
    expect(documentClassList).not.toContain('dark');
  });
});
