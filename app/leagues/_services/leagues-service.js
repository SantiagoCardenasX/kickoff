import { db } from "../../login/_utils/firebase";
import {
  doc,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

// Fetch leagues with team counts for a specific user
export async function getLeagues(userId) {
  const leaguesRef = collection(db, "users", userId, "leagues");
  const querySnapshot = await getDocs(leaguesRef);

  // Get team counts for all leagues in parallel
  const leaguesWithTeams = await Promise.all(
    querySnapshot.docs.map(async (leagueDoc) => {
      const teamsRef = collection(leagueDoc.ref, "teams");
      const teamsSnapshot = await getDocs(teamsRef);

      return {
        id: leagueDoc.id,
        ...leagueDoc.data(),
        teamCount: teamsSnapshot.size,
      };
    })
  );

  return leaguesWithTeams;
}

// Add a new league for a specific user
export async function addLeague(userId, league) {
  const leaguesRef = collection(db, "users", userId, "leagues");
  await addDoc(leaguesRef, {
    ...league,
    userId,
    createdAt: new Date(), // Ensure createdAt is always set
  });
}

// Delete a specific league for a user
export async function deleteLeague(userId, leagueId) {
  const leagueRef = doc(db, "users", userId, "leagues", leagueId);
  await deleteDoc(leagueRef);
}
