"use client";

import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "./firebase";

// Create the AuthContext to manage authentication state
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to handle Google sign-in
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // The signed-in user info
      const user = result.user;
      return user;
    } catch (error) {
      console.error("Error signing in with Google", error);
      throw error;
    }
  };

  // Function to handle sign-out
  const firebaseSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  // Listen for authentication state changes and update the user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the user state based on the authentication status
    });
    return () => unsubscribe();
  }, []); // Only run once on mount, not every time `user` changes

  return (
    <AuthContext.Provider value={{ user, googleSignIn, firebaseSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the authentication context
export const useUserAuth = () => {
  return useContext(AuthContext);
};
