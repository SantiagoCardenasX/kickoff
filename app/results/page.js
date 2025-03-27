"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/app/login/_utils/firebase";
import { getLeagues } from "../leagues/_services/leagues-service";
import { getTeams } from "../teams/_services/team-service";
import { getMatches, submitResult } from "./_services/results-service";
import Sidebar from "@/components/sidebar";
import { AuthContextProvider } from "../login/_utils/auth-context";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Results() {
  const [leagues, setLeagues] = useState([]);
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState("");
  const [expandedMatch, setExpandedMatch] = useState(null);
  const [homeGoals, setHomeGoals] = useState("");
  const [awayGoals, setAwayGoals] = useState("");
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        loadLeagues(user.uid);
      } else {
        router.push("/");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const loadLeagues = async (userId) => {
    try {
      const leagues = await getLeagues(userId);
      leagues.sort((a, b) => a.name.localeCompare(b.name));
      setLeagues(leagues);
    } catch (error) {
      console.error("Error loading leagues:", error);
    }
  };

  const loadData = async () => {
    if (!selectedLeague || !userId) return;
    setLoading(true);
    try {
      const [teamsData, matchesData] = await Promise.all([
        getTeams(userId, selectedLeague),
        getMatches(userId, selectedLeague),
      ]);
      setTeams(teamsData);
      setMatches(matchesData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedLeague]);

  const handleSubmitResult = async (matchId) => {
    setError("");
    if (!homeGoals || !awayGoals || homeGoals < 0 || awayGoals < 0) {
      setError("Please enter valid goal values");
      return;
    }

    setSubmitting(true);
    try {
      await submitResult(userId, selectedLeague, matchId, {
        homeGoals: parseInt(homeGoals),
        awayGoals: parseInt(awayGoals),
      });
      setExpandedMatch(null);
      setHomeGoals("");
      setAwayGoals("");
      await loadData();
    } catch (error) {
      console.error("Error submitting result:", error);
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const completedMatches = matches.filter(
    (match) => match.status === "completed"
  );
  const scheduledMatches = matches.filter(
    (match) => match.status !== "completed"
  );

  return (
    <AuthContextProvider>
      <div className="flex">
        <Sidebar />
        <div className="lg:ml-64 p-10 transition-all duration-300 flex-1">
          <h1 className="text-3xl font-semibold text-gray-800">
            Match Results
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Submit and view match results for your league. Click on a match to expand and enter the results.
          </p>

          {/* League Selection */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Select League
            </h2>
            <select
              value={selectedLeague}
              onChange={(e) => setSelectedLeague(e.target.value)}
              className="w-full max-w-lg px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#2A9D58] transition-colors"
            >
              <option value="" disabled>
                Select a league
              </option>
              {leagues.map((league) => (
                <option key={league.id} value={league.id}>
                  {league.name}
                </option>
              ))}
            </select>
          </div>

          {/* Matches List */}
          <div className="mt-8">
            {loading ? (
              <p className="text-gray-500">Loading matches...</p>
            ) : (
              <>
                {/* Completed Matches */}
                {completedMatches.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">
                      Results Added
                    </h2>
                    <ul className="space-y-4">
                      {completedMatches.map((match) => {
                        const home = teams.find((t) => t.id === match.homeTeam);
                        const away = teams.find((t) => t.id === match.awayTeam);
                        const matchDate = new Date(match.date.seconds * 1000);

                        return (
                          <motion.li
                            key={match.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-white rounded-2xl shadow-md border-l-4 border-[#2A9D58]"
                          >
                            <div className="p-6">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 flex-1">
                                  {home?.logo && (
                                    <Image
                                      src={home.logo}
                                      alt={home.name}
                                      width={48}
                                      height={48}
                                      className="w-12 h-12 object-cover rounded-full border-2 border-gray-200"
                                    />
                                  )}
                                  <span className="font-semibold text-gray-800">
                                    {home?.name}
                                  </span>
                                </div>

                                <div className="mx-4 text-2xl font-bold text-[#2A9D58]">
                                  {match.homeGoals} - {match.awayGoals}
                                </div>

                                <div className="flex items-center gap-4 flex-1 justify-end">
                                  <span className="font-semibold text-gray-800">
                                    {away?.name}
                                  </span>
                                  {away?.logo && (
                                    <Image
                                      src={away.logo}
                                      alt={away.name}
                                      width={48}
                                      height={48}
                                      className="w-12 h-12 object-cover rounded-full border-2 border-gray-200"
                                    />
                                  )}
                                </div>
                              </div>
                              <div className="mt-4 text-sm text-gray-500">
                                Played on {matchDate.toLocaleDateString()} •
                                Updated on{" "}
                                {match.updatedAt?.toDate().toLocaleDateString()}
                              </div>
                            </div>
                          </motion.li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {/* Scheduled Matches */}
                {scheduledMatches.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">
                      Scheduled Matches
                    </h2>
                    <ul className="space-y-4">
                      <AnimatePresence>
                        {scheduledMatches.map((match) => {
                          const home = teams.find(
                            (t) => t.id === match.homeTeam
                          );
                          const away = teams.find(
                            (t) => t.id === match.awayTeam
                          );
                          const matchDate = new Date(match.date.seconds * 1000);

                          return (
                            <motion.li
                              key={match.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow"
                            >
                              <div
                                className="p-6 cursor-pointer"
                                onClick={() =>
                                  setExpandedMatch(
                                    expandedMatch === match.id ? null : match.id
                                  )
                                }
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4 flex-1">
                                    {home?.logo && (
                                      <Image
                                        src={home.logo}
                                        alt={home.name}
                                        width={48}
                                        height={48}
                                        className="w-12 h-12 object-cover rounded-full border-2 border-gray-200"
                                      />
                                    )}
                                    <span className="font-semibold text-gray-800">
                                      {home?.name}
                                    </span>
                                  </div>

                                  <div className="mx-4 text-gray-500 font-medium">
                                    {matchDate.toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                    })}
                                  </div>

                                  <div className="flex items-center gap-4 flex-1 justify-end">
                                    <span className="font-semibold text-gray-800">
                                      {away?.name}
                                    </span>
                                    {away?.logo && (
                                      <Image
                                        src={away.logo}
                                        alt={away.name}
                                        width={48}
                                        height={48}
                                        className="w-12 h-12 object-cover rounded-full border-2 border-gray-200"
                                      />
                                    )}
                                  </div>
                                </div>
                              </div>

                              <AnimatePresence>
                                {expandedMatch === match.id && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="p-6 border-t border-gray-100">
                                      <form
                                        onSubmit={(e) => {
                                          e.preventDefault();
                                          handleSubmitResult(match.id);
                                        }}
                                      >
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
                                          <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">
                                              {home?.name} Goals
                                            </label>
                                            <input
                                              type="number"
                                              min="0"
                                              value={homeGoals}
                                              onChange={(e) =>
                                                setHomeGoals(e.target.value)
                                              }
                                              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#2A9D58]"
                                              required
                                            />
                                          </div>

                                          <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">
                                              {away?.name} Goals
                                            </label>
                                            <input
                                              type="number"
                                              min="0"
                                              value={awayGoals}
                                              onChange={(e) =>
                                                setAwayGoals(e.target.value)
                                              }
                                              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#2A9D58]"
                                              required
                                            />
                                          </div>

                                          <div className="md:col-span-2">
                                            <button
                                              type="submit"
                                              disabled={submitting}
                                              className="w-full bg-[#2A9D58] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1D2A68] transition duration-300 disabled:opacity-50"
                                            >
                                              {submitting
                                                ? "Submitting..."
                                                : "Save Result"}
                                            </button>
                                          </div>
                                        </div>
                                        {error && (
                                          <p className="mt-2 text-red-500 text-sm">
                                            {error}
                                          </p>
                                        )}
                                      </form>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.li>
                          );
                        })}
                      </AnimatePresence>
                    </ul>
                  </div>
                )}

                {matches.length === 0 && (
                  <p className="text-gray-500">
                    {selectedLeague
                      ? "No matches available"
                      : "Select a league to view matches"}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </AuthContextProvider>
  );
}
