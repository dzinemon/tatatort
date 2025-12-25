import React, { useRef, useEffect, useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

import NavbarItem from "../components/header-item"
import useOutsideClick from "../utils/outside-click";
import Logo from "./logo";

const navbarItems = [
    {
      name: "Торти",
      text: "<p class='leading-tight'>Торти Тататорт</p>",
      subItems: [
        { title: "Весільні", url: "/wedding/", text: "Весільні торти" },
        { title: "Для дітей", url: "/kids/", text: "Дитячі торти" },
        { title: "Для малечі", url: "/infants/", text: "Для малечі" },
        { title: "Корпоративні", url: "/corporate/", text: "Корпоративні торти" },
        { title: "Торти для жінок", url: "/celebration/", text: "Святкові торти для жінок" },
        { title: "Для чоловіків", url: "/for-men/", text: "Торти для чоловіків" },
        { title: "Оригінальні торти", url: "/tatatort-cakes/", text: "Оригінальні торти" },
        { title: "Кендібар", url: "/candybar/", text: "Кендібар" },
      ],
    },
    { 
        name: "Начинки",
        text: `Начинки тортів`,
        subItems: [
            { title: "Фруктові та ягідні начинки", url: "/fruits-and-berries/", text: `<p>Легкі начинки з додаванням фруктів та ягід</p>` },
            { title: "Оригінальні Начинки", url: "/tatatort-original-fillings/", text: `<p>Оригінальні Начинки</p>` },
            { title: "Шоколадні начинки", url: "/chocolate-fillings/", text: `<p>Шоколадні начинки</p>` },
            { title: "Начинки з додаванням горіхів", url: "/fillings-with-nuts/", text: `<p>Начинки з додаванням горіхів</p>` },
            { title: "Всі начинки", url: "/fillings/", text: `<p>Дивитсь всі начинки </p>` }
        ]
    },
    { 
        name: "Калькулятор",
        url: "/calculator/",
        ariaLabel: "Розрахувати вартість торту"
    },
    { 
      name: <><FontAwesomeIcon icon={faInstagram} size="lg" /> Instagram </>, 
      url: "https://www.instagram.com/tatatort/",
      ariaLabel: "Відвідати наш Instagram"
    },
    { 
      name: <><FontAwesomeIcon icon={faFacebook} size="lg" /> Facebook </>, 
      url: "https://www.facebook.com/Tatatort/",
      ariaLabel: "Відвідати наш Facebook"
    },
  ]

const Navigation = ({ children }) => {
    const navRef = useRef();
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeItem, setActiveItem] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Handler for navbar background change on scroll
    const changeNavBackground = () => {
        const scrolledThrough = window.scrollY >= 30;
        if (scrolledThrough !== isScrolled) {
            setIsScrolled(scrolledThrough);
            document.body.classList.toggle("nav-bg-white", scrolledThrough);
        }
    };  

    // Close menu when clicking outside
    useOutsideClick(navRef, () => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
            document.body.classList.remove('overflow-hidden');
            document.querySelector('body main').classList.remove('pointer-events-none');
        }
    });

    // Toggle mobile menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        document.body.classList.toggle('overflow-hidden', !isMenuOpen);
        document.querySelector('body main').classList.toggle('pointer-events-none', !isMenuOpen);
    };

    // Reset page state on navigation
    useEffect(() => {
        window.scrollTo(0, 0);
        document.body.classList.remove('overflow-hidden');
        document.querySelector('body main').classList.remove('pointer-events-none');
    }, []);

    // Add scroll and resize event listeners
    useEffect(() => {
        window.addEventListener("scroll", changeNavBackground);
        
        return () => {
            window.removeEventListener("scroll", changeNavBackground);
        };
    }, [isScrolled]);

    return (
        <nav
            className="lg:h-auto h-16 lg:h-20 flex flex-col justify-center items-center z-50 fixed w-full"
            id="navbar"
            ref={navRef}
            aria-label="Primary Navigation"
        >
            <div className="container mx-auto">
                <div className="flex md:flex-row flex-col items-center justify-between -mx-5">
                    <div className="absolute inset-y-0 px-2 right-0 flex items-center lg:hidden text-teal">
                        <Hamburger
                            rounded
                            size={20}
                            toggled={isMenuOpen}
                            toggle={toggleMenu}
                            label={isMenuOpen ? "Закрити меню" : "Відкрити меню"}
                            hideOutline={false}
                        />
                    </div>
                    <div className="flex md:flex-row flex-wrap flex-col items-center justify-between w-full px-5">
                        <div className="md:order-2 w-full lg:w-2/12 flex md:justify-center lg:justify-start justify-center">
                          <Logo />
                        </div>
                        <div className="md:order-1 w-auto lg:order-2">
                            <div
                                className={`${
                                    isMenuOpen ? "flex" : "hidden"
                                } lg:block nav-collapse absolute lg:static top-16 lg:top-auto inset-x-0 bg-white lg:bg-transparent z-30`}
                            >
                                <ul className="flex lg:flex-row flex-col lg:justify-center items-center w-full h-full relative lg:static z-50" role="menubar">
                                    {navbarItems.map((item, idx) => 
                                        <NavbarItem 
                                            data={item} 
                                            key={idx} 
                                            idx={idx} 
                                            activeItem={activeItem} 
                                            setActiveItem={setActiveItem} 
                                        />
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;