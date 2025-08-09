"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "../../stores/cartStore";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Your cart is empty</h2>
        <Link href="/store">
          <button className="px-4 sm:px-5 py-2 bg-pink-500 text-white rounded hover:bg-pink-600">
            Go to Store
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Your Cart</h1>

      <div className="bg-white rounded-lg shadow-lg p-4">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 py-4 gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div>
                <h2 className="font-semibold text-sm sm:text-base">{item.title}</h2>
                <p className="text-gray-500 text-sm sm:text-base">
                  ${item.price} × {item.quantity}
                </p>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item._id)}
              className="text-red-500 hover:underline text-sm sm:text-base self-start sm:self-auto"
            >
              Remove
            </button>
          </div>
        ))}

        {/* Total */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 gap-4">
          <h2 className="text-lg sm:text-xl font-bold">
            Total: ${totalAmount.toFixed(2)}
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={clearCart}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm sm:text-base w-full sm:w-auto"
            >
              Clear Cart
            </button>
            <button className="px-5 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 text-sm sm:text-base w-full sm:w-auto">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


