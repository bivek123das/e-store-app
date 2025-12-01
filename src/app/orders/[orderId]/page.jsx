"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import OrderDetail from "../../../components/OrderDetail";

export default function OrderDetailsPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");

    const foundOrder = savedOrders.find(
      (o) =>
        o.orderId.toString().trim() === decodeURIComponent(orderId).toString().trim()
    );

    setOrder(foundOrder);
  }, [orderId]);

  if (!order)
    return (
      <p className="p-6 text-center text-red-500">
        Order not found. Please check your order ID.
      </p>
    );

  return <OrderDetail order={order} />;
}

