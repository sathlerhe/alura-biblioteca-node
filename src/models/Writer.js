import mongoose from "mongoose";

const writerSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: { type: String, required: [true, "Writer name is required"] },
    nationality: { type: String },
  },
  {
    versionKey: false,
  }
);

const writers = mongoose.model("writers", writerSchema);

export default writers;
