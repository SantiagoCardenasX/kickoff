import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full bg-white bg-opacity-50 p-6">
      <div className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-12">
        {/* Left Section */}
        <div className="text-center lg:text-left flex-1">
          <h1 className="text-5xl lg:text-6xl font-bold text-[#1D2A68] mb-4 font- tracking-wide sm:text-7xl xl:text-8xl leading-[0.9]">
            MANAGE YOUR <span className="text-[#2A9D58]">SOCCER LEAGUES</span>{" "}
            WITH EASE
          </h1>
          <p className="text-lg lg:text-xl text-[#1D2A68] mb-4">
            Create leagues, schedule matches, track results, and view standings
            - all in one place. Your personal league management solution.
          </p>
          <Link href="/login">
            <button className="bg-[#2A9D58] text-white px-6 py-3 rounded-lg text-lg font-semibold transition duration-300 hover:bg-[#1D2A68] mt-2 cursor-pointer flex items-center gap-2">
              Get Started
              <FaArrowRight />
            </button>
          </Link>
        </div>

        {/* Right Section */}
        <div className="text-center lg:text-left rounded-3xl overflow-hidden shadow-lg">
          <Image src="/images/hero.jpg" alt="hero" width={550} height={550} />
        </div>
      </div>
    </div>
  );
}
