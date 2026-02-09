import jwt from "jsonwebtoken";

export const context = async ({ req }: any) => {
  const auth = req.headers.authorization;
  if (!auth) return {};

  const token = auth.replace("Bearer ", "");

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) return {};
    const decoded = jwt.verify(token, secret);
    return { user: decoded };
  } catch {
    return {};
  }
};
