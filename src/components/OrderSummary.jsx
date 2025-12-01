"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function OrderSummary({ order }) {
  const router = useRouter();

  // Fallbacks in case some order details are missing
  const { orderId = "N/A", items = [], subtotal = 0, tax = 0, total = 0 } = order || [];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      {/* Card animation */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-6 sm:p-8"
      >
        {/* Success Icon animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 180, delay: 0.1 }}
          className="flex flex-col items-center"
        >
          <CheckCircle size={65} className="text-green-600 drop-shadow-md" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-3xl font-bold text-center mt-3"
        >
          Payment Successful 🎉
        </motion.h1>

        <p className="text-gray-500 text-center text-sm mt-1">
          Your order has been placed successfully.
        </p>

        {/* Order ID Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
          className="mt-6 bg-gray-100 p-4 rounded-lg"
        >
          <p className="text-gray-700 text-sm">
            <span className="font-semibold">Order ID:</span> {orderId}
          </p>
        </motion.div>

        {/* Items List */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Items</h2>
          {items.length === 0 ? (
            <p className="text-gray-500 text-sm mt-2">No items found.</p>
          ) : (
            <ul className="mt-2 space-y-3">
              {items.map((item, i) => (
                <motion.li
                  key={item.id || i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex justify-between bg-gray-50 p-3 rounded-lg border"
                >
                  <p>{item.title} (x{item.quantity})</p>
                  <p className="font-bold">
                    ₹{Number(item.price * item.quantity).toLocaleString()}
                  </p>
                </motion.li>
              ))}
            </ul>
          )}
        </div>

        {/* Totals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 border-t pt-4"
        >
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span> <span>₹{Number(subtotal).toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax:</span> <span>₹{Number(tax).toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-semibold text-gray-900">
            <span>Total:</span> <span>₹{Number(total).toLocaleString()}</span>
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex gap-3 flex-col sm:flex-row"
        >
          <button
            onClick={() => router.push("/")}
            className="w-full bg-pink-500 text-white py-3 rounded-xl hover:bg-pink-600 transition"
          >
            Continue Shopping
          </button>
          <button
             onClick={() => router.push(`/orders`)}
            className="w-full bg-gray-800 text-white py-3 rounded-xl hover:bg-gray-900 transition"
          >
            View Orders
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
