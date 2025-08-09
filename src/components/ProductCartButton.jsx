"use client";

import { FiShoppingCart } from "react-icons/fi";
import { useCartStore } from "../stores/cartStore";

export default function ProductCartButton({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="mt-4 flex items-center gap-2 flex-wrap">
      <button className="bg-pink-500 text-white py-2 px-4 sm:px-5 rounded-lg hover:bg-pink-600 transition duration-300 text-sm sm:text-base w-full sm:w-auto">
        Buy Now
      </button>
      <button
        onClick={() => addToCart(product)}
        className="p-2 sm:p-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition w-full sm:w-auto flex justify-center"
        title="Add to Cart"
      >
        <FiShoppingCart size={20} />
      </button>
    </div>
  );
}


