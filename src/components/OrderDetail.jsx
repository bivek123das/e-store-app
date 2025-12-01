"use client";

import { useRouter } from "next/navigation";

export default function OrderDetail({ order }) {
  const router = useRouter();
  const { orderId, items, subtotal, tax, total, date } = order;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl p-6 sm:p-8">
        <h1 className="text-2xl font-bold mb-4">Order Details</h1>

        <p className="text-gray-700 mb-2">
          <strong>Order ID:</strong> {orderId}
        </p>
        {date && (
          <p className="text-gray-500 mb-4">
            <strong>Placed on:</strong> {new Date(date).toLocaleString()}
          </p>
        )}

        <h2 className="font-semibold mb-2">Items</h2>
        <ul className="mb-4">
          {items.map((item, i) => (
            <li key={item.id || i} className="flex justify-between border-b py-2">
              <span>
                {item.title} (x{item.quantity})
              </span>
              <span>₹{Number(item.price * item.quantity).toLocaleString()}</span>
            </li>
          ))}
        </ul>

        <div className="border-t pt-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>₹{Number(subtotal).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax:</span>
            <span>₹{Number(tax).toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-semibold text-gray-900">
            <span>Total:</span>
            <span>₹{Number(total).toLocaleString()}</span>
          </div>
        </div>

        <button
          onClick={() => router.push("/orders")}
          className="mt-6 w-full bg-pink-500 text-white py-3 rounded hover:bg-pink-600"
        >
          Back to Orders
        </button>
      </div>
    </div>
  );
}

