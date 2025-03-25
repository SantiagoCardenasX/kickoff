"use client";

import Sidebar from "@/components/sidebar";
import { AuthContextProvider } from "../login/_utils/auth-context";
import { getLeagues, addLeague } from "./_services/leagues-service";
import { useEffect, useState } from "react";
import { auth } from "@/app/login/_utils/firebase";

export default function Leagues() {
  const [leagues, setLeagues] = useState([]);
  const [newLeagueName, setNewLeagueName] = useState("");
  const [userId, setUserId] = useState(null); // Store userId in state

  // Update userId when auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid); // Set userId if authenticated
      } else {
        setUserId(null); // Set to null if no user is logged in
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  // Fetch leagues whenever userId changes
  useEffect(() => {
    if (userId) {
      loadLeagues(userId);
    }
  }, [userId]);

  const loadLeagues = async (userId) => {
    try {
      const leagues = await getLeagues(userId); // Fetch leagues for the current user
      setLeagues(leagues); // Update leagues state
    } catch (error) {
      console.error("Error loading leagues:", error);
    }
  };

  const handleAddLeague = async () => {
    if (!newLeagueName.trim()) return; // Prevent adding empty league names

    if (!userId) {
      console.error("User not authenticated");
      return;
    }

    try {
      await addLeague(userId, { name: newLeagueName, createdAt: new Date() }); // Add league with userId
      setNewLeagueName(""); // Clear the input field
      loadLeagues(userId); // Reload leagues after adding a new one
    } catch (error) {
      console.error("Error adding league:", error);
    }
  };

  return (
    <>
      {/* Wrap the layout with AuthContextProvider */}
      <AuthContextProvider>
        <div className="flex">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div className="lg:ml-64 p-10 transition-all duration-300 flex-1">
            <h1 className="text-3xl font-semibold">Leagues</h1>
            <p className="mt-4 text-lg">
              Welcome to the Leagues page! Manage your soccer leagues with ease.
            </p>

            {/* Add League Form */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Add a New League</h2>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={newLeagueName}
                  onChange={(e) => setNewLeagueName(e.target.value)}
                  placeholder="Enter league name"
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A9D58]"
                />
                <button
                  onClick={handleAddLeague}
                  className="bg-[#2A9D58] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#1D2A68] transition duration-300 cursor-pointer"
                >
                  Add League
                </button>
              </div>
            </div>

            {/* List of Leagues */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Your Leagues</h2>
              {leagues.length > 0 ? (
                <ul className="space-y-4">
                  {leagues.map((league) => (
                    <li
                      key={league.id}
                      className="p-4 bg-white shadow rounded-lg flex justify-between items-center"
                    >
                      <span className="text-lg font-medium">{league.name}</span>
                      <span className="text-sm text-gray-500">
                        Created on:{" "}
                        {new Date(league.createdAt).toLocaleDateString()}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">
                  No leagues found. Add a new league to get started!
                </p>
              )}
            </div>
          </div>
        </div>
      </AuthContextProvider>
    </>
  );
}
