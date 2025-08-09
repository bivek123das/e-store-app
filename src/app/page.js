import React from "react";
import HeroSection from "../components/home/HeroSection";
import RecentlyAdded from "../components/home/RecentlyAdded";
import Featured from "../components/home/Feartured";

export default function Homepage() {
  return (
    <>
        <HeroSection/>
        <Featured/>
        <RecentlyAdded/>
    </>
  )
}
