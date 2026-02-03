import { readFileSync } from "fs";
import { join } from "path";

export const typeDefs = [
  readFileSync(join("src/graphql/schema/user.graphql"), "utf8"),
];
