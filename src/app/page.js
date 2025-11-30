"use client";

import React, { useEffect, useState } from "react";
import { auth } from "../utlis/firebase";
import { useRouter } from "next/navigation";

import HeroSection from "../components/home/HeroSection";
import Featured from "../components/home/Feartured";
import RecentlyAdded from "../components/home/RecentlyAdded";

export default function Homepage() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.replace("/login"); // 🔥 prevents back-button going to home
      } else {
        setAuthChecked(true); // allow homepage to load
      }
    });

    return () => unsubscribe();
  }, []);

  // ⛔ DO NOT RENDER HOMEPAGE until Firebase finishes checking
  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <>
      <HeroSection />
      <Featured />
      <RecentlyAdded />
    </>
  );
}


