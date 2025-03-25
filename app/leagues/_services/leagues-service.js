import { db } from "../../login/_utils/firebase";
import {
  doc,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

// Fetch leagues for a specific user
export async function getLeagues(userId) {
  const leagues = [];
  const leaguesRef = collection(db, "users", userId, "leagues"); // Access the user's leagues subcollection
  const querySnapshot = await getDocs(leaguesRef);
  querySnapshot.forEach((doc) => {
    leagues.push({ id: doc.id, ...doc.data() });
  });
  return leagues;
}

// Add a new league for a specific user
export async function addLeague(userId, league) {
  const leaguesRef = collection(db, "users", userId, "leagues"); // Access the user's leagues subcollection
  await addDoc(leaguesRef, {...league, userId}); // Add a new league document
}

// Delete a specific league for a user
export async function deleteLeague(userId, leagueId) {
  const leagueRef = doc(db, "users", userId, "leagues", leagueId); // Access the specific league document
  await deleteDoc(leagueRef); // Delete the league document
}
