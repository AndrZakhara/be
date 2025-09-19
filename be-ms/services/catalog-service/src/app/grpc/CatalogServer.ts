import * as grpc from "@grpc/grpc-js";
import { CatalogServiceService } from "@/grpc/generated/catalog";

import { catalogService } from "@/services/catalog.service";

export class CatalogServer {
  private server: grpc.Server;
  private port: number;

  constructor(port: number) {
    this.port = port;
    this.server = new grpc.Server();
  }

  public async start(): Promise<void> {
    this.server.addService(CatalogServiceService, catalogService);

    return new Promise((resolve, reject) => {
      this.server.bindAsync(
        `0.0.0.0:${this.port}`,
        grpc.ServerCredentials.createInsecure(),
        (err, port) => {
          if (err) {
            return reject(err);
          }

          console.log(`gRPC server listening on port ${port}`);
          resolve();
        }
      );
    });
  }
}
