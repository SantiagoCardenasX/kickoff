import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header>
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 bg-[#FDFEFE]/70 fixed backdrop-blur-sm w-full z-50 border-b-1 border-gray-400/20">
        <div className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="logo"
            className=""
            width={40}
            height={40}
          />
          <span className="text-2xl">KICKOFF</span>
        </div>
        <div className="flex items-center gap-4 mr-5">
          <Link href="/login">
            <button className="font-medium bg-[#2DAA5B] px-4 py-2 rounded-lg text-white cursor-pointer transition duration-300 hover:bg-[#1D2A68]">
              Log In
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
