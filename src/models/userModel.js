import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  solvedProblems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Problems" }],
  isAdmin: {
    type: Boolean,
    default: false,
    // Set to true for users with admin privileges
  },
});
// userSchema.pre("save", function (next) {
//   if (this.isAdmin) {
//     this.isAdmin = false;
//   }
//   next();
// });
const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
