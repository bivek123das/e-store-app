"use client";

import { useSearchParams } from "next/navigation";
import OrderSummary from "../../components/OrderSummary";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();

  // Get 'order' from URL query
  const orderParam = searchParams.get("order");

  let order = {
    orderId: "N/A",
    subtotal: 0,
    tax: 0,
    total: 0,
    items: [],
  };

  if (orderParam) {
    try {
      const parsed = JSON.parse(orderParam);
      order = {
        orderId: parsed.orderId || "N/A",
        subtotal: Number(parsed.subtotal || 0),
        tax: Number(parsed.tax || 0),
        total: Number(parsed.total || 0),
        items: Array.isArray(parsed.items) ? parsed.items : [],
      };
    } catch (err) {
      console.error("Failed to parse order data:", err);
    }
  }

  return <OrderSummary order={order} />;
}


