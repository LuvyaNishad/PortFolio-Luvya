import { useState, useEffect, useRef } from 'react';

export type NavSectionItem = {
  id: string;
  subIds?: string[];
};

export function useActiveSection(sections: (string | NavSectionItem)[], defaultIndex = 0) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const activeIndexRef = useRef(defaultIndex);

  /* Callers pass an inline array literal, so its identity changes on every
     render. Serialising it gives the effect a dependency that only changes
     when the section list genuinely changes. */
  const sectionsKey = JSON.stringify(sections);

  /* The scroll listener reads the newest list through this ref, so it never
     has to re-subscribe just because the array was rebuilt. */
  const sectionsRef = useRef(sections);
  useEffect(() => {
    sectionsRef.current = sections;
  });

  useEffect(() => {
    let rafId: number | null = null;

    const checkActiveSection = () => {
      const sectionList = sectionsRef.current;

      // If at bottom of page, activate last item
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60
      ) {
        const lastIdx = sectionList.length - 1;
        if (activeIndexRef.current !== lastIdx) {
          activeIndexRef.current = lastIdx;
          setActiveIndex(lastIdx);
        }
        return;
      }

      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      let currentSectionIndex = defaultIndex;

      for (let i = 0; i < sectionList.length; i++) {
        const item = sectionList[i];
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
  }, [sectionsKey, defaultIndex]);

  return activeIndex;
}
