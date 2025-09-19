import * as grpc from "@grpc/grpc-js";
import {
  GetUserRequest,
  CreateUserRequest,
  UpdateUserRequest,
  DeleteUserRequest,
  UserResponse,
  DeleteUserResponse,
} from "@providers/grpcClients/rpc-protos/generated/user";
import { client } from "@/app/providers/grpcClients/user.provider";

export const userService = {
  async getUserById(request: GetUserRequest): Promise<UserResponse> {
    return new Promise((resolve, reject) => {
      client.getUserById(
        request,
        (error: grpc.ServiceError | null, response: UserResponse | null) => {
          if (error) {
            return reject(error);
          }
          if (!response) {
            return reject(new Error("No response from gRPC service."));
          }
          resolve(response);
        }
      );
    });
  },

  async createUser(request: CreateUserRequest): Promise<UserResponse> {
    return new Promise((resolve, reject) => {
      client.createUser(
        request,
        (error: grpc.ServiceError | null, response: UserResponse | null) => {
          if (error) {
            return reject(error);
          }
          if (!response) {
            return reject(new Error("No response from gRPC service."));
          }
          resolve(response);
        }
      );
    });
  },

  async updateUser(request: UpdateUserRequest): Promise<UserResponse> {
    return new Promise((resolve, reject) => {
      client.updateUser(
        request,
        (error: grpc.ServiceError | null, response: UserResponse | null) => {
          if (error) {
            return reject(error);
          }
          if (!response) {
            return reject(new Error("No response from gRPC service."));
          }
          resolve(response);
        }
      );
    });
  },

  async deleteUser(request: DeleteUserRequest): Promise<DeleteUserResponse> {
    return new Promise((resolve, reject) => {
      client.deleteUser(
        request,
        (
          error: grpc.ServiceError | null,
          response: DeleteUserResponse | null
        ) => {
          if (error) {
            return reject(error);
          }
          if (!response) {
            return reject(new Error("No response from gRPC service."));
          }
          resolve(response);
        }
      );
    });
  },
};
