import { NextResponse } from "next/server";

const GRAPHQL_ENDPOINT =
  process.env.GRAPHQL_ENDPOINT ?? "http://localhost:4000/graphql";

const RESEND_VERIFICATION_MUTATION = `
  mutation ResendVerificationEmail($email: String!) {
    resendVerificationEmail(email: $email)
  }
`;

type ResendVerificationBody = {
  email?: string;
};

export async function POST(req: Request) {
  let body: ResendVerificationBody;

  try {
    body = (await req.json()) as ResendVerificationBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { email } = body;

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const graphqlResponse = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: RESEND_VERIFICATION_MUTATION,
      variables: { email },
    }),
  });

  const graphqlBody = await graphqlResponse.json().catch(() => ({}));

  if (!graphqlResponse.ok || graphqlBody?.errors?.length) {
    return NextResponse.json(
      {
        error:
          graphqlBody?.errors?.[0]?.message ||
          "Failed to resend verification code",
        details: graphqlBody?.errors ?? null,
        status: graphqlResponse.status,
      },
      { status: 400 },
    );
  }

  return NextResponse.json({ ok: true });
}
