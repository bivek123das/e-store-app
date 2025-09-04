import { NextResponse } from "next/server";
import crypto from "crypto";

// Utility to generate signature
function generatedSignature(orderId, razorpayPaymentId) {
  const keySecret = process.env.RAZORPAY_KEY_SECRET; // your secret key from env

  return crypto
    .createHmac("sha256", keySecret)
    .update(orderId + "|" + razorpayPaymentId)
    .digest("hex");
}

// POST handler
export async function POST(req) {

  try{
  // Extract from request body
  const { orderId, razorpayPaymentId, razorpaySignature } = await req.json();

  // Generate server signature
  const signature = generatedSignature(orderId, razorpayPaymentId);

  if (signature !== razorpaySignature) {
    // Wrong signature: payment not verified
    return NextResponse.json(
      { message: "Payment verification failed", isOk: false },
      { status: 400 }
    );
  }

  // ✅ Payment verified — update your DB/order here
  return NextResponse.json(
    { message: "Payment verified successfully", isOk: true },
    { status: 200 }
  );
}
catch(err){
  console.error("Verification error:", err);
    return NextResponse.json(
      { message: "Server error", error: err.message },
      { status: 500 }
    );
}
}
