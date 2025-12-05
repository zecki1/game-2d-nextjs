import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { dbAdmin } from "@/lib/firebase-admin";

export async function POST(req: Request) {
    try {
        const { userId } = await req.json();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
   const userDoc = await dbAdmin.collection("users").doc(userId).get();
        const customerId = userDoc.data()?.customerId;

        if (!customerId) {
            return NextResponse.json({ error: "No customer found" }, { status: 404 });
        }

           const session = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: `${process.env.NEXT_PUBLIC_APP_URL}/profile`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("Erro no Portal Stripe:", error);
        return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }
}