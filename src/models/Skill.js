import mongoose, { Schema } from "mongoose";

const skillSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Skill", skillSchema);
