"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { auth } from "@/app/login/_utils/firebase";
import { getLeagues } from "../leagues/_services/leagues-service";
import { getTeams } from "../teams/_services/team-service";
import { getMatches, addMatch, deleteMatch } from "./_services/matches-service";
import Sidebar from "@/components/sidebar";
import { AuthContextProvider } from "../login/_utils/auth-context";
import { FaRegTrashAlt } from "react-icons/fa";

export default function Matches() {
  const [leagues, setLeagues] = useState([]);
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState("");
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [matchDate, setMatchDate] = useState("");
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
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

  const loadTeamsAndMatches = async () => {
    if (!selectedLeague || !userId) return;
    setLoading(true);
    try {
      // Load teams
      const teamsData = await getTeams(userId, selectedLeague);
      setTeams(teamsData);

      // Load matches
      const matchesData = await getMatches(userId, selectedLeague);
      setMatches(matchesData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeamsAndMatches();
  }, [selectedLeague]);

  const handleAddMatch = async (e) => {
    e.preventDefault();
    if (!homeTeam || !awayTeam || homeTeam === awayTeam || !matchDate) return;

    try {
      await addMatch(userId, selectedLeague, {
        homeTeam,
        awayTeam,
        date: new Date(matchDate),
        status: "scheduled",
      });
      setHomeTeam("");
      setAwayTeam("");
      setMatchDate("");
      await loadTeamsAndMatches();
    } catch (error) {
      console.error("Error adding match:", error);
    }
  };

  const handleDeleteMatch = async (matchId) => {
    const confirmDelete = window.confirm("Delete this match?");
    if (!confirmDelete) return;

    try {
      await deleteMatch(userId, selectedLeague, matchId);
      await loadTeamsAndMatches();
    } catch (error) {
      console.error("Error deleting match:", error);
    }
  };

  const filteredAwayTeams = teams.filter((team) => team.id !== homeTeam);
  const filteredHomeTeams = teams.filter((team) => team.id !== awayTeam);

  return (
    <AuthContextProvider>
      <div className="flex">
        <Sidebar />
        <div className="lg:ml-64 p-10 transition-all duration-300 flex-1">
          <h1 className="text-3xl font-semibold text-gray-800">Matches</h1>
          <p className="mt-2 text-lg text-gray-600">
            Add, edit, and remove upcoming matches for your league with ease.
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

          {/* Add Match Form */}
          {selectedLeague && (
            <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Schedule New Match
              </h2>
              <form onSubmit={handleAddMatch} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Home Team
                    </label>
                    <select
                      value={homeTeam}
                      onChange={(e) => setHomeTeam(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#2A9D58] transition-colors"
                      required
                    >
                      <option value="" disabled>
                        Select home team
                      </option>
                      {filteredHomeTeams.map((team) => (
                        <option key={team.id} value={team.id}>
                          {team.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Away Team
                    </label>
                    <select
                      value={awayTeam}
                      onChange={(e) => setAwayTeam(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#2A9D58] transition-colors"
                      required
                    >
                      <option value="" disabled>
                        Select away team
                      </option>
                      {filteredAwayTeams.map((team) => (
                        <option key={team.id} value={team.id}>
                          {team.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      value={matchDate}
                      onChange={(e) => setMatchDate(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#2A9D58] transition-colors [&::-webkit-calendar-picker-indicator]:opacity-60 [&::-webkit-calendar-picker-indicator]:hover:opacity-100"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-[#2A9D58] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#1D2A68] transition duration-300 cursor-pointer w-fit shadow-md self-end"
                >
                  Schedule Match
                </button>
              </form>
            </div>
          )}
          {/* Matches List */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Scheduled Matches
            </h2>
            {loading ? (
              <p className="text-gray-500">Loading matches...</p>
            ) : matches.length > 0 ? (
              <ul className="space-y-4">
                {matches.map((match) => {
                  const home = teams.find((t) => t.id === match.homeTeam);
                  const away = teams.find((t) => t.id === match.awayTeam);
                  const matchDate = new Date(match.date.seconds * 1000);

                  return (
                    <li
                      key={match.id}
                      className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 flex justify-between items-center"
                    >
                      <div className="flex-1 flex items-center gap-6">
                        {/* Home Team */}
                        <div className="flex items-center gap-4 flex-1">
                          {home?.logo && (
                            <Image
                              src={home.logo}
                              alt={home.name}
                              width={64}
                              height={64}
                              className="w-16 h-16 object-cover rounded-full border-2 border-gray-200"
                            />
                          )}
                          <span className="text-lg font-semibold text-gray-800">
                            {home?.name || "Unknown Team"}
                          </span>
                        </div>

                        {/* Match Details */}
                        <div className="flex flex-col items-center mx-4">
                          <div className="bg-gray-100 px-4 py-2 rounded-full">
                            <span className="font-bold text-gray-600">VS</span>
                          </div>
                          <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span>
                              {matchDate.toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                            <span className="mx-1">•</span>
                            <span>
                              {matchDate.toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </div>

                        {/* Away Team */}
                        <div className="flex items-center gap-4 flex-1 justify-end">
                          <span className="text-lg font-semibold text-gray-800">
                            {away?.name || "Unknown Team"}
                          </span>
                          {away?.logo && (
                            <Image
                              src={away.logo}
                              alt={away.name}
                              width={64}
                              height={64}
                              className="w-16 h-16 object-cover rounded-full border-2 border-gray-200"
                            />
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteMatch(match.id)}
                        className="text-red-500 hover:text-red-700 ml-6 p-2 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <FaRegTrashAlt size={20} className="cursor-pointer" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-gray-500">
                {selectedLeague
                  ? "No matches scheduled"
                  : "Select a league to view matches"}
              </p>
            )}
          </div>
        </div>
      </div>
    </AuthContextProvider>
  );
}
