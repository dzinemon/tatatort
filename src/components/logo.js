import React from "react";
import logo from "../images/logo.svg"
import { Link } from "gatsby";

export default function Logo() {
  return (
    <Link to={`/`} className="inline-block hover:opacity-70">
      <div className="w-auto h-10 lg:h-12 text-gray-200 flex items-center">
        <img src={logo} className="w-8 h-8" alt="Tatatort" width={32} height={32} />
        {" "}
        <span className="font-poiret text-yellow-900 text-2xl ml-2">Tatatort</span>
      </div>
    </Link>
  )
}