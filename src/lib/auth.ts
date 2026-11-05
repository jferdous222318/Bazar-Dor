import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const uri = process.env.MONGO_URI;
if (!uri) {
  throw new Error(
    "MONGO_URI is missing. Put it in the .env file in the project root, then restart `npm run dev`."
  );
}

// Reuse one MongoClient in dev so hot reload doesn't open many connections
const globalForMongo = globalThis as unknown as { _mongoClient?: MongoClient };

const client = globalForMongo._mongoClient ?? new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  globalForMongo._mongoClient = client;
}

const db = client.db("bazar-dor");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: mongodbAdapter(db, { client }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    minPasswordLength: 8,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});