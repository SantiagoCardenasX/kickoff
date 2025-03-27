import { db } from "../../login/_utils/firebase";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  updateDoc,
  runTransaction,
} from "firebase/firestore";

export const getMatches = async (userId, leagueId) => {
  const matchesCol = collection(
    db,
    `users/${userId}/leagues/${leagueId}/matches`
  );
  const snapshot = await getDocs(matchesCol);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const submitResult = async (
  userId,
  leagueId,
  matchId,
  { homeGoals, awayGoals }
) => {
  const matchRef = doc(
    db,
    `users/${userId}/leagues/${leagueId}/matches/${matchId}`
  );
  const matchDoc = await getDoc(matchRef);
  if (!matchDoc.exists()) throw new Error("Match not found");
  const match = matchDoc.data();

  const homeTeamRef = doc(
    db,
    `users/${userId}/leagues/${leagueId}/teams/${match.homeTeam}`
  );
  const awayTeamRef = doc(
    db,
    `users/${userId}/leagues/${leagueId}/teams/${match.awayTeam}`
  );

  await runTransaction(db, async (transaction) => {
    // First perform all reads
    const [homeTeamDoc, awayTeamDoc] = await Promise.all([
      transaction.get(homeTeamRef),
      transaction.get(awayTeamRef), // Fixed variable name here
    ]);

    // Process data
    const homeData = homeTeamDoc.data();
    const awayData = awayTeamDoc.data();

    const newHomeStats = updateTeamStats(homeData, homeGoals, awayGoals);
    const newAwayStats = updateTeamStats(awayData, awayGoals, homeGoals);

    // Then perform all writes
    transaction.update(matchRef, {
      status: "completed",
      homeGoals,
      awayGoals,
      updatedAt: new Date(),
    });
    transaction.update(homeTeamRef, newHomeStats);
    transaction.update(awayTeamRef, newAwayStats);
  });
};

const updateTeamStats = (currentStats, goalsFor, goalsAgainst) => {
  const isWin = goalsFor > goalsAgainst;
  const isDraw = goalsFor === goalsAgainst;

  return {
    matchesPlayed: (currentStats.matchesPlayed || 0) + 1,
    wins: (currentStats.wins || 0) + (isWin ? 1 : 0),
    losses: (currentStats.losses || 0) + (isWin ? 0 : isDraw ? 0 : 1),
    draws: (currentStats.draws || 0) + (isDraw ? 1 : 0),
    goalsScored: (currentStats.goalsScored || 0) + goalsFor,
    goalsConceded: (currentStats.goalsConceded || 0) + goalsAgainst,
  };
};
