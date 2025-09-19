import { UserServer as GrpcServer } from "@/app/grpc/UserServer";
import dbConnection from "@providers/db";
import { API_PORT } from "@/config";

async function startServer() {
  try {
    await dbConnection();
    console.log("Database connected successfully.");

    const grpcServer = new GrpcServer(API_PORT as number);
    await grpcServer.start();

    console.log(`gRPC Catalog Service is running on port ${API_PORT}`);
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
}

startServer();
