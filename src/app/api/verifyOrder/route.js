import { NextResponse } from "next/server";
import crypto from "crypto";

// Utility to generate signature
function generatedSignature(orderId, razorpayPaymentId) {
  const keySecret = process.env.RAZORPAY_KEY_SECRET; // your secret key
  return crypto
    .createHmac("sha256", keySecret)
    .update(orderId + "|" + razorpayPaymentId)
    .digest("hex");
}

// POST handler
export async function POST(req) {
  try {
    const {
      orderId,           // Razorpay order ID
      razorpayPaymentId,
      razorpaySignature,
      localOrderId       // <-- your internal order ID from CartPage
    } = await req.json();

    // Verify Razorpay signature
    const signature = generatedSignature(orderId, razorpayPaymentId);

    if (signature !== razorpaySignature) {
      return NextResponse.json(
        { message: "Payment verification failed", isOk: false },
        { status: 400 }
      );
    }

    // ✅ Payment verified — update your DB/order here
    // Save your localOrderId in DB as the official order ID

    return NextResponse.json(
      {
        message: "Payment verified successfully",
        isOk: true,
        orderId: localOrderId // <-- return your internal order ID
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Verification error:", err);
    return NextResponse.json(
      { message: "Server error", error: err.message },
      { status: 500 }
    );
  }
}
