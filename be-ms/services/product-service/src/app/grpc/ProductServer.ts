import * as grpc from "@grpc/grpc-js";
import { ProductServiceService } from "@/grpc/generated/product";
import { productService } from "@/services/product.service";
import client from "prom-client";

export class ProductServer {
  private server: grpc.Server;
  private port: number;

  private rpcCallCounter = new client.Counter({
    name: "grpc_requests_total",
    help: "Total number of gRPC requests",
    labelNames: ["method", "status"] as const,
  });

  private rpcCallDuration = new client.Histogram({
    name: "grpc_request_duration_seconds",
    help: "gRPC request duration in seconds",
    labelNames: ["method"] as const,
    buckets: [0.01, 0.05, 0.1, 0.5, 1, 3, 5],
  });

  constructor(port: number) {
    this.port = port;
    this.server = new grpc.Server();
  }

  public async start(): Promise<void> {
    const wrappedService: typeof productService = {} as any;

    for (const [methodName, handler] of Object.entries(productService)) {
      wrappedService[methodName] = (
        call: any,
        callback: grpc.sendUnaryData<any>
      ) => {
        const end = this.rpcCallDuration.startTimer({ method: methodName });

        try {
          handler(call, (err: any, res: any) => {
            this.rpcCallCounter.inc({
              method: methodName,
              status: err ? "error" : "success",
            });
            end();
            callback(err as grpc.ServiceError | null, res);
          });
        } catch (err: any) {
          this.rpcCallCounter.inc({ method: methodName, status: "exception" });
          end();
          callback(err as grpc.ServiceError, null);
        }
      };
    }

    this.server.addService(ProductServiceService, wrappedService);

    return new Promise((resolve, reject) => {
      this.server.bindAsync(
        `0.0.0.0:${this.port}`,
        grpc.ServerCredentials.createInsecure(),
        (err, port) => {
          if (err) {
            return reject(err);
          }

          console.log(`Product gRPC server listening on port ${port}`);
          resolve();
        }
      );
    });
  }
}

// import * as grpc from "@grpc/grpc-js";
// import { ProductServiceService } from "@/grpc/generated/product";

// import { productService } from "@/services/product.service";

// export class ProductServer {
//   private server: grpc.Server;
//   private port: number;

//   constructor(port: number) {
//     this.port = port;
//     this.server = new grpc.Server();
//   }

//   public async start(): Promise<void> {
//     this.server.addService(ProductServiceService, productService);

//     return new Promise((resolve, reject) => {
//       this.server.bindAsync(
//         `0.0.0.0:${this.port}`,
//         grpc.ServerCredentials.createInsecure(),
//         (err, port) => {
//           if (err) {
//             return reject(err);
//           }

//           console.log(`Product gRPC server listening on port ${port}`);
//           resolve();
//         }
//       );
//     });
//   }
// }
