"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utlis/firebase";
import { useUserStore } from "../stores/userStore";
import Header from "./Header";
import Footer from "./Footer";

import { Toaster } from "react-hot-toast";  // ⬅️ ADD THIS

export default function ClientLayoutWrapper({ children }) {
  const setUser = useUserStore((s) => s.setUser);
  const user = useUserStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        });
      } else {
        setUser(null);
        router.push("/login");
      }
    });

    return () => unsub();
  }, [setUser, router]);

  // Prevent flicker before auth loads
  if (user === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* 🔥 Global Toast System */}
      <Toaster position="top-right" reverseOrder={false} />

      <Header />

      <main className="flex-1 flex flex-col min-h-0 pt-20">
        {children}
      </main>

      <Footer className="mt-auto" />
    </>
  );
}
