import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Properly type `global` to avoid `any`
declare global {
  var mongooseCache: MongooseConnection | undefined;
}

let cached: MongooseConnection = global.mongooseCache ?? {
  conn: null,
  promise: null,
};

export const connectToDatabase = async (): Promise<Mongoose> => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) throw new Error("Missing MONGODB_URL");

  cached.promise =
    cached.promise ??
    mongoose.connect(MONGODB_URL, {
      dbName: "imagify",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;
  global.mongooseCache = cached; // Store in global cache

  return cached.conn;
};
