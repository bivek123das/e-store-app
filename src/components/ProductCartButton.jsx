"use client";

import { FiShoppingCart } from "react-icons/fi";
import { useCartStore } from "../stores/cartStore";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ProductCartButton({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleBuyNow = () => {
    addToCart(product);

    toast.success("Added to cart!", {
      duration: 3000,
      style: {
        borderRadius: "8px",
        background: "#222",
        color: "#fff",
      },
    });
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <button
          className="bg-pink-500 text-white py-2 px-4 sm:px-5 rounded-lg cursor-pointer hover:bg-pink-600 transition duration-300 text-sm sm:text-base w-full sm:w-auto"
          onClick={handleBuyNow}
        >
          Buy Now
        </button>

        <Link
          href="/cart"
          onClick={handleAddToCart}
          className="bg-gray-200 text-gray-800 py-2 px-4 sm:px-5 rounded-lg cursor-pointer hover:bg-gray-300 transition duration-300 text-sm sm:text-base w-full sm:w-auto inline-flex items-center justify-center"
        >
          <span className="block sm:hidden">Add to Cart</span>
          <FiShoppingCart className="hidden sm:block" size={20} />
        </Link>
      </div>
    </div>
  );
}
