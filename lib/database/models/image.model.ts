import { Schema, models, model, Document } from "mongoose";

export interface IImage extends Document {
  title: string;
  transformationType: string;
  publicId: string;
  secureUrl: string; // Changed from URL to string
  width?: number;
  height?: number;
  config?: object; // Fixed `Object` warning
  transformationUrl?: string; // Changed from URL to string
  aspectRatio?: string;
  color?: string;
  prompt?: string;
  author?: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ImageSchema = new Schema(
  {
    title: { type: String, required: true },
    transformationType: { type: String, required: true },
    publicId: { type: String, required: true },
    secureUrl: { type: String, required: true }, // Changed from URL to String
    width: { type: Number },
    height: { type: Number },
    config: { type: Schema.Types.Mixed }, // Fixed `Object` issue
    transformationUrl: { type: String }, // Changed from URL to String
    aspectRatio: { type: String },
    color: { type: String },
    prompt: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true } // Automatically handles createdAt & updatedAt
);

const Image = models?.Image || model("Image", ImageSchema);

export default Image;
