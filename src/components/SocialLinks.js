import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const SocialLinks = ({ variant = "footer", className = "", itemRole = null }) => {
  const isFooter = variant === "footer";

  const baseClasses = "transition-all duration-300 transform hover:scale-110 flex items-center gap-2 group font-poiret";
  
  // Footer: Neutral text, Primary hover
  // Hero: Primary text, Darker Primary hover
  // Header: Slate text, Cyan hover (matching nav items)
  let colorClasses = "";
  let iconClasses = "text-xl";

  switch (variant) {
    case "footer":
      colorClasses = "text-neutral-400 hover:text-primary-600";
      iconClasses = "text-xl group-hover:text-primary-500 transition-colors";
      break;
    case "hero":
      colorClasses = "text-primary-600 hover:text-primary-800 font-medium";
      break;
    case "header":
      colorClasses = "text-slate-900 hover:text-cyan-600 font-medium";
      break;
    default:
      colorClasses = "text-neutral-600 hover:text-primary-600";
  }

  const links = [
    {
      name: "Instagram",
      icon: <FaInstagram className={iconClasses} />,
      url: "https://www.instagram.com/tatatort/",
      ariaLabel: "Відвідати наш Instagram"
    },
    {
      name: "Facebook",
      icon: <FaFacebook className={iconClasses} />,
      url: "https://www.facebook.com/Tatatort/",
      ariaLabel: "Відвідати наш Facebook"
    }
  ];

  return (
    <div className={`flex items-center gap-6 ${className}`}>
      {links.map((link, idx) => (
        <a
          key={`social-link-${idx}`}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.ariaLabel}
          className={`${baseClasses} ${colorClasses}`}
          role={itemRole}
        >
          {link.icon}
          <span>{link.name}</span>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
