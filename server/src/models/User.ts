import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    institution: String,
    program: String,
  },
  { timestamps: true },
);

export default model("User", UserSchema);
