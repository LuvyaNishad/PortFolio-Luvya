import React, { useState, useEffect, useRef, useLayoutEffect, cloneElement, ReactNode } from 'react';

// --- Internal Types and Defaults ---

const DefaultHomeIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>;
const DefaultCompassIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" /></svg>;
const DefaultBellIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>;

export type NavItem = {
  id: string | number;
  icon?: React.ReactElement;
  label?: string | ReactNode;
  href?: string;
  onClick?: () => void;
};

const defaultNavItems: NavItem[] = [
  { id: 'default-home', icon: <DefaultHomeIcon />, label: 'Home' },
  { id: 'default-explore', icon: <DefaultCompassIcon />, label: 'Explore' },
  { id: 'default-notifications', icon: <DefaultBellIcon />, label: 'Notifications' },
];

export type LimelightNavProps = {
  items?: NavItem[];
  defaultActiveIndex?: number;
  activeIndex?: number; // Optional controlled state
  onTabChange?: (index: number) => void;
  className?: string;
  limelightClassName?: string;
  itemClassName?: string;
  iconClassName?: string;
  labelClassName?: string;
};

/**
 * An adaptive-width navigation bar with a "limelight" effect that highlights the active item.
 */
export const LimelightNav = ({
  items = defaultNavItems,
  defaultActiveIndex = 0,
  activeIndex: controlledActiveIndex,
  onTabChange,
  className,
  limelightClassName,
  itemClassName,
  iconClassName,
  labelClassName,
}: LimelightNavProps) => {
  const [internalActiveIndex, setInternalActiveIndex] = useState(defaultActiveIndex);
  
  // Use controlled index if provided, otherwise use internal state
  const activeIndex = controlledActiveIndex !== undefined ? controlledActiveIndex : internalActiveIndex;
  
  const [isReady, setIsReady] = useState(false);
  const [limelightLeft, setLimelightLeft] = useState(-999);
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const limelightRef = useRef<HTMLDivElement | null>(null);

  const [isLightOn, setIsLightOn] = useState(true);
  const prevActiveIndex = useRef(activeIndex);

  useEffect(() => {
    if (activeIndex !== prevActiveIndex.current) {
      setIsLightOn(false);
      
      const timer = setTimeout(() => {
        setIsLightOn(true);
      }, 200); // Light turns back on as it settles at the new position
      
      prevActiveIndex.current = activeIndex;
      return () => clearTimeout(timer);
    }
  }, [activeIndex]);

  useLayoutEffect(() => {
    if (items.length === 0) return;

    const limelight = limelightRef.current;
    const activeItem = navItemRefs.current[activeIndex];
    
    if (limelight && activeItem) {
      const newLeft = activeItem.offsetLeft + activeItem.offsetWidth / 2 - limelight.offsetWidth / 2;
      setLimelightLeft(newLeft);

      if (!isReady) {
        setTimeout(() => setIsReady(true), 50);
      }
    }
  }, [activeIndex, isReady, items]);

  if (items.length === 0) {
    return null; 
  }

  const handleItemClick = (index: number, itemOnClick?: () => void) => {
    if (controlledActiveIndex === undefined) {
      setInternalActiveIndex(index);
    }
    onTabChange?.(index);
    itemOnClick?.();
  };

  return (
    <nav className={`relative inline-flex items-center h-16 rounded-lg bg-card text-foreground border px-2 ${className || ''}`}>
      {items.map(({ id, icon, label, href, onClick }, index) => (
          <a
            key={id}
            href={href}
            ref={el => { navItemRefs.current[index] = el; }}
            className={`relative z-20 flex h-full cursor-pointer items-center justify-center gap-2 transition-colors duration-300 group overflow-hidden ${
              activeIndex === index ? 'text-white' : 'text-white/60 hover:text-white/95'
            } ${itemClassName || 'p-5'}`}
            onClick={() => handleItemClick(index, onClick)}
            aria-label={typeof label === 'string' ? label : undefined}
          >
            {/* Reflective hover glint sheen */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-20 transition-all duration-700 ease-out group-hover:left-[150%]" />
            </div>

            {icon && cloneElement(icon as React.ReactElement<any>, {
              className: `w-6 h-6 transition-all duration-200 ease-in-out group-hover:scale-105 ${
                activeIndex === index ? 'opacity-100' : 'opacity-40'
              } ${(icon.props as any).className || ''} ${iconClassName || ''}`,
            })}
            {label && (
              <span className={`inline-block transition-transform duration-200 ease-out group-hover:scale-108 ${labelClassName || ''}`}>
                {label}
              </span>
            )}
          </a>
      ))}

      <div 
        ref={limelightRef}
        className={`absolute -top-1.5 z-10 w-11 h-[2px] rounded-full bg-white shadow-[0_2px_15px_1px_rgba(255,255,255,0.7)] ${limelightClassName || ''}`}
        style={{ 
          left: limelightLeft !== -999 ? `${limelightLeft}px` : '-999px',
          opacity: isLightOn ? 1 : 0.05,
          transition: isReady ? 'left 350ms cubic-bezier(0.16, 1, 0.3, 1), opacity 150ms ease-in-out' : 'none'
        }}
      >
        <div className="absolute left-[-50%] top-[2px] w-[200%] h-12 [clip-path:polygon(30%_0,70%_0,100%_100%,0_100%)] bg-gradient-to-b from-white/40 via-white/5 to-transparent pointer-events-none" />
      </div>
    </nav>
  );
};
