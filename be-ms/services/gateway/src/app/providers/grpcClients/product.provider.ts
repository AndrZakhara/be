import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import * as path from "path";
import { ProductServiceClient } from "@providers/grpcClients/rpc-protos/generated/product";
import { MS_RPC_URLS } from "@shared/constants/grpcServicesUrls";

const PROTO_PATH = path.join(__dirname, "./rpc-protos/proto/product.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

interface ProtoGrpcType {
  product: {
    ProductService: typeof ProductServiceClient;
  };
}
const productProto = protoDescriptor as unknown as ProtoGrpcType;

export const client: ProductServiceClient =
  new productProto.product.ProductService(
    MS_RPC_URLS.product,
    grpc.credentials.createInsecure()
  );
