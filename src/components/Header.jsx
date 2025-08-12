import React from "react";
import styles from "../styles/header.module.css";
import Container from "./Container";
import Link from "next/link";
import NavBar from "./Navbar";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className={`${styles.header} py-3 px-2 shadow`}>
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6">
        
        {/* Left: Logo */}
        <div className="flex items-center flex-shrink-0">
          <Link href={"/"}>
            <span className="text-pink-500 font-bold text-2xl sm:text-3xl md:text-4xl cursor-pointer">
              E-Store<b className="text-black">.</b>
            </span>
          </Link>
        </div>

        {/* Right: Nav + Auth */}
        <div className="flex items-center flex-wrap justify-center sm:justify-end gap-6 sm:gap-10">
          {/* Navigation */}
          <NavBar />

          {/* Add space before auth buttons */}
          <div className="flex items-center  gap-4 sm:ml-6">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-pink-500 text-white rounded text-sm sm:text-base hover:bg-pink-600 transition">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl={"/"} />
            </SignedIn>
          </div>
        </div>

      </Container>
    </header>
  );
}







