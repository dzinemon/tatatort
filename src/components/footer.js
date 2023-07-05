import React from "react";
import { Link, graphql } from "gatsby";
import logo from '../images/logo.svg'

import { CameraIcon, FaceSmileIcon } from "@heroicons/react/24/solid";
import Logo from "./logo";

export default function Footer() {
  return (
    <section className="z-10 relative pt-24">
      <div className="container mx-auto pb-20 md:pb-11">
        <div className="flex flex-col justify-center items-center -mx-4">
          
            <div className="w-auto">
              <Logo />
            </div>
            <div className="w-auto font-poiret text-lg">
              by Tata Utekhina 
            </div>
            <div className="w-auto font-light text-sm">
              · <a href="tel:+380632498807">+38 063 2498807</a> · <strong>tatautekhina</strong>@<strong>gmail</strong>.<strong>com</strong>
            </div>
          
        </div>
      </div>
    </section>
  );
}