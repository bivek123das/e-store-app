"use client";

import { FiShoppingCart } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useCartStore } from "../stores/cartStore";
import Link from "next/link";
import { useState } from "react";

export default function ProductCartButton({ product, showMessage = true }) {
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addToCart);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleBuyNow = () => {
    addToCart(product);
    if (showMessage) {
      setShowSuccessMessage(true);
      // Auto-hide message after 5 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
    // Don't show message for cart icon button
  };

  return (
    <div className="mt-4">
      {/* Success Message */}
      {showSuccessMessage && showMessage && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center justify-between">
          <span className="text-sm sm:text-base">
            ✅ Added to cart! 
            <Link href="/cart" className="ml-2 font-semibold underline hover:text-green-800">
              View Cart
            </Link>
          </span>
          <button
            onClick={() => setShowSuccessMessage(false)}
            className="ml-2 text-green-700 hover:text-green-900 font-bold"
          >
            ×
          </button>
        </div>
      )}

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
          {/* Text on mobile */}
          <span className="block sm:hidden">Add to Cart</span>
          {/* Icon on sm and up */}
          <FiShoppingCart className="hidden sm:block" size={20} />
        </Link>
      </div>
    </div>
  );
}
