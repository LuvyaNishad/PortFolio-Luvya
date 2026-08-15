import { useState, useEffect, useRef } from 'react';

export type NavSectionItem = {
  id: string;
  subIds?: string[];
};

export function useActiveSection(sections: (string | NavSectionItem)[], defaultIndex = 0) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const activeIndexRef = useRef(defaultIndex);

  useEffect(() => {
    let rafId: number | null = null;

    const checkActiveSection = () => {
      // If at bottom of page, activate last item
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60
      ) {
        const lastIdx = sections.length - 1;
        if (activeIndexRef.current !== lastIdx) {
          activeIndexRef.current = lastIdx;
          setActiveIndex(lastIdx);
        }
        return;
      }

      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      let currentSectionIndex = defaultIndex;

      for (let i = 0; i < sections.length; i++) {
        const item = sections[i];
        const ids = typeof item === 'string' ? [item] : [item.id, ...(item.subIds || [])];

        for (const id of ids) {
          const element = document.getElementById(id);
          if (element) {
            const rect = element.getBoundingClientRect();
            const absoluteTop = rect.top + window.scrollY;
            if (absoluteTop <= scrollPosition) {
              currentSectionIndex = i;
            }
          }
        }
      }

      if (activeIndexRef.current !== currentSectionIndex) {
        activeIndexRef.current = currentSectionIndex;
        setActiveIndex(currentSectionIndex);
      }
    };

    const handleScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          checkActiveSection();
          rafId = null;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    checkActiveSection();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [JSON.stringify(sections), defaultIndex]);

  return activeIndex;
}
