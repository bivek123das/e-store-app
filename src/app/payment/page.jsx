"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCartStore } from "../../stores/cartStore";
import Container from "../../components/Container";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
  }, []);

  // Get order data either from URL or localStorage
  useEffect(() => {
    let data = null;
    const urlOrder = searchParams.get("order");

    if (urlOrder) {
      try {
        data = JSON.parse(urlOrder);
      } catch (err) {
        console.error("Invalid order JSON in URL");
      }
    }

    if (!data) {
      // fallback to localStorage
      const storedOrder = localStorage.getItem("orderData");
      if (storedOrder) {
        try {
          data = JSON.parse(storedOrder);
        } catch (err) {
          console.error("Invalid order JSON in localStorage");
        }
      }
    }

    if (data) setOrderData(data);
    else router.push("/store"); // redirect if no valid order
  }, [searchParams, router]);

  if (!orderData) {
    return (
      <div className="p-10 text-center text-red-500">
        Invalid or missing order details
      </div>
    );
  }

  const { subtotal, tax, total, items, orderId } = orderData;

  const handleRazorpayPayment = async () => {
    try {
      setLoading(true);

      // Step 1: Create Razorpay order in backend
      const res = await fetch("/api/createOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });

      const data = await res.json();

      if (!data.id) {
        alert("Error creating Razorpay order");
        return;
      }

      // Step 2: Razorpay Checkout Options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "E-Store App",
        description: "Order Payment",
        order_id: data.id,
        handler: async function (response) {
          // Step 3: Verify payment
          const verifyRes = await fetch("/api/verifyOrder", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              // send extra order info
              items,
              subtotal,
              tax,
              total,
              localOrderId: orderId,
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.isOk) {
            clearCart();

            const orderToSave = {
              orderId: verifyData.orderId.toString(), // always string
              items,
              subtotal,
              tax,
              total,
              date: new Date().toISOString(), // for order date display
            };

            // Load previous orders
            const prevOrders = JSON.parse(
              localStorage.getItem("orders") || "[]"
            );

            // Save new order
            localStorage.setItem(
              "orders",
              JSON.stringify([...prevOrders, orderToSave])
            );

            // Clean up temporary order data
            localStorage.removeItem("orderData");

            // Redirect to order success page
            router.push(
              `/order-success?order=${encodeURIComponent(
                JSON.stringify(orderToSave)
              )}`
            );
          }
        },

        method: {
          card: false,
          upi: true,
          wallet: true,
          netbanking: true,
          emi: true,
          paylater: true,
        },

        prefill: {
          email: "test@example.com",
          contact: "9999999999",
        },

        theme: { color: "#F37254" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col  min-h-screen overflow-hidden">
      <Container className="flex-1 flex items-center  justify-center ">
        <div className="bg-white shadow-lg rounded-lg max-w-4xl mx-auto p-6">
          <h1 className="text-2xl text-center sm:text-3xl font-bold mb-6">
            Payment Options
          </h1>

          <p className="mb-4 text-center">
            <strong>Order Summary</strong>
          </p>
          <p className="text-center text-gray-600">Subtotal: ₹{subtotal}</p>
          <p className="text-center text-gray-600">Tax: ₹{tax}</p>
          <p className="text-center font-bold text-lg mt-2">
            Total to Pay: ₹{total}
          </p>

          <div className="flex flex-wrap gap-4 mt-6 justify-center">
            <button
              disabled={loading}
              onClick={handleRazorpayPayment}
              className="px-5 py-2 bg-green-500 text-white cursor-pointer rounded hover:bg-green-600 disabled:opacity-50"
            >
              {loading ? "Opening Razorpay…" : "Pay with Razorpay"}
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
