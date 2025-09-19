import { Schema, model, Document, Types } from "mongoose";
import { en } from "zod/locales";

enum UserRole {
  CUSTOMER = "customer",
  ADMIN = "admin",
  MODERATOR = "moderator",
}
interface UserDocument extends Document {
  _id: Types.ObjectId;
  userId: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phone?: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    firstName: {
      type: String,
      required: true,
      default: "",
      minlength: 1,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      default: "",
      minlength: 3,
      maxlength: 50,
    },
    phone: {
      type: String,
      required: true,
      default: "",
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.CUSTOMER,
    },
    avatarUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("fullName").get(function (this: UserDocument) {
  return `${this.firstName ?? ""} ${this.lastName ?? ""}`.trim();
});

const User = model<UserDocument>("User", userSchema);

export { User, UserRole, UserDocument };
