import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>Login Page</h1>
      <Link href="/leagues">
        <button className="font-medium bg-[#2DAA5B] px-4 py-2 rounded-lg text-white cursor-pointer transition duration-300 hover:bg-[#1D2A68]">Go to Dashboard</button>
      </Link>
    </div>
  );
}
