"use client";

import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context"; // Importing the useUserAuth hook

export default function Page() {
  // Using the useUserAuth hook to get user and googleSignIn function
  const { user, googleSignIn, firebaseSignOut } = useUserAuth(); // Destructure googleSignIn here

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn(); // Now googleSignIn is defined here
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-200">
      <h1 className="text-4xl font-semibold text-center mb-8">Login Page</h1>

      {/* If the user is not logged in, show the login message */}
      {!user ? (
        <div className="w-full max-w-sm p-8 bg-gray-400 shadow-xl rounded-xl text-center">
          <p className="text-xl font-semibold mb-6 text-gray-800">
            Please sign in to continue
          </p>

          {/* Button triggers Google sign-in */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full px-6 py-3 mb-6 bg-[#2DAA5B] text-white rounded-lg font-semibold hover:bg-[#1D2A68] transition duration-300 cursor-pointer"
          >
            Sign in with Google
          </button>
        </div>
      ) : (
        // If the user is logged in, show the "Go to Dashboard" button
        <>
          <Link href="/leagues">
            <button className="font-medium bg-[#2DAA5B] px-4 py-2 rounded-lg text-white cursor-pointer transition duration-300 hover:bg-[#1D2A68]">
              Go to Dashboard
            </button>
          </Link>
          <button
            onClick={handleSignOut}
            className="font-medium bg-[#2DAA5B] px-4 py-2 rounded-lg text-white cursor-pointer transition duration-300 hover:bg-[#1D2A68]"
          >
            Sign Out
          </button>
        </>
      )}
    </div>
  );
}
