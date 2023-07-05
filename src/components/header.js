import React, { useRef, useEffect, useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import '@fortawesome/fontawesome-svg-core/styles.css'  

import NavbarItem from "../components/header-item"

import useOutsideClick from "../utils/outside-click";

import Logo from "./logo";



const navbarItems = [
    {
      name: "Торти",
      text:
        "<p class='leading-tight'>Торти Тататорт</p>",
      subItems: [

        {
          title: "Весільні",
          icon: "",
          url: "/wedding/",
          text:
            "Весільні торти",
        },
        {
          title: "Для дітей",
          icon: "",
          url: "/kids/",
          text:
            "Дитячі торти",
        },
        {
          title: "Для малечі",
          icon: "",
          url: "/infants/",
          text:
            "Для малечі",
        },
        {
          title: "Корпоративні",
          icon: "",
          url: "/corporate/",
          text:
            "Корпоративні торти",
        },
        {
          title: "Святкові",
          icon: "",
          url: "/celebration/",
          text:
            "Святкові торти",
        },
        {
          title: "Для чоловіків",
          icon: "",
          url: "/for-men/",
          text:
            "Торти для чоловіків",
        },
        {
          title: "Оригінальні торти",
          icon: "",
          url: "/tatatort-cakes/",
          text:
            "Оригінальні торти",
        },
        {
          title: "Кендібар",
          icon: "",
          url: "/candybar/",
          text:
            "Кендібар",
        },
        
      ],
    },
    // {
    //     name: "Nav Item 2",
    //     text:
    //       "<p class='leading-tight'>Navbar Top text description for extra info.</p>",
    //     subItems: [
    //       {
    //         title: "Navbar Item Title",
    //         icon: "Text",
    //         url: "https://github.com",
    //         text:
    //           "Navbar item text description for extra info.",
    //       },
    //       {
    //         title: "Navbar Item Title",
    //         icon: "Text",
    //         url: "https://github.com",
    //         text: "Navbar item text description for extra info.",
    //       },
    //       {
    //         title: "Navbar Item Title",
    //         icon: "Text",
    //         url: "https://github.com",
    //         text:
    //           "Navbar item text description for extra info.",
    //       },
    //       {
    //         title: "Navbar Item Title",
    //         icon: "Text",
    //         url: "https://github.com",
    //         text: "Navbar item text description for extra info.",
    //       },
    //       {
    //         title: "Navbar Item Title",
    //         icon: "Text",
    //         url: "https://github.com",
    //         text:
    //           "Navbar item text description for extra info.",
    //       },
    //       {
    //         title: "Navbar Item Title",
    //         icon: "Text",
    //         url: "https://github.com",
    //         text:
    //           "Navbar item text description for extra info.",
    //       }
    //     ],
    //   },
    //   { name: "Pricing", url: "#" },

    { 
        name: "Начинки",
        text: `Начинки тортів`,

        subItems: [
            {
                title: "Легкі начинки з додаванням фруктів та ягід",
                icon: "",
                url: "/fruits-and-berries/",
                text: `<p>Легкі начинки з додаванням фруктів та ягід</p>`
            },
            {
                title: "Оригінальні Начинки",
                icon: "",
                url: "/tatatort-original-fillings/",
                text: `<p>Оригінальні Начинки</p>`
            },
            {
                title: "Шоколадні начинки",
                icon: "",
                url: "/chocolate-fillings/",
                text: `<p>Шоколадні начинки</p>`
            },
            {
                title: "Начинки з додаванням горіхів",
                icon: "",
                url: "/fillings-with-nuts/",
                text: `<p>Начинки з додаванням горіхів</p>`
            },
        ]
    },
    { name: <><FontAwesomeIcon icon={faInstagram} size="lg" /> Instagram </>, url: "https://www.instagram.com/tatatort/" },
    { name: <><FontAwesomeIcon icon={faFacebook} size="lg" /> Facebook </>, url: "https://www.facebook.com/Tatatort/" },
  ]



/**
 * Navigation component
 *
 * The Navigation component takes an array of your Ghost
 * navigation property that is fetched from the settings.
 * It differentiates between absolute (external) and relative link (internal).
 * You can pass it a custom class for your own styles, but it will always fallback
 * to a `site-nav-item` class.
 *
 */

const Navigation = ({ children }) => {

    const ref = useRef();

    const [isWhite, setNavbarColor] = useState(false);
    const [activeItem, setActiveItem] = useState('');

    const changeNavBackground = () => {
        const scrolledThrough = window.scrollY >= 30;
        if (scrolledThrough && isWhite) {
            document.body.classList.add("nav-bg-white");
            setNavbarColor(false);
        } else if (!scrolledThrough) {
            document.body.classList.remove("nav-bg-white");
            setNavbarColor(true);
        }
    };  

    useEffect(() => {
        window.addEventListener("scroll", changeNavBackground);
        window.addEventListener("resize", removeNavbarStatuses);
        return () => {
            window.removeEventListener("scroll", changeNavBackground);
            window.addEventListener("resize", removeNavbarStatuses);
        };
    });

    function removeNavbarStatuses () {
        document.body.classList.remove('overflow-hidden');
        document.querySelector('body main').classList.remove('pointer-events-none');
    }
    
    useEffect(() => {
        window.scrollTo(0, 0);
        document.body.classList.remove('overflow-hidden');
        document.querySelector('body main').classList.remove('pointer-events-none');
    }, []);

    useOutsideClick(ref, () => {
        console.log('outside navbar click')
        setNavActive(false);
            document.body.classList.remove('overflow-hidden');
            document.querySelector('body main').classList.remove('pointer-events-none');
        if (isActive) {
            setNavActive(!isActive);
            document.body.classList.remove('overflow-hidden');
        }
    });

    const [isActive, setNavActive] = useState(false);

    const handleNavCollapse = () => {
        setNavActive(!isActive);
        if (!isActive) {
            document.body.classList.add('overflow-hidden');
            document.querySelector('body main').classList.add('pointer-events-none');
        } else {
            document.body.classList.remove('overflow-hidden');
            document.querySelector('body main').classList.remove('pointer-events-none');
        };
    };

    return (
        <nav
            className={`lg:h-auto h-16 lg:h-20 flex flex-col justify-center items-center z-50 fixed w-full`}
            id="navbar"
            ref={ref}
        >
            <div className="container mx-auto">
                <div className=" flex md:flex-row flex-col items-center justify-between -mx-5">
                    <div className="absolute inset-y-0 px-2 right-0 flex items-center lg:hidden text-teal">
                        <Hamburger
                            // color="#ffffff"
                            rounded
                            size={20}
                            toggled={isActive}
                            toggle={handleNavCollapse}
                            onClick={handleNavCollapse}
                        />
                    </div>
                    <div className="flex md:flex-row flex-wrap flex-col items-center justify-between w-full px-5">
                        <div className="md:order-2 w-full lg:w-2/12 flex md:justify-center lg:justify-start justify-center">
                          <Logo />
                        </div>
                        <div className="md:order-1 w-auto lg:order-2">
                            <div
                                
                                className={`${
                                    isActive ? "flex" : "hidden"
                                } lg:block nav-collapse absolute lg:static top-16 lg:top-auto inset-x-0 bg-white lg:bg-transparent z-30`}
                            >
                                <div className=" flex lg:flex-row flex-col lg:justify-center items-center w-full h-full relative lg:static z-50">
                                    {navbarItems.map((item, idx) => <NavbarItem 
                                        data={item} 
                                        key={idx} 
                                        idx={idx} 
                                        activeItem={activeItem} 
                                        setActiveItem={setActiveItem} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};


export default Navigation;