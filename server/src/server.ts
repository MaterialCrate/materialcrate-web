import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./graphql";
import { context } from "./auth/context";

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});
