import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { dbAdmin } from "@/lib/firebase-admin";

export async function POST(req: Request) {
    try {
        const { userId, email } = await req.json();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const userRef = dbAdmin.collection("users").doc(userId);
        const userSnap = await userRef.get();
        if (!userSnap.exists) {
            await userRef.set({ email: email, createdAt: new Date(), dailyAttempts: 0 }, { merge: true });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
            mode: "subscription",
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/profile?payment=success`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/profile?payment=canceled`,
            customer_email: email,
            metadata: { userId: userId },
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("Erro Stripe:", error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}