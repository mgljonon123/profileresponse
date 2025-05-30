"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const icons = [
  {
    href: "/profile",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-10 h-10"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-2.5 3.5-4 8-4s8 1.5 8 4" />
      </svg>
    ),
  },
  {
    href: "/profile/messages",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-10 h-10"
      >
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    href: "/profile/settings",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-10 h-10"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33h.09A1.65 1.65 0 0011 3.09V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51h.09a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v.09a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  },
  {
    href: "/profile/dental",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-10 h-10"
      >
        <path d="M12 2C7.03 2 2.73 6.11 2.73 11.07c0 2.5 1.13 4.77 3.13 6.36.5.39.8 1 .8 1.64v.01c0 1.1.9 2 2 2 .55 0 1-.45 1-1v-2.5c0-.28.22-.5.5-.5s.5.22.5.5V21c0 .55.45 1 1 1s1-.45 1-1v-2.42c0-.28.22-.5.5-.5s.5.22.5.5V21c0 .55.45 1 1 1s1-.9 1-2v-.01c0-.64.3-1.25.8-1.64 2-1.59 3.13-3.86 3.13-6.36C21.27 6.11 16.97 2 12 2z" />
      </svg>
    ),
  },
];

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const handleSignOut = () => {
    // Clear any stored user data
    localStorage.removeItem("user");
    // Redirect to home page
    router.push("/");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-[#F7F7FA] min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-1 ml-0 sm:ml-16 md:ml-20 lg:ml-24 min-h-screen pb-16 sm:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
          {children}
        </div>
      </main>

      {/* Sidebar - Desktop */}
      <aside className="hidden sm:flex fixed top-0 left-0 h-screen w-16 md:w-20 lg:w-24 bg-white border-r flex-col items-center justify-between py-4 sm:py-6 md:py-8 shadow-sm z-20">
        <div className="flex flex-col items-center justify-center flex-1 gap-4 sm:gap-6 md:gap-8">
          {icons.map((item, idx) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={idx}
                href={item.href}
                className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl mb-2 transition ${
                  isActive
                    ? "text-[#F59E0B] bg-[#F2F6FF]"
                    : "text-[#B0B0B0] hover:text-[#F59E0B] hover:bg-[#F2F6FF]"
                }`}
              >
                {item.icon}
              </Link>
            );
          })}
        </div>
        {/* Sign Out Button - Desktop */}
        <button
          onClick={handleSignOut}
          className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl mb-4 transition text-[#B0B0B0] hover:text-red-500 hover:bg-red-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
        </button>
      </aside>

      {/* Bottom Navigation - Mobile */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t flex items-center justify-around px-2 z-20">
        {icons.map((item, idx) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={idx}
              href={item.href}
              className={`flex items-center justify-center w-12 h-12 rounded-xl transition ${
                isActive
                  ? "text-[#F59E0B] bg-[#F2F6FF]"
                  : "text-[#B0B0B0] hover:text-[#F59E0B] hover:bg-[#F2F6FF]"
              }`}
            >
              {item.icon}
            </Link>
          );
        })}
        {/* Sign Out Button - Mobile */}
        <button
          onClick={handleSignOut}
          className="flex items-center justify-center w-12 h-12 rounded-xl transition text-[#B0B0B0] hover:text-red-500 hover:bg-red-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
        </button>
      </nav>
    </div>
  );
}
