import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds: string[], defaultIndex = 0) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      let currentSectionIndex = defaultIndex;

      for (let i = 0; i < sectionIds.length; i++) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          const absoluteTop = rect.top + window.scrollY;
          if (absoluteTop <= scrollPosition) {
            currentSectionIndex = i;
          }
        }
      }

      setActiveIndex(currentSectionIndex);
    };

    window.addEventListener('scroll', handleScroll);
    // Call once on mount to set initial state
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, defaultIndex]);

  return activeIndex;
}
