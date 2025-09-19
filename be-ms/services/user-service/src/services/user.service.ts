import * as grpc from "@grpc/grpc-js";
import {
  UserServiceServer,
  GetUserRequest,
  UserResponse,
  CreateUserRequest,
  UpdateUserRequest,
  DeleteUserRequest,
  DeleteUserResponse,
} from "@/grpc/generated/user";
import { User, UserDocument } from "@/models/user.model";
import { GrpcError } from "@shared/errors/GrpcError";

export const userService: UserServiceServer = {
  getUserById: async (call, callback) => {
    const { id } = call.request;

    if (!id) {
      const error = new GrpcError(
        grpc.status.INVALID_ARGUMENT,
        "User ID is required."
      );
      return callback(error, null);
    }

    try {
      const user = await User.findOne({ userId: id });

      if (!user) {
        const error = new GrpcError(grpc.status.NOT_FOUND, "User not found.");
        return callback(error, null);
      }

      const response: UserResponse = { user: transformUserToGrpc(user) };
      callback(null, response);
    } catch (err) {
      console.error(err);
      const error = new GrpcError(
        grpc.status.INTERNAL,
        "Internal server error."
      );
      callback(error, null);
    }
  },

  createUser: async (call, callback) => {
    const { user: userData } = call.request;

    if (!userData) {
      const error = new GrpcError(
        grpc.status.INVALID_ARGUMENT,
        "User data is required."
      );
      return callback(error, null);
    }

    try {
      const newUser = new User(userData);
      const savedUser = await newUser.save();

      const response: UserResponse = { user: transformUserToGrpc(savedUser) };
      callback(null, response);
    } catch (err) {
      console.error(err);
      const error = new GrpcError(
        grpc.status.INTERNAL,
        "Internal server error."
      );
      callback(error, null);
    }
  },

  updateUser: async (call, callback) => {
    const { id, user: userData } = call.request;
    const authUserId = "auth-user-id";
    const authUserRole = "admin";

    if (!id || !userData) {
      const error = new GrpcError(
        grpc.status.INVALID_ARGUMENT,
        "User ID and data are required."
      );
      return callback(error, null);
    }

    if (authUserId !== id && authUserRole !== "admin") {
      const error = new GrpcError(
        grpc.status.PERMISSION_DENIED,
        "Access denied."
      );
      return callback(error, null);
    }

    try {
      const updatedUser = await User.findOneAndUpdate(
        { userId: id },
        userData,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!updatedUser) {
        const error = new GrpcError(grpc.status.NOT_FOUND, "User not found.");
        return callback(error, null);
      }

      const response: UserResponse = { user: transformUserToGrpc(updatedUser) };
      callback(null, response);
    } catch (err) {
      console.error(err);
      const error = new GrpcError(
        grpc.status.INTERNAL,
        "Internal server error."
      );
      callback(error, null);
    }
  },

  deleteUser: async (call, callback) => {
    const { id } = call.request;
    const authUserId = "auth-user-id";
    const authUserRole = "admin";

    if (!id) {
      const error = new GrpcError(
        grpc.status.INVALID_ARGUMENT,
        "User ID is required."
      );
      return callback(error, null);
    }

    if (authUserId !== id && authUserRole !== "admin") {
      const error = new GrpcError(
        grpc.status.PERMISSION_DENIED,
        "Access denied."
      );
      return callback(error, null);
    }

    try {
      const deletedUser = await User.findOneAndDelete({ userId: id });

      if (!deletedUser) {
        const error = new GrpcError(grpc.status.NOT_FOUND, "User not found.");
        return callback(error, null);
      }

      const response: DeleteUserResponse = {
        message: "User deleted successfully.",
      };
      callback(null, response);
    } catch (err) {
      console.error(err);
      const error = new GrpcError(
        grpc.status.INTERNAL,
        "Internal server error."
      );
      callback(error, null);
    }
  },
};

function transformUserToGrpc(user: UserDocument): any {
  return {
    id: user._id.toString(),
    userId: user.userId,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    role: user.role as string,
    avatarUrl: user.avatarUrl,
    fullName: user.fullName,
  };
}
