import React from "react";
import styles from "../styles/header.module.css";
import Container from "./Container";
import { FiSearch } from "react-icons/fi";
import NavBar from "../components/Navbar";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className={`${styles.header} py-3 px-2 shadow`}>
      <Container className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-6">
        
      
        <Link href={"/"}>
          <div className="flex items-center">
            <span className="text-pink-500 font-bold text-2xl sm:text-3xl md:text-4xl">
              E-Store<b className="text-black">.</b>
            </span>
          </div>
        </Link>

       
        <div className={`${styles.searchBar} flex items-center w-full sm:w-auto`}>
          <input
            type="text"
            placeholder="Search for products..."
            className={`${styles.searchInput} w-full sm:w-64`}
          />
          <button className={`${styles.searchButton}`}>
            <FiSearch size={18} />
          </button>
        </div>

      
        <div className="flex items-center gap-3">
          <NavBar />

    
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
      </Container>
    </header>
  );
}



