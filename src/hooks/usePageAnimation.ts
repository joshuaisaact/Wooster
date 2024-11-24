import { useEffect } from 'react';
import { useAppContext } from './useAppContext';
import { State } from '@/types';

export function usePageAnimation(pageName: keyof State['pageAnimationStates']) {
  const { state, dispatch } = useAppContext();
  const shouldAnimate = !state.pageAnimationStates[pageName];

  useEffect(() => {
    if (shouldAnimate && !state.isLoading) {
      const timer = setTimeout(() => {
        dispatch({
          type: 'SET_PAGE_ANIMATED',
          payload: {
            page: pageName,
            hasAnimated: true,
          },
        });
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [shouldAnimate, state.isLoading, pageName, dispatch]);

  return shouldAnimate;
}
