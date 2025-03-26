import { db } from "../../login/_utils/firebase"; // Removed storage import
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export const getTeams = async (userId, leagueId) => {
  const teamsCol = collection(db, `users/${userId}/leagues/${leagueId}/teams`);
  const snapshot = await getDocs(teamsCol);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addTeam = async (userId, leagueId, teamData) => {
  // Removed file parameter
  try {
    const docRef = await addDoc(
      collection(db, `users/${userId}/leagues/${leagueId}/teams`),
      {
        name: teamData.name,
        logo: teamData.logo || "", // Accept URL directly
        createdAt: new Date(),
      }
    );
    return { id: docRef.id, ...teamData };
  } catch (error) {
    console.error("Error adding team:", error);
    throw error;
  }
};

export const deleteTeam = async (userId, leagueId, teamId) => {
  await deleteDoc(
    doc(db, `users/${userId}/leagues/${leagueId}/teams/${teamId}`)
  );
};
