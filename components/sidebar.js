"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#1D2A68] text-white p-2 rounded-md shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Hamburger Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#1D2A68] text-white shadow-lg flex flex-col p-6 space-y-6 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 z-50`}
      >
        {/* Logo */}
        <div className="text-center text-2xl font-bold tracking-wide flex items-center gap-2">
          <Image src="/images/logo.png" alt="logo" width={40} height={40} />
          KICKOFF
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-4">
          <Link
            href="/leagues"
            className="text-lg font-medium hover:bg-[#2A9D58] hover:text-white px-4 py-2 rounded-lg transition duration-300"
          >
            Leagues
          </Link>
          <Link
            href="/teams"
            className="text-lg font-medium hover:bg-[#2A9D58] hover:text-white px-4 py-2 rounded-lg transition duration-300"
          >
            Teams
          </Link>
          <Link
            href="/matches"
            className="text-lg font-medium hover:bg-[#2A9D58] hover:text-white px-4 py-2 rounded-lg transition duration-300"
          >
            Matches
          </Link>
          <Link
            href="/results"
            className="text-lg font-medium hover:bg-[#2A9D58] hover:text-white px-4 py-2 rounded-lg transition duration-300"
          >
            Results
          </Link>
          <Link
            href="/standings"
            className="text-lg font-medium hover:bg-[#2A9D58] hover:text-white px-4 py-2 rounded-lg transition duration-300"
          >
            Standings
          </Link>
        </nav>

        {/* Footer */}
        <div className="mt-auto text-center text-sm text-gray-300">
          © 2025 KickOff. All rights reserved.
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}