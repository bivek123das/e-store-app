import Razorpay from "razorpay";



export async function POST(req){
    try{

        const body = await req.json();
        const{amount} = body;

        const razorpay = new Razorpay({
            key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const order = await razorpay.orders.create({
            amount: Math.round(amount * 100),
            currency: "INR",
            receipt: `receipt_order_${Math.floor(Math.random() * 10000)}`,
        })

        return new Response(JSON.stringify(order), { status: 200 });

    }
    catch(err){
        console.error(err);
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}
