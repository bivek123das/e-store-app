"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCartStore } from "../../stores/cartStore";
export default function PaymentPage() {

  const searchParams = useSearchParams();
  const total = searchParams.get("amount");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);

  // load Razorpay script dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  const handleRazorpayPayment = async () => {
    try {
      setLoading(true);
      // 1. Create order on server
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
      // 2. Options for Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        // from .env
        amount: data.amount,
        currency: data.currency,
        name: "E-Store App",
        description: "Payment for your order",
        order_id: data.id,
        handler: async function (response) {
          // This is called after successful payment
          const res = await fetch("/api/verifyOrder", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            }),
          });
          const data = await res.json();
          if (data.isOk) {
            alert("Payment successfull ✅");

            // Clear cart
            clearCart();

            // Redirect to home page
            router.push("/");
          } else {
            console.error("Payment verification failed ❌");
          }
          // You can also call your backend to verify the signature here.
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9999999999",
        },
        theme: { color: "#F37254" },
      };

      // 3. Open Razorpay checkout
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCashOnDelivery = () => {
    alert("Order placed successfully ✅");
    clearCart();
    router.push("/", { scroll: true });
  };

  return (
    <div className="min-h-[400px] flex items-center justify-center bg-gray-100">
    {/* Card container */}
    <div className="bg-white shadow-lg rounded-lg max-w-4xl  mx-auto p-6">
      <h1 className="text-2xl text-center sm:text-3xl font-bold mb-6">Payment Options</h1>
      <p className="mb-4 text-center">
        Total amount to pay: <strong>₹{total}</strong>
      </p>
      <div className="flex flex-wrap gap-4">
        <button
          disabled={loading}
          onClick={handleRazorpayPayment}
          className="w-full sm:w-auto px-5 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? "Opening Razorpay…" : "Pay with Razorpay"}
        </button>
        <button
          onClick={handleCashOnDelivery}
          className="w-full sm:w-auto px-5 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Cash on Delivery
        </button>
      </div>
    </div>
  </div>
  
  );
}
