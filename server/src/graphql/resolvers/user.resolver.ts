import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/User";

const createToken = (userId: string, email: string) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign({ sub: userId, email }, secret, { expiresIn: "7d" });
};

export const UserResolver = {
  Query: {
    me: async (_: any, __: any, ctx: any) => {
      if (!ctx.user?.sub) return null;
      return User.findById(ctx.user.sub);
    },

    user: async (_: any, { id }: any) => {
      return User.findById(id);
    },
  },

  Mutation: {
    signup: async (_: any, args: any) => {
      const { email, password, username, institution, program } = args;

      if (!email || !password || !username) {
        throw new Error("Email, password, and username are required");
      }

      const existing = await User.findOne({
        $or: [{ email }, { username }],
      });
      if (existing) {
        throw new Error("Email or username already in use");
      }

      const hashed = await bcrypt.hash(password, 12);
      const user = await User.create({
        email,
        password: hashed,
        username,
        institution,
        program,
      });

      const token = createToken(user.id, user.email);
      return { token, user };
    },
    login: async (_: any, args: any) => {
      const { email, password } = args;

      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("Invalid credentials");
      }

      if (!user.password) {
        throw new Error("Invalid credentials");
      }

      const ok = await bcrypt.compare(password, user.password);
      if (!ok) {
        throw new Error("Invalid credentials");
      }

      const token = createToken(user.id, user.email);
      return { token, user };
    },
    completeProfile: async (_: any, args: any, ctx: any) => {
      if (!ctx.user?.sub) {
        throw new Error("Not authenticated");
      }

      const user = await User.findById(ctx.user.sub);
      if (!user) {
        throw new Error("User not found");
      }

      Object.assign(user, args);
      await user.save();

      return user;
    },
  },
};
