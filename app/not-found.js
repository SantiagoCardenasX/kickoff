"use client";

import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <Image
            src="/images/logo.png"
            alt="Kickoff Logo"
            width={80}
            height={80}
            className="mx-auto"
          />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
        
        <p className="text-lg text-gray-600 mb-8">
          The page you&apos;re looking for is still under development or doesn&apos;t exist.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => window.history.back()} 
            className="font-medium bg-gray-200 px-6 py-3 rounded-lg text-gray-800 cursor-pointer transition duration-300 hover:bg-gray-300"
          >
            Go Back
          </button>
          
          <Link href="/">
            <button className="font-medium bg-[#2DAA5B] px-6 py-3 rounded-lg text-white cursor-pointer transition duration-300 hover:bg-[#1D2A68]">
              Return Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}