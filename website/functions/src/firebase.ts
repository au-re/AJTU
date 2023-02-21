import admin from "firebase-admin";
import { cert } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

import serviceAccount from "./service-account-key.json";

admin.initializeApp({
  credential: cert(serviceAccount as admin.ServiceAccount),
  storageBucket: "ajtu-dd6e7.appspot.com",
});

export const db = admin.firestore();
export const bucket = getStorage().bucket();

db.settings({ ignoreUndefinedProperties: true });
