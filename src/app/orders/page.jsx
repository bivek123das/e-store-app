// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function OrdersList() {
//   const [orders, setOrders] = useState([]);
//   const router = useRouter();

//   useEffect(() => {
//     const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
//     setOrders(savedOrders.reverse()); // latest first
//   }, []);

//   if (orders.length === 0)
//     return (
//       <p className="p-6 text-center text-gray-500">
//         No previous orders found.
//       </p>
//     );

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-6 text-center">Your Orders</h1>

//       <div className="space-y-4">
//         {orders.map((order) => (
//           <div
//             key={order.orderId}
//             className="p-4 bg-white shadow rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-50 transition"
//             onClick={() =>
//               router.push(`/orders/${encodeURIComponent(order.orderId)}`)
//             }
//           >
//             <div>
//               <p className="font-semibold">Order ID: {order.orderId}</p>
//               <p className="text-gray-500 text-sm">
//                 {order.items.length} item{order.items.length > 1 ? "s" : ""} — ₹
//                 {Number(order.total).toLocaleString()}
//               </p>
//               {order.date && (
//                 <p className="text-gray-400 text-xs">
//                   Placed on: {new Date(order.date).toLocaleString()}
//                 </p>
//               )}
//             </div>
//             <button className="px-3 py-1 bg-pink-500 text-white rounded hover:bg-pink-600">
//               View
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Eye } from "lucide-react"; // Trash for delete, Eye for view

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(savedOrders.reverse()); // latest first
  }, []);

  const handleDelete = (orderId) => {
    if (!confirm("Are you sure you want to delete this order details?")) return;

    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    const updatedOrders = savedOrders.filter((o) => o.orderId !== orderId);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setOrders(updatedOrders.reverse());
  };

  if (orders.length === 0)
    return (
      <p className="p-6 text-center text-gray-500">
        No previous orders found.
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="p-4 bg-white shadow rounded-lg flex justify-between items-center hover:bg-gray-50 transition"
          >
            {/* Order Info */}
            <div className="flex-1">
              <p className="font-semibold">Order ID: {order.orderId}</p>
              <p className="text-gray-500 text-sm">
                {order.items.length} item{order.items.length > 1 ? "s" : ""} — ₹
                {Number(order.total).toLocaleString()}
              </p>
              {order.date && (
                <p className="text-gray-400 text-xs">
                  Placed on: {new Date(order.date).toLocaleString()}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() =>
                  router.push(`/orders/${encodeURIComponent(order.orderId)}`)
                }
                className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                <Eye size={16} />
              </button>

              <button
                onClick={() => handleDelete(order.orderId)}
                className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <Trash2 size={16} /> 
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

