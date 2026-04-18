import { useEffect, useRef } from 'react';

export function useScrollReveal<T extends Element = Element>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      el.classList.add('reveal--visible');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('reveal--visible');
          observer.disconnect();
        }
      },
      {
        threshold: 0,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
