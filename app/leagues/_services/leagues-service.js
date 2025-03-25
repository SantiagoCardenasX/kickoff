import { db } from "../../login/_utils/firebase";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";

export async function getLeagues(userId) {
  // Add userId parameter
  const leagues = [];
  const q = query(
    collection(db, "leagues"),
    where("userId", "==", userId) // Add this filter
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    leagues.push({ id: doc.id, ...doc.data() }); // Include document ID
  });
  return leagues;
}

export async function addLeague(userId, league) {
  league.userId = userId;
  await addDoc(collection(db, "leagues"), league);
}