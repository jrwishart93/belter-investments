import { useEffect, useState } from 'react';

export function useParallax(speed = 0.12, limit = 26) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const onScroll = () => {
      const next = Math.max(-limit, Math.min(limit, window.scrollY * speed * -1));
      setOffset(next);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [speed, limit]);

  return offset;
}
