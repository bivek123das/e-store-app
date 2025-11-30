// "use client";

// import React from "react";
// import Link from "next/link";
// import { useUserStore } from "../stores/userStore";
// import { auth } from "../utlis/firebase";
// import { usePathname, useRouter } from "next/navigation";
// import { FiLogOut } from "react-icons/fi";
// import styles from "../styles/header.module.css";
// import Container from "./Container";

// export default function Header() {
//   const pathname = usePathname();
//   const router = useRouter();
//   const user = useUserStore((state) => state.user);
//   const logoutUser = useUserStore((state) => state.logoutUser);

//   const handleLogout = async () => {
//     await auth.signOut();
//     logoutUser();
//     router.replace("/login");
//   };

//   // Hide menu on login page
//   const isLoginPage = pathname === "/login";

//   return (
//     <header className={`${styles.header} py-3 px-2 shadow`}>
//      <Container className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6">
//       {/* LOGO */}
//       <Link href="/">
//         <span className="text-pink-500 font-bold text-3xl cursor-pointer">
//           E-Store<span className="text-white">.</span>
//         </span>
//       </Link>

//       {/* Nav Items (Hidden on login page) */}
//       {!isLoginPage && (
//         <nav className="flex items-center gap-6 text-lg">

//           <Link href="/" className="hover:text-pink-400 transition">
//             Home
//           </Link>

//           <Link href="/store" className="hover:text-pink-400 transition">
//             Store
//           </Link>

//           {/* Show Signout only when user logged in */}
//           {user && (
//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-lg 
//                          hover:bg-red-500 transition"
//             >
//               <FiLogOut /> Sign Out
//             </button>
//           )}
//         </nav>
//       )}
//       </Container>
//     </header>
//   );
// }



"use client";

import React from "react";
import styles from "../styles/header.module.css";
import Container from "./Container";
import Link from "next/link";
import NavBar from "./Navbar";
import { LogOut } from "lucide-react";
import { auth } from "../utlis/firebase";
import { useUserStore } from "../stores/userStore";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();  // detect current route

  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);

  const handleSignOut = async () => {
    await auth.signOut();
    clearUser();
    router.push("/login");
  };

  // 🔥 Hide Navbar + SignOut on login page
  const isLoginPage = pathname === "/login";

  return (
    <header className={`${styles.header} py-3 px-2 shadow`}>
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6">

        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <Link href={"/"}>
            <span className="text-pink-500 font-bold text-2xl sm:text-3xl md:text-4xl cursor-pointer">
              E-Store<b className="text-black">.</b>
            </span>
          </Link>
        </div>

        {/* Right Side */}
        {!isLoginPage && (
          <div className="flex items-center gap-6 sm:gap-10">

            {/* Navigation */}
            <NavBar />

            {/* Sign Out */}
            {user && (
              <button
                onClick={handleSignOut}
                className="flex items-center gap-1 cursor-pointer text-pink-600 hover:text-pink-800 transition font-semibold"
              >
                <LogOut size={20} />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            )}
          </div>
        )}

      </Container>
    </header>
  );
}






