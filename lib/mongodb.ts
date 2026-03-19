import { MongoClient } from "mongodb";

declare global {
  var __smartiqMongoClientPromise: Promise<MongoClient> | undefined;
}

export function isMongoConfigured() {
  return Boolean(process.env.MONGODB_URI);
}

export function getMongoClient() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not set. Add it to your local environment.");
  }

  if (!global.__smartiqMongoClientPromise) {
    const client = new MongoClient(uri);
    global.__smartiqMongoClientPromise = client.connect();
  }

  return global.__smartiqMongoClientPromise;
}
