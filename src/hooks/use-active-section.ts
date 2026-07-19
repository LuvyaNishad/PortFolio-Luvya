import { useState, useEffect } from 'react';

export type NavSectionItem = {
  id: string;
  subIds?: string[];
};

export function useActiveSection(sections: (string | NavSectionItem)[], defaultIndex = 0) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  useEffect(() => {
    const handleScroll = () => {
      // If at bottom of page, activate last item
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60
      ) {
        setActiveIndex(sections.length - 1);
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

      setActiveIndex(currentSectionIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [JSON.stringify(sections), defaultIndex]);

  return activeIndex;
}
