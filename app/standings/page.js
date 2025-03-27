"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSortBy, useTable } from "react-table";
import { auth } from "@/app/login/_utils/firebase";
import { getLeagues } from "../leagues/_services/leagues-service";
import { getTeams } from "../teams/_services/team-service";
import Sidebar from "@/components/sidebar";
import { AuthContextProvider } from "../login/_utils/auth-context";
import Image from "next/image";

export default function Standings() {
  const [leagues, setLeagues] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState("");
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

  const loadTeams = useCallback(async () => {
    if (!selectedLeague || !userId) return;
    setLoading(true);
    try {
      const teamsData = await getTeams(userId, selectedLeague);
      setTeams(teamsData);
    } catch (error) {
      console.error("Error loading teams:", error);
    } finally {
      setLoading(false);
    }
  }, [userId, selectedLeague]);

  useEffect(() => {
    loadTeams();
  }, [loadTeams]);

  const columns = useMemo(
    () => [
      {
        Header: "Position",
        accessor: "position",
        Cell: ({ row }) => row.index + 1,
      },
      {
        Header: "Team",
        accessor: "name",
        Cell: ({ row }) => (
          <div className="flex items-center gap-3">
            {row.original.logo && (
              <Image
                src={row.original.logo}
                alt={row.original.name}
                width={32}
                height={32}
                className="w-8 h-8 object-cover rounded-full"
              />
            )}
            <span className="font-medium">{row.original.name}</span>
          </div>
        ),
      },
      { Header: "MP", accessor: "matchesPlayed" },
      { Header: "W", accessor: "wins" },
      { Header: "D", accessor: "draws" },
      { Header: "L", accessor: "losses" },
      { Header: "GF", accessor: "goalsScored" },
      { Header: "GA", accessor: "goalsConceded" },
      {
        Header: "GD",
        accessor: "goalDifference",
        Cell: ({ row }) =>
          row.original.goalsScored - row.original.goalsConceded,
      },
      {
        Header: "Pts",
        accessor: "points",
        Cell: ({ row }) => row.original.wins * 3 + row.original.draws,
      },
    ],
    []
  );

  const sortedTeams = useMemo(() => {
    return [...teams].sort((a, b) => {
      const pointsA = a.wins * 3 + a.draws;
      const pointsB = b.wins * 3 + b.draws;
      const gdA = a.goalsScored - a.goalsConceded;
      const gdB = b.goalsScored - b.goalsConceded;

      if (pointsB !== pointsA) return pointsB - pointsA;
      if (gdB !== gdA) return gdB - gdA;
      return b.goalsScored - a.goalsScored;
    });
  }, [teams]);

  const tableInstance = useTable(
    {
      columns,
      data: sortedTeams,
    },
    useSortBy
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <AuthContextProvider>
      <div className="flex">
        <Sidebar />
        <div className="lg:ml-64 p-10 transition-all duration-300 flex-1">
          <h1 className="text-3xl font-semibold text-gray-800">
            League Standings
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            View team rankings and statistics
          </p>

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

          <div className="mt-8 overflow-x-auto">
            {loading ? (
              <p className="text-gray-500">Loading standings...</p>
            ) : teams.length > 0 ? (
              <table {...getTableProps()} className="w-full">
                <thead>
                  {headerGroups.map(
                    (
                      headerGroup,
                      headerGroupIndex // Add index as fallback
                    ) => (
                      <tr
                        {...headerGroup.getHeaderGroupProps()}
                        key={headerGroupIndex} // Unique key for header group
                        className="border-b-2 border-gray-200"
                      >
                        {headerGroup.headers.map((column) => (
                          <th
                            {...column.getHeaderProps(
                              column.getSortByToggleProps()
                            )}
                            key={column.id} // Already correct
                            className="px-4 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-50"
                          >
                            {column.render("Header")}
                            <span className="ml-2">
                              {column.isSorted
                                ? column.isSortedDesc
                                  ? "↓"
                                  : "↑"
                                : ""}
                            </span>
                          </th>
                        ))}
                      </tr>
                    )
                  )}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                      <tr
                        {...row.getRowProps()}
                        key={row.original?.id || row.id} // Double-check ID existence
                        className="hover:bg-gray-50 even:bg-gray-100"
                      >
                        {row.cells.map((cell) => (
                          <td
                            {...cell.getCellProps()}
                            key={`${row.original?.id}-${cell.column.id}`} // Safe access
                            className="px-4 py-3 text-sm text-gray-700"
                          >
                            {cell.render("Cell")}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">
                {selectedLeague
                  ? "No teams found"
                  : "Select a league to view standings"}
              </p>
            )}
          </div>
        </div>
      </div>
    </AuthContextProvider>
  );
}
