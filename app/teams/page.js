"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/app/login/_utils/firebase";
import { getLeagues } from "../leagues/_services/leagues-service";
import { getTeams, addTeam, deleteTeam } from "./_services/team-service.js";
import { FaRegTrashAlt } from "react-icons/fa";
import Sidebar from "@/components/sidebar";
import { AuthContextProvider } from "../login/_utils/auth-context";
import Image from "next/image";

export default function Teams() {
  const [leagues, setLeagues] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState("");
  const [newTeamName, setNewTeamName] = useState("");
  const [teamLogoUrl, setTeamLogoUrl] = useState("");
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

  const loadTeams = async () => {
    if (!selectedLeague || !userId) return;
    setLoading(true);
    try {
      const teams = await getTeams(userId, selectedLeague);
      teams.sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { numeric: true })
      );
      setTeams(teams);
    } catch (error) {
      console.error("Error loading teams:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeams();
  }, [selectedLeague]);

  const handleAddTeam = async (e) => {
    e.preventDefault();
    if (!newTeamName.trim() || !selectedLeague) return;

    try {
      await addTeam(userId, selectedLeague, {
        name: newTeamName,
        logo: teamLogoUrl,
      });
      setNewTeamName("");
      setTeamLogoUrl("");
      await loadTeams();
    } catch (error) {
      console.error("Error adding team:", error);
    }
  };

  const handleDeleteTeam = async (teamId) => {
    const confirmDelete = window.confirm("Delete this team?");
    if (!confirmDelete) return;

    try {
      await deleteTeam(userId, selectedLeague, teamId);
      await loadTeams();
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };

  return (
    <AuthContextProvider>
      <div className="flex">
        <Sidebar />
        <div className="lg:ml-64 p-10 transition-all duration-300 flex-1">
          <h1 className="text-3xl font-semibold">Teams Management</h1>

          {/* League Selection */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Select League</h2>
            <select
              value={selectedLeague}
              onChange={(e) => setSelectedLeague(e.target.value)}
              className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A9D58]"
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

          {/* Add Team Form */}
          {selectedLeague && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Add New Team</h2>
              <form
                onSubmit={handleAddTeam}
                className="flex flex-col gap-4 max-w-md"
              >
                <input
                  type="text"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  placeholder="Team name"
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A9D58] text-base"
                />
                <input
                  type="url"
                  value={teamLogoUrl}
                  onChange={(e) => setTeamLogoUrl(e.target.value)}
                  placeholder="Team logo URL (optional)"
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A9D58] text-base"
                />
                <button
                  type="submit"
                  className="bg-[#2A9D58] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1D2A68] transition duration-300 text-base cursor-pointer"
                >
                  Add Team
                </button>
              </form>
            </div>
          )}
          {/* Teams List */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Teams List</h2>
            {loading ? (
              <p className="text-gray-500">Loading teams...</p>
            ) : teams.length > 0 ? (
              <ul className="space-y-4">
                {teams.map((team) => (
                  <li
                    key={team.id}
                    className="p-4 bg-white shadow rounded-lg flex justify-between items-center"
                  >
                    <div className="flex items-center gap-4">
                      {team.logo && (
                        <Image
                          src={team.logo}
                          alt={team.name}
                          width={48}
                          height={48}
                          className="w-12 h-12 object-cover rounded-full"
                        />
                      )}
                      <span className="text-lg font-medium">{team.name}</span>
                    </div>
                    <button
                      onClick={() => handleDeleteTeam(team.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaRegTrashAlt size={20} className="cursor-pointer" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">
                {selectedLeague
                  ? "No teams found"
                  : "Select a league to view teams"}
              </p>
            )}
          </div>
        </div>
      </div>
    </AuthContextProvider>
  );
}
