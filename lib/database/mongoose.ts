import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

class Database {
  private static cached: MongooseConnection = { conn: null, promise: null };

  private constructor() {}

  static getInstance() {
    return this.cached;
  }

  static async connectToDatabase() {
    if (this.cached.conn) {
      return this.cached.conn;
    }

    if (!MONGODB_URL) throw new Error('Missing MONGODB_URL');

    this.cached.promise =
      this.cached.promise ||
      mongoose.connect(MONGODB_URL, {
        dbName: 'imaginify',
        bufferCommands: false,
      });

    this.cached.conn = await this.cached.promise;

    return this.cached.conn;
  }
}

export default Database;
