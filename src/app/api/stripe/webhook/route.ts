import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { dbAdmin } from "@/lib/firebase-admin";
import Stripe from "stripe";

export async function POST(req: Request) {
    const body = await req.text();
    // CORREÇÃO: Usando (await headers()) para satisfazer o verificador de tipo no ambiente de build
    // A função 'headers' não é realmente assíncrona, mas essa sintaxe resolve o Type error do ambiente.
    const signature = (await headers()).get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET as string
        );
    } catch (err) {
        const errorMessage = (err as Error)?.message || "Unknown error";
        console.error("Webhook signature failed", errorMessage);
        return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
    }


    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "checkout.session.completed") {

        const userId = session.metadata?.userId;

        if (userId) {

            try {
                // ATUALIZA O USUÁRIO NO FIRESTORE PARA PREMIUM
                await dbAdmin.collection("users").doc(userId).set(
                    {
                        isPremium: true,
                        subscriptionId: session.subscription as string,
                        customerId: session.customer as string,
                        updatedAt: new Date(),
                    },
                    { merge: true }
                );
            } catch (dbError) {
                console.error("Erro ao atualizar Firestore Admin:", dbError);
            }
        }
    }

    return NextResponse.json({ received: true });
}