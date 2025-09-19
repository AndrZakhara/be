import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import * as path from "path";
import { UserServiceClient } from "@providers/grpcClients/rpc-protos/generated/user";
import { MS_RPC_URLS } from "@shared/constants/grpcServicesUrls";

const PROTO_PATH = path.join(__dirname, "./rpc-protos/proto/user.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

interface ProtoGrpcType {
  user: {
    UserService: typeof UserServiceClient;
  };
}
const userProto = protoDescriptor as unknown as ProtoGrpcType;

export const client: UserServiceClient = new userProto.user.UserService(
  MS_RPC_URLS.user,
  grpc.credentials.createInsecure()
);
