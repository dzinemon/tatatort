import React from "react";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import Logo from "./logo";

const socialLinks = [
  { 
    name: "Instagram", 
    icon: <FontAwesomeIcon icon={faInstagram} size="lg" />,
    url: "https://www.instagram.com/tatatort/",
    ariaLabel: "Відвідати наш Instagram"
  },
  { 
    name: "Facebook", 
    icon: <FontAwesomeIcon icon={faFacebook} size="lg" />,
    url: "https://www.facebook.com/Tatatort/",
    ariaLabel: "Відвідати наш Facebook"
  }
];

export default function Footer() {
  return (
    <footer className="z-10 relative pt-24" aria-label="Footer">
      <div className="container mx-auto pb-20 md:pb-11">
        <div className="flex flex-col justify-center items-center -mx-4">
          <div className="w-auto">
            <Logo />
          </div>
          <div className="w-auto font-poiret text-lg">
            by Tata Utekhina 
          </div>
          <div className="w-auto font-light text-sm mb-4">
            · <a href="tel:+380632498807" className="hover:text-cyan-600 transition-colors">+38 063 2498807</a> · <strong>tatautekhina</strong>@<strong>gmail</strong>.<strong>com</strong>
          </div>
          <div className="flex space-x-4 mt-2">
            {socialLinks.map((link, idx) => (
              <a 
                key={`footer-social-${idx}`}
                href={link.url}
                aria-label={link.ariaLabel}
                className="text-gray-700 hover:text-cyan-600 transition-colors duration-200 flex items-center"
              >
                <span className="mr-2">{link.icon}</span>
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}