import User from "../../models/User";

export const UserResolver = {
  Query: {
    me: async (_: any, __: any, ctx: any) => {
      if (!ctx.auth0User) return null;
      return User.findOne({ auth0Id: ctx.auth0User.sub });
    },

    user: async (_: any, { id }: any) => {
      return User.findById(id);
    },
  },

  Mutation: {
    completeProfile: async (_: any, args: any, ctx: any) => {
      // NOTE: Auth check disabled for local testing.
      const auth0User =
        ctx.auth0User ?? { sub: "dev-test-user", email: "dev@example.com" };

      let user = await User.findOne({ auth0Id: auth0User.sub });

      if (!user) {
        user = await User.create({
          auth0Id: auth0User.sub,
          email: auth0User.email,
          ...args,
        });
      } else {
        Object.assign(user, args);
        await user.save();
      }

      return user;
    },
  },
};
