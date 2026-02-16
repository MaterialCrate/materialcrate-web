import crypto from "crypto";
import { prisma } from "../config/prisma";
import { transporter } from "../config/mailer";

const VERIFICATION_TOKEN_TTL_MS = 1000 * 60 * 60 * 24;
const VERIFICATION_CODE_LENGTH = 4;

const hashToken = (token: string) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

const generateVerificationCode = () => {
  const min = 10 ** (VERIFICATION_CODE_LENGTH - 1);
  const max = 10 ** VERIFICATION_CODE_LENGTH - 1;
  return String(crypto.randomInt(min, max + 1));
};

export const issueEmailVerificationToken = async (userId: string) => {
  const verificationCode = generateVerificationCode();
  const tokenHash = hashToken(verificationCode);
  const expiresAt = new Date(Date.now() + VERIFICATION_TOKEN_TTL_MS);

  await prisma.user.update({
    where: { id: userId },
    data: {
      emailVerificationToken: tokenHash,
      emailVerificationTokenExpiresAt: expiresAt,
    },
  });

  return verificationCode;
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const from = process.env.MAIL_FROM;
  if (!from) {
    throw new Error("MAIL_FROM is not configured");
  }

  await transporter.sendMail({
    from,
    to: email,
    subject: "Verify your Material Crate account",
    text: `Your verification code is ${token}. It expires in 24 hours.`,
    html: `<p>Your verification code is <strong>${token}</strong>. It expires in 24 hours.</p>`,
  });
};

export const sendVerificationEmailForUser = async (
  userId: string,
  email: string,
) => {
  const rawToken = await issueEmailVerificationToken(userId);
  await sendVerificationEmail(email, rawToken);
};

export const verifyEmailToken = async (rawToken: string) => {
  const tokenHash = hashToken(rawToken);
  const user = await prisma.user.findFirst({
    where: {
      emailVerificationToken: tokenHash,
      emailVerificationTokenExpiresAt: {
        gt: new Date(),
      },
    },
  });

  if (!user) {
    throw new Error("Invalid or expired verification token");
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: true,
      emailVerificationToken: null,
      emailVerificationTokenExpiresAt: null,
    },
  });

  return true;
};

export const verifyEmailCode = async (email: string, code: string) => {
  const tokenHash = hashToken(code);
  const user = await prisma.user.findFirst({
    where: {
      email,
      emailVerificationToken: tokenHash,
      emailVerificationTokenExpiresAt: {
        gt: new Date(),
      },
    },
  });

  if (!user) {
    throw new Error("Invalid or expired verification code");
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: true,
      emailVerificationToken: null,
      emailVerificationTokenExpiresAt: null,
    },
  });

  return true;
};
