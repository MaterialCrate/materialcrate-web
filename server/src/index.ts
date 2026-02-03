import "./config/env";
import { connectDB } from "./config/db";
import { server } from "./server";

const PORT = process.env.PORT || 4000;

await connectDB();

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀 Material Crate GraphQL running at ${url}`);
});
