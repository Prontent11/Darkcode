import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  problem_title: {
    type: String,
    required: [true, "Please provide a title"],
  },
  problem_description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  problem_difficulty: {
    type: String,
    required: [true, "Please provide a description"],
  },
  problem_input: {
    type: String,
    required: [true, "Please provide a input"],
  },
  problem_output: {
    type: String,
    required: [true, "Please provide a output"],
  },
});

const Problems =
  mongoose.models.problems || mongoose.model("problems", problemSchema);

export default Problems;
