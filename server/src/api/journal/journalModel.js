import mongoose from "mongoose";

const { model, Schema } = mongoose;

const journalSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    // date: {
    //   type: Date,
    //   required: true,
    // },
    content: {
      type: String,
      required: true,
    },
    hash: {
      type: String,
      required: false,
    },
    timestamp: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Journal", journalSchema);
