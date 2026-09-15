import React from "react";
import { Link } from "react-router-dom";

const Footer = ({light, setlight}) => {
  return (
    <footer className={`relative overflow-hidden ${light ? "bg-white" : "bg-[#090909]"}`}>
      {/* Glow blobs */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[50vw] h-[30vh] bg-orange-600/15 blur-[120px] rounded-full" />
      <div className="absolute top-10 left-10 w-[30vw] h-[30vh] bg-yellow-500/10 blur-[90px] rounded-full " />
      {/* Top divider line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
      {/* Main content */}
      <div className="relative max-w-6xl mx-auto px-10 pt-16 pb-10">
        {/* Top section */}
        <div className="flex items-start flex-wrap gap-10 sm:gap-90 mb-16">
          {/* Brand */}
          <div className="flex flex-col gap-3 max-w-xs">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center text-black font-bold text-sm">
                C
              </div>
              <span className="text-white font-bold text-xl">CryptoPlace</span>
            </div>
            <div className="flex">
              <p className="text-gray-500 text-sm leading-6">
                Your gateway to real-time crypto data, market insights.
              </p>
            </div>
          </div>

            <div className="grid grid-cols-[1fr_1fr] text-gray-500 gap-x-10">
              <Link to={"/aboutus"} className="cursor-pointer hover:text-orange-400">About Us</Link>
              <Link to={"/coins/"} className="cursor-pointer hover:text-orange-400">Currencies</Link>
              <Link to={"/helpCenter"} className="cursor-pointer hover:text-orange-400">Help Center</Link>
              <Link to={"/features"} className="cursor-pointer hover:text-orange-400">Features</Link>
            </div>
          </div>

        {/* Bottom divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />
        {/* Big brand name */}
        <h2 className="sm:text-9xl text-4xl font-black text-center bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600 bg-clip-text text-transparent leading-none opacity-20 select-none tracking-tighter">
          CryptoPlace
        </h2>
        {/* Copyright */}
        <p className="text-center text-gray-600 text-xs mt-4">
          © 2026 CryptoPlace. All rights reserved. Built with ❤️ for crypto
          enthusiasts.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
