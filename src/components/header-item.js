import React, { useRef } from "react";
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { motion, AnimatePresence } from "framer-motion";
import useOutsideClick from "../utils/outside-click";

// Nav item style variants (following Button.js pattern)
const navVariants = {
  primary: 'bg-primary-700 text-white hover:bg-primary-800 border border-transparent shadow-sm',
  secondary: 'bg-secondary-100 text-secondary-800 hover:bg-secondary-200 border border-transparent',
  outline: 'bg-transparent border border-primary-700 text-primary-700 hover:bg-primary-50',
  ghost: 'bg-transparent text-neutral-700 hover:bg-primary-50 hover:text-primary-700',
  active: 'bg-primary-700 text-white border border-transparent shadow-sm',
};

const navSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

const NavbarItem = ({ data, idx, activeItem, setActiveItem, isMobile = false }) => {
  const isActive = data.name === activeItem;
  const subItems = data.subItems || null;
  const currentEl = useRef(null);
  
  // Base styles following Button.js pattern
  const baseStyles = 'inline-flex items-center font-medium rounded-md transition-all duration-200 gap-2 cursor-pointer';
  const focusStyles = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2';
  
  // Handle click for mobile navigation
  const onClick = (e) => {
    if (isMobile || window.innerWidth < 1024) {
      e.preventDefault();
      if (isActive) {
        setActiveItem("");
      } else {
        setActiveItem(data.name);
      }
    }
  };
  
  // Handle hover for desktop navigation
  const onHover = () => {
    if (!isMobile && window.innerWidth >= 1024) {
      setActiveItem(data.name);
    }
  };
  
  // Handle focus for accessibility
  const onFocus = () => {
    setActiveItem(data.name);
  };
  
  // Handle blur for accessibility
  const onBlur = (e) => {
    if (!currentEl.current?.contains(e.relatedTarget)) {
      setTimeout(() => {
        if (!currentEl.current?.contains(document.activeElement)) {
          setActiveItem("");
        }
      }, 100);
    }
  };

  // Handle mouse leave for desktop
  const onLeave = () => {
    if (!isMobile && window.innerWidth >= 1024) {
      if (!subItems) {
        setActiveItem("");
      }
    }
  };

  // Close dropdown when clicking outside
  useOutsideClick(currentEl, () => {
    if (window.innerWidth >= 1024 && isActive) {
      setActiveItem("");
    }
  });

  // Animation variants for floating isle
  const isleVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.02,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    tap: { scale: 0.98 }
  };

  // Mobile dropdown animation
  const mobileDropdownVariants = {
    closed: { 
      height: 0, 
      opacity: 0,
      transition: { duration: 0.25, ease: "easeInOut" }
    },
    open: { 
      height: "auto", 
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  // For simple links without dropdown (Desktop)
  if (subItems == null && !isMobile) {
    return (
      <li className="list-none" role="none">
        <motion.a
          className={`
            ${baseStyles}
            ${isActive ? navVariants.active : navVariants.ghost}
            ${navSizes.md}
            ${focusStyles}
          `}
          href={data.url}
          ref={currentEl}
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
          onFocus={onFocus}
          onBlur={onBlur}
          role="menuitem"
          aria-label={data.ariaLabel || data.name}
          variants={isleVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
        >
          {data.name}
        </motion.a>
      </li>
    );
  }

  // For simple links without dropdown (Mobile)
  if (subItems == null && isMobile) {
    return (
      <motion.li 
        className="list-none" 
        role="none"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: idx * 0.05 }}
      >
        <a
          className={`
            ${baseStyles} w-full justify-start
            ${isActive ? navVariants.active : navVariants.ghost}
            ${navSizes.md}
          `}
          href={data.url}
          role="menuitem"
          aria-label={data.ariaLabel || data.name}
        >
          {data.name}
        </a>
      </motion.li>
    );
  }

  // For dropdown menus (Desktop) - Only renders the trigger button
  if (!isMobile) {
    return (
      <li className="list-none" role="none" ref={currentEl}>
        <motion.button
          className={`
            ${baseStyles}
            ${isActive ? navVariants.active : navVariants.ghost}
            ${navSizes.md}
            ${focusStyles}
          `}
          onMouseEnter={onHover}
          onFocus={onFocus}
          onBlur={onBlur}
          aria-expanded={isActive}
          aria-haspopup="true"
          role="menuitem"
          variants={isleVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
        >
          {data.name}
          <motion.span 
            className="w-4 h-4"
            animate={{ rotate: isActive ? 180 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <ChevronDownIcon className="w-4 h-4" />
          </motion.span>
        </motion.button>
      </li>
    );
  }

  // For dropdown menus (Mobile)
  return (
    <motion.li 
      className="list-none" 
      role="none"
      ref={currentEl}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: idx * 0.05 }}
    >
      <button
        className={`
          ${baseStyles} w-full justify-between
          ${isActive ? navVariants.active : navVariants.ghost}
          ${navSizes.md}
        `}
        onClick={onClick}
        aria-expanded={isActive}
        aria-haspopup="true"
        role="menuitem"
      >
        {data.name}
        <motion.span 
          className="w-4 h-4"
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <ChevronDownIcon className="w-4 h-4" />
        </motion.span>
      </button>
      
      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="overflow-hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileDropdownVariants}
            role="menu"
            aria-label={`${data.name} submenu`}
          >
            <div className="pl-2 pr-1 py-1.5 space-y-0.5">
              {subItems.map((item, subIdx) => (
                <motion.a
                  key={subIdx}
                  href={item.url}
                  className={`
                    ${baseStyles} w-full justify-start
                    ${navSizes.sm}
                    bg-transparent text-neutral-600 hover:bg-primary-50 hover:text-primary-700
                  `}
                  role="menuitem"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * subIdx }}
                >
                  {item.title}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
};

export default NavbarItem;