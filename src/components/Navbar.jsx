"use client";

import { useCartStore } from "../stores/cartStore";
import { FiShoppingCart } from "react-icons/fi";
import styles from "../styles/header.module.css";
import Link from "next/link";

export default function NavBar() {
  const cart = useCartStore((state) => state.cart);

  return (
    <nav className="flex flex-wrap items-center gap-4 sm:gap-6">
      {/* Links */}
      <ul className="flex flex-wrap items-center gap-3 sm:gap-5 font-semibold text-sm sm:text-base">
        <li className={styles.navlink}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.navlink}>
          <Link href="/store">Store</Link>
        </li>
      </ul>

      {/* Cart */}
      <div className="flex items-center">
        <div className="relative">
          <Link href="/cart">
            <FiShoppingCart
              color="black"
              size={22}
              className="sm:size-[24px]"
            />
          </Link>
          <span
            className={`${styles.cartBadge} absolute -top-2 -right-3 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center sm:-top-[15px] sm:-right-[20px]`}
          >
            {cart.length}
          </span>
        </div>
      </div>
    </nav>
  );
}
