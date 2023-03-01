import mongoose from "mongoose";

const { model, Schema } = mongoose;

const roomSchema = new Schema(
  {
    name: { type: String, required: true },
    roomId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
export default model("Room", roomSchema);
