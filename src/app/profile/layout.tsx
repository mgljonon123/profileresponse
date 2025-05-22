"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    href: "/profile/analytics",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-10 h-10"
      >
        <path d="M3 17v-6a2 2 0 012-2h2a2 2 0 012 2v6M13 17v-2a2 2 0 012-2h2a2 2 0 012 2v2M17 17V7a2 2 0 00-2-2h-2a2 2 0 00-2 2v10" />
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

  return (
    <div className="bg-[#F7F7FA] min-h-screen flex">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-screen w-28 bg-white border-r flex flex-col items-center justify-center py-8 shadow-sm z-20">
        <div className="flex flex-col items-center justify-center flex-1 gap-8">
          {icons.map((item, idx) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={idx}
                href={item.href}
                className={`flex items-center justify-center w-16 h-16 rounded-xl mb-2 transition ${
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
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-8 py-8">{children}</div>
      </main>
    </div>
  );
}
