import mongoose, { model, models, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface newUser {
  email: string;
  password: string;
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<newUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },

  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = models?.User || model<newUser>("User", userSchema);
export default User;