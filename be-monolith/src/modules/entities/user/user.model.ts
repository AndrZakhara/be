import { Schema, model, Document } from "mongoose";
import { randomUUID } from "crypto";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phone?: string;
  role: "customer" | "admin" | "moderator";
  isActive: boolean;
  avatarUrl?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  tokenVersion: string;
}

const userSchema = new Schema<IUser>(
  {
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
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false, // Do not return password in queries
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
      enum: ["customer", "admin", "moderator"],
      default: "customer",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    avatarUrl: {
      type: String,
      default: "",
    },
    resetPasswordToken: {
      type: String,
      select: false,
    },
    resetPasswordExpires: {
      type: Date,
      select: false,
    },
    tokenVersion: { type: String, default: () => randomUUID() },
  },
  {
    toJSON: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transform(doc: IUser, ret: any) {
        ret.id = ret._id?.toString();
        delete ret._id;
        delete ret.password;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

userSchema.virtual("fullName").get(function (this: IUser) {
  return `${this.firstName ?? ""} ${this.lastName ?? ""}`.trim();
});

const User = model<IUser>("User", userSchema);

export { User, IUser };
