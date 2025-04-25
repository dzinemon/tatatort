import React, { useRef } from "react";
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import useOutsideClick from "../utils/outside-click";

const NavbarItem = ({ data, idx, activeItem, setActiveItem }) => {
  const isActive = data.name === activeItem;
  const subItems = data.subItems || null;
  const currentEl = useRef(null);
  
  // Handle click for mobile navigation
  const onClick = (e) => {
    if (window.innerWidth < 1024) {
      if (e.target === currentEl.current) {
        if (isActive) {
          setActiveItem("");
        } else {
          setActiveItem(data.name);
        }
      }
    }
  };
  
  // Handle hover for desktop navigation
  const onHover = () => {
    if (window.innerWidth >= 1024) {
      setActiveItem(data.name);
    }
  };
  
  // Handle focus for accessibility
  const onFocus = () => {
    setActiveItem(data.name);
  };
  
  // Handle blur for accessibility
  const onBlur = (e) => {
    if (!currentEl.current.contains(e.target)) {
      setActiveItem("");
    }
  };

  // Handle mouse leave for desktop
  const onLeave = (e) => {
    if (window.innerWidth >= 1024) {
      if (
        e.target !== currentEl.current &&
        currentEl.current.contains(e.target)
      ) {
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

  // For simple links without dropdown
  if (subItems == null) {
    return (
      <li className="block lg:border-none border-b border-rose lg:inline-block w-full lg:w-auto text-center" role="none">
        <a
          className={`${
            isActive ? "text-cyan-600" : "text-slate-900"
          } inline-block hover:opacity-80 w-full px-6 lg:px-6 py-4 lg:py-7 leading-tight text-left border-b lg:border-none border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400`}
          href={data.url}
          ref={currentEl}
          onMouseOver={onHover}
          onMouseLeave={onLeave}
          onFocus={onFocus}
          onBlur={onBlur}
          onClick={onClick}
          role="menuitem"
          aria-label={data.ariaLabel || data.name}
        >
          {data.name}
        </a>
      </li>
    );
  }

  // For dropdown menus
  return (
    <li
      className={`${
        isActive ? `is-active bg-cyan-50` : ``
      } block lg:border-none border-b border-rose lg:inline-block w-full lg:w-auto text-center`}
      ref={currentEl}
      onMouseOver={onHover}
      onMouseLeave={onLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={onClick}
      role="none"
    >
      <button
        className={`${
          idx === 0 ? "lg:px-6" : "lg:px-6"
        } ${
          isActive ? "text-cyan-600" : "text-slate-900"
        } px-6 text-left hover:opacity-80 w-full lg:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 py-4 lg:py-7 leading-tight border-b lg:border-none border-white pointer-events-none lg:pointer-events-auto`}
        aria-expanded={isActive}
        aria-haspopup="true"
        role="menuitem"
      >
        {data.name}{" "}
        <span className="inline-block float-right" aria-hidden="true">
          <span className={`w-3.5 h-3.5 mt-1.5 ${isActive ? 'rotate-180' : ''} transition-transform duration-200`}>
            <ChevronDownIcon />
          </span>
        </span>
      </button>
      <div 
        className={`${isActive ? "max-h-screen" : "max-h-0"} lg:absolute lg:left-0 right-0 text-left lg:top-21 dr-dwn overflow-hidden transition-all duration-300`}
        role="menu"
        aria-label={`${data.name} submenu`}
      >
        <div className="container lg:rounded-xl bg-white/90 backdrop-blur-xl p-2 md:p-4 lg:p-5 xl:p-6">
          <div
            className="text-sdv-dark mx-auto max-w-3xl lg:pb-3 text-center font-poiret leading-tight text-xl hidden lg:block"
            dangerouslySetInnerHTML={{ __html: data.text }}
          />
          <div className="max-w-3xl h-0.5 bg-gradient-to-br from-rose-100 via-slate-100 to-teal-100 mx-auto my-4 hidden lg:block"></div>
          <div className="flex flex-wrap -mx-2">
            {Array.from(subItems).map((item, idx, arr) => {
                return (
                <div
                  className={`px-2 ${
                  arr.length % 5 === 0
                    ? "w-1/2 md:w-1/4 lg:w-1/5"
                    : arr.length % 2 === 0
                    ? "w-1/2 md:w-1/2 lg:w-1/4"
                    : arr.length % 3 === 0
                    ? "w-1/2 md:w-1/3 lg:w-1/3"
                    : "w-1/2 md:w-1/2 lg:w-1/4"
                  }`}
                  key={`nav-${idx}`}
                  role="none"
                >
                  <a
                  className="hover:bg-cyan-50 group border-2 border-transparent hover:border-cyan-100 bg-backdrop-blur-xl text-slate-800 w-full block rounded-lg xl:px-4 xl:py-3 px-3 py-2 focus-visible:bg-cyan-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
                  href={`${item.url}`}
                  role="menuitem"
                  >
                  <div className={`flex justify-start items-center -mx-2`}>
                    {item.icon && <div className="w-auto px-2 text-2xl font-bold" aria-hidden="true">
                    {item.icon}
                    </div>}
                    <div className={`${isActive ? "translate-x-0" : "opacity-0 translate-x-2" } delay-200 duration-300 transition-all w-auto px-2 xl:text-xl mb-2 group-focus-visible:text-cyan-900 group-hover:text-cyan-800 duration-200`}>
                    {item.title}
                    </div>
                  </div>
                  <div
                    className={`${isActive ? "translate-x-0" : "opacity-0 translate-x-3"} delay-300 duration-500 transition-all text-sm xl:text-base group-focus-visible:text-cyan-800 group-hover:text-cyan-700`}
                    dangerouslySetInnerHTML={{ __html: item.text }}
                  />
                  </a>
                </div>
                );
            })}
          </div>
        </div>
      </div>
    </li>
  );
};

export default NavbarItem;