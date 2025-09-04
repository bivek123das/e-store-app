"use client";

import { FiShoppingCart } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useCartStore } from "../stores/cartStore";
import Link from "next/link";

export default function ProductCartButton({ product }) {
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addToCart);

  const handleBuyNow = () => {
    addToCart(product);
  };

  return (
    <div className="mt-4 flex items-center justify-between gap-2 flex-wrap">
      <button
        className="bg-pink-500 text-white py-2 px-4 sm:px-5 rounded-lg cursor-pointer hover:bg-pink-600 transition duration-300 text-sm sm:text-base w-full sm:w-auto"
        onClick={handleBuyNow}
      >
        Buy Now
      </button>

      <Link
      href="/cart"
      onClick={() => addToCart(product)}
      className="bg-gray-200 text-gray-800 py-2 px-4 sm:px-5 rounded-lg cursor-pointer hover:bg-gray-300 transition duration-300 text-sm sm:text-base w-full sm:w-auto inline-flex items-center justify-center"
    >
      {/* Text on mobile */}
      <span className="block sm:hidden">Add to Cart</span>
      {/* Icon on sm and up */}
      <FiShoppingCart className="hidden sm:block" size={20} />
    </Link>
    </div>
  );
}
