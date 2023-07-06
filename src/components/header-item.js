import React, { useRef } from "react";
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import useOutsideClick from "../utils/outside-click";
const NavbarItem = ({ data, dark, idx, activeItem, setActiveItem }) => {
  const isActive = data.name === activeItem ? true : false;
  const subItems = data.subItems || null;
  const currentEl = useRef(null);
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
  const onHover = (e) => {
    if (window.innerWidth >= 1024) {
      setActiveItem(data.name);
    }
  };
  const onFocus = (e) => {
    console.log("focus", e.target, currentEl.current.contains(e.target), e);
    setActiveItem(data.name);
  };
  const onBlur = (e) => {
    console.log("blur", e.target, currentEl.current.contains(e.target), e);
    if (!currentEl.current.contains(e.target)) {
      setActiveItem("");
    }
  };

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

  useOutsideClick(currentEl, () => {
    if (window.innerWidth >= 1024) {
      if (isActive) {
        setActiveItem("");
      }
    }
  });

  if (subItems == null) {
    return (
      <li className="block lg:border-none border-b border-rose lg:inline-block lg:border-none w-full lg:w-auto text-center">
        <a
          className={`${
            isActive ? "text-cyan-600" : "text-slate-900"
          }
            text-grey-3 inline-block hover:opacity-80 w-full px-6 lg:px-6 py-4 lg:py-7 leading-tight text-left border-b lg:border-none border-white focus:outline-none`}
          href={data.url}
          ref={currentEl}
          onMouseOver={onHover}
          onMouseLeave={onLeave}
          onFocus={onFocus}
          onBlur={onBlur}
          onClick={onClick}
        >
          {data.name}
        </a>
      </li>
    );
  }

  return (
    <li
      className={`${
        isActive ? `is-active bg-cyan-50` : ``
      } block lg:border-none border-b border-rose lg:inline-block lg:border-none w-full lg:w-auto text-center `}
      ref={currentEl}
      onMouseOver={onHover}
      onMouseLeave={onLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={onClick}
    >
      <button
        className={`${
          idx === 0 ? "lg:px-6" : "lg:px-6"
        } ${
          isActive ? "text-cyan-600" : "text-slate-900"
        } px-6 text-left hover:opacity-80 w-full lg:w-auto focus:outline-none py-4 lg:py-7 leading-tight border-b lg:border-none border-white pointer-events-none lg:pointer-events-auto`}
      >
        {data.name}{" "}
        <span className="inline-block float-right">
          <span className={` w-3.5 h-3.5 mt-1.5`}>
            {/* <ChevronMobile isActive={isActive} /> */}
            <ChevronDownIcon />
          </span>
        </span>
      </button>
      <div className={` ${
        isActive ? " max-h-screen-" : " max-h-0-"
      } lg:absolute lg:left-0 right-0 text-left lg:top-21 dr-dwn`}>
        <div
          className="container lg:rounded-xl bg-white/90 backdrop-blur-xl p-2 md:p-4 lg:p-8"
          
        >
          <div
            className="text-sdv-dark mx-auto max-w-3xl lg:pb-3 text-center font-poiret leading-tight text-xl hidden lg:block"
            dangerouslySetInnerHTML={{ __html: data.text }}
          />
          <div className="max-w-3xl h-0.5 bg-gradient-to-br from-rose-100 via-slate-100 to-teal-100 mx-auto my-4 hidden lg:block"></div>
          <div className="flex flex-wrap -mx-2">
              {Array.from(subItems).map((item, idx, arr) => {
                return (
                  <div
                    className={`px-4 ${arr.length % 2 === 0 ? "w-1/2 md:w-1/2 lg:w-1/4" : arr.length % 3 === 0 ? "w-1/2 md:w-1/3 lg:w-1/3" : "w-1/2 md:w-1/2 lg:w-1/4" }`}
                    key={`nav-${idx}`}
                  >
                    <a
                      className="hover:bg-cyan-50 bg-backdrop-blur-xl text-slate-800 focus:text-white w-full block rounded-lg xl:px-5 xl:py-4 px-3 py-2 focus:bg-gray-800 focus:outline-none"
                      href={`${item.url}`}
                    >
                      <div className={`flex justify-start items-center -mx-2`}>
                        { item.icon && <div className="w-auto px-2 text-2xl font-bold">
                          {item.icon}
                        </div>}
                        <div className="w-auto px-2 xl:text-xl mb-2">
                          {item.title}
                        </div>
                      </div>
                      <div
                        className={`${ isActive ? "opacity-60 translate-x-0" : "opacity-0 translate-x-3" } delay-300 duration-700 transition-all text-sm xl:text-base`}
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