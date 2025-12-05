import admin from "firebase-admin";

const serviceAccountConfig = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

if (
    serviceAccountConfig.projectId &&
    serviceAccountConfig.clientEmail &&
    serviceAccountConfig.privateKey
) {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccountConfig),
        });
    }
} else {
    console.warn("Firebase Admin SDK não inicializado: Variáveis de ambiente da conta de serviço ausentes.");
}


export const dbAdmin = admin.firestore();
export const authAdmin = admin.auth();