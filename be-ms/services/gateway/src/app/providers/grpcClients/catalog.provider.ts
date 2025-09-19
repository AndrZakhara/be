import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import * as path from "path";
import { CatalogServiceClient } from "@providers/grpcClients/rpc-protos/generated/catalog";
import { MS_RPC_URLS } from "@shared/constants/grpcServicesUrls";

const PROTO_PATH = path.join(__dirname, "./rpc-protos/proto/catalog.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

interface ProtoGrpcType {
  catalog: {
    CatalogService: typeof CatalogServiceClient;
  };
}
const catalogProto = protoDescriptor as unknown as ProtoGrpcType;

export const client: CatalogServiceClient =
  new catalogProto.catalog.CatalogService(
    MS_RPC_URLS.catalog,
    grpc.credentials.createInsecure()
  );
