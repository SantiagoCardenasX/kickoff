import { db } from "../../login/_utils/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";

export const getMatches = async (userId, leagueId) => {
  const matchesCol = collection(
    db,
    `users/${userId}/leagues/${leagueId}/matches`
  );
  const snapshot = await getDocs(matchesCol);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addMatch = async (userId, leagueId, matchData) => {
  const docRef = await addDoc(
    collection(db, `users/${userId}/leagues/${leagueId}/matches`),
    {
      ...matchData,
      createdAt: new Date(),
    }
  );
  return { id: docRef.id, ...matchData };
};

export const deleteMatch = async (userId, leagueId, matchId) => {
  const matchRef = doc(
    db,
    `users/${userId}/leagues/${leagueId}/matches/${matchId}`
  );
  const matchDoc = await getDoc(matchRef);

  if (!matchDoc.exists()) throw new Error("Match not found");
  if (matchDoc.data().status === "completed")
    throw new Error("Cannot delete completed matches");

  await deleteDoc(matchRef);
};
