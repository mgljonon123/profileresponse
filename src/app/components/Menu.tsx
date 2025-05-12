"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface MenuProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const Menu: React.FC<MenuProps> = ({ isMenuOpen, toggleMenu }) => {
  const router = useRouter();

  const navigateToWork = () => {
    router.push("/work");
    toggleMenu();
  };

  const navigateToRoadmap = () => {
    router.push("/roadmap");
    toggleMenu();
  };

  const navigateToSearch = () => {
    router.push("/search");
    toggleMenu();
  };

  const navigateToProfile = () => {
    router.push("/profile");
    toggleMenu();
  };

  return (
    <div
      className={`fixed bottom-0 left-0 w-full h-screen transition-all duration-300 ease-in-out z-[100] flex flex-col justify-between ${
        isMenuOpen
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-full pointer-events-none"
      }`}
    >
      <div className="h-[66.66vh] bg-white flex flex-col items-center justify-start pt-10 relative">
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 w-10 h-10 bg-gray-200 text-black rounded-full flex items-center justify-center text-lg focus:outline-none hover:bg-gray-300 transition-colors duration-300"
        >
          ✕
        </button>

        {/* Top Menu Links */}
        <div className="flex items-center space-x-4 text-[32px] font-bold mb-6">
          <span className="w-2 h-2 bg-black rounded-full"></span>
          <button
            onClick={navigateToWork}
            className="text-black hover:text-[#E94A1F] transition-colors duration-300"
          >
            WORK
          </button>
          <span className="text-red-500">•</span>
          <button
            onClick={navigateToRoadmap}
            className="text-black hover:text-[#E94A1F] transition-colors duration-300"
          >
            MAP
          </button>
          <span className="text-red-500">•</span>
          <button
            onClick={navigateToSearch}
            className="text-black hover:text-[#E94A1F] transition-colors duration-300"
          >
            SEARCH
          </button>
          <span className="text-red-500">•</span>
          <button
            onClick={navigateToProfile}
            className="text-black hover:text-[#E94A1F] transition-colors duration-300"
          >
            PROFILE
          </button>
          <span className="w-4 h-4"></span>
        </div>
        <div className="flex space-x-6 text-[16px] mt-[300px]">
          <Link
            href="#"
            className="text-black hover:text-[#E94A1F] transition-colors duration-300"
          >
            LINKEDIN
          </Link>
          <Link
            href="#"
            className="text-black hover:text-[#E94A1F] transition-colors duration-300"
          >
            INSTAGRAM
          </Link>
          <Link
            href="#"
            className="text-black hover:text-[#E94A1F] transition-colors duration-300"
          >
            TWITTER
          </Link>
          <Link
            href="#"
            className="text-black hover:text-[#E94A1F] transition-colors duration-300"
          >
            FACEBOOK
          </Link>
        </div>
      </div>
      {/* Lower part (1/3) with gray-900 background */}
      <div className="h-[33.33vh] bg-gray-900"></div>
    </div>
  );
};

export default Menu;
