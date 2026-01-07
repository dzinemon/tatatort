import React, { useRef, useEffect, useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { motion, AnimatePresence } from "framer-motion";

import NavbarItem from "../components/header-item"
import useOutsideClick from "../utils/outside-click";
import Logo from "./logo";
import SocialLinks from "./SocialLinks";

const navbarItems = [
    {
      name: "Торти",
      text: "Торти Тататорт",
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
        }
    };  

    // Close menu when clicking outside
    useOutsideClick(navRef, () => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
            document.body.classList.remove('overflow-hidden');
            document.querySelector('body main')?.classList.remove('pointer-events-none');
        }
    });

    // Toggle mobile menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        document.body.classList.toggle('overflow-hidden', !isMenuOpen);
        document.querySelector('body main')?.classList.toggle('pointer-events-none', !isMenuOpen);
    };

    // Reset page state on navigation
    useEffect(() => {
        window.scrollTo(0, 0);
        document.body.classList.remove('overflow-hidden');
        document.querySelector('body main')?.classList.remove('pointer-events-none');
    }, []);

    // Add scroll and resize event listeners
    useEffect(() => {
        window.addEventListener("scroll", changeNavBackground);
        
        return () => {
            window.removeEventListener("scroll", changeNavBackground);
        };
    }, [isScrolled]);

    // Animation variants for the navbar container
    const navVariants = {
        initial: { y: -20, opacity: 0 },
        animate: { 
            y: 0, 
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    // Animation variants for mobile menu
    const mobileMenuVariants = {
        closed: { 
            opacity: 0, 
            height: 0,
            transition: { duration: 0.3, ease: "easeInOut" }
        },
        open: { 
            opacity: 1, 
            height: "auto",
            transition: { duration: 0.4, ease: "easeOut" }
        }
    };

    return (
        <motion.nav
            className="z-50 fixed w-full pt-2 px-4 lg:pt-4"
            ref={navRef}
            aria-label="Primary Navigation"
            initial="initial"
            animate="animate"
            variants={navVariants}
        >
            <div className="lg:container mx-auto">
                {/* Floating Glass Navbar */}
                <motion.div 
                    className={`
                        relative rounded-2xl 
                        ${isScrolled 
                            ? 'bg-white/70 shadow-lg shadow-primary-500/10' 
                            : 'bg-white/50'
                        }
                        backdrop-blur-xl border border-white/70
                        transition-all duration-500 ease-out
                    `}
                    layout
                >
                    <div className="flex items-center justify-between p-2">
                        {/* Logo */}
                        <motion.div 
                            className="flex-shrink-0 flex items-center"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Logo />
                        </motion.div>

                        {/* Desktop Navigation - Floating Isles */}
                        <div className="hidden lg:flex items-center gap-2">
                            <ul className="flex items-center gap-2" role="menubar">
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
                            {/* Social Links Isle */}
                            <motion.div 
                                className="ml-2 px-4 py-2 rounded-xl"
                            >
                                <SocialLinks variant="header" className="!gap-3" itemRole="menuitem" />
                            </motion.div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden">
                            <motion.div
                                whileTap={{ scale: 0.95 }}
                                className="text-primary-700"
                            >
                                <Hamburger
                                    rounded
                                    size={22}
                                    toggled={isMenuOpen}
                                    toggle={toggleMenu}
                                    label={isMenuOpen ? "Закрити меню" : "Відкрити меню"}
                                    hideOutline={false}
                                    color="#0891b2"
                                />
                            </motion.div>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.div
                                className="lg:hidden overflow-hidden"
                                initial="closed"
                                animate="open"
                                exit="closed"
                                variants={mobileMenuVariants}
                            >
                                <div className="px-3 pb-3 border-t border-primary-100/50 max-h-[70vh] overflow-y-auto">
                                    <ul className="flex flex-col gap-0.5 pt-2" role="menubar">
                                        {navbarItems.map((item, idx) => 
                                            <NavbarItem 
                                                data={item} 
                                                key={idx} 
                                                idx={idx} 
                                                activeItem={activeItem} 
                                                setActiveItem={setActiveItem}
                                                isMobile={true}
                                            />
                                        )}
                                    </ul>
                                    <motion.div 
                                        className="mt-3 pt-3 border-t border-primary-100/50 flex justify-center"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <SocialLinks variant="header" className="!gap-4" itemRole="menuitem" />
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Dropdown Portal - Full Width Container */}
                <AnimatePresence>
                    {activeItem && navbarItems.find(item => item.name === activeItem && item.subItems) && (
                        <motion.div
                            className="hidden lg:block absolute left-0 right-0 top-full pt-2 px-4"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                        >
                            <div className="container mx-auto">
                                <div 
                                    className="rounded-2xl bg-white/80 backdrop-blur-2xl border border-white/50 shadow-xl shadow-primary-500/10 p-6"
                                    onMouseEnter={() => setActiveItem(activeItem)}
                                    onMouseLeave={() => setActiveItem('')}
                                >
                                    {navbarItems.filter(item => item.name === activeItem && item.subItems).map((item, idx) => (
                                        <div key={idx}>
                                            <motion.div
                                                className="text-center mb-4 font-poiret text-xl text-primary-800"
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.1 }}
                                                dangerouslySetInnerHTML={{ __html: item.text }}
                                            />
                                            <div className="h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent mb-5"></div>
                                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                                {item.subItems.map((subItem, subIdx) => (
                                                    <motion.a
                                                        key={subIdx}
                                                        href={subItem.url}
                                                        className="group p-4 rounded-xl bg-gradient-to-br from-white/60 to-primary-50/40 hover:from-primary-50 hover:to-secondary-50/50 border border-transparent hover:border-primary-200/50"
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.075 * subIdx, duration: 0.5 }}
                                                        role="menuitem"
                                                    >
                                                        <div className="font-medium text-primary-900 group-hover:text-primary-700 mb-1">
                                                            {subItem.title}
                                                        </div>
                                                        <div 
                                                            className="text-sm text-neutral-600 group-hover:text-primary-600"
                                                            dangerouslySetInnerHTML={{ __html: subItem.text }}
                                                        />
                                                    </motion.a>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default Navigation;