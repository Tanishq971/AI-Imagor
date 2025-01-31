import { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  planId: { type: Number, default: 1 },
  photo: { type: String, required: true },
  creditBalance: { type: Number, default: 10 },
  clerkId: { type: String, required: true, unique: true },
});

const User = models?.User || model("User", UserSchema);

export default User;
