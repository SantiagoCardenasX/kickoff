"use client";

import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context"; // Importing the useUserAuth hook
import { FcGoogle } from "react-icons/fc"; // Importing Google icon

export default function Page() {
  // Using the useUserAuth hook to get user and googleSignIn function
  const { user, googleSignIn, firebaseSignOut } = useUserAuth();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn(); // Google sign-in function
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut(); // Firebase sign-out function
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100 p-6">
      <div className="flex flex-col justify-center items-center bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-bold text-[#1D2A68] mb-6">Login</h1>
        <p className="text-lg text-[#1D2A68] mb-6">
          Sign in to manage your soccer leagues.
        </p>

        {/* If the user is not logged in, show the Google sign-in button */}
        {!user ? (
          <>
            <button
              onClick={handleGoogleSignIn}
              className="w-full bg-[#4285F4] text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-3 mb-4 transition duration-300 hover:bg-[#1D2A68] cursor-pointer"
            >
              <FcGoogle className="text-2xl" />
              Sign in with Google
            </button>
            <Link
              href="/"
              className="w-full bg-[#2DAA5B] text-white text-center px-6 py-3 rounded-lg font-semibold mb-4 transition duration-300 hover:bg-[#1D2A68] cursor-pointer"
            >
              Go to Home
            </Link>
          </>
        ) : (
          <>
            {/* Go to Dashboard Button */}
            <div>
              <Link href="/leagues">
                <button className="w-full bg-[#2DAA5B] text-white px-6 py-3 rounded-lg font-semibold mb-4 transition duration-300 hover:bg-[#1D2A68] cursor-pointer">
                  Go to Dashboard
                </button>
              </Link>

              {/* Sign Out Button */}
              <button
                onClick={handleSignOut}
                className="w-full bg-[#FF3B30] text-white px-6 py-3 rounded-lg font-semibold transition duration-300 hover:bg-[#1D2A68] cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
