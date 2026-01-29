import { NextResponse } from "next/server";

type SignupBody = {
  email?: string;
  password?: string;
  username?: string;
  institution?: string;
  program?: string;
};

export async function POST(req: Request) {
  let body: SignupBody;

  try {
    body = (await req.json()) as SignupBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const { email, password, username, institution, program } = body;

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 },
    );
  }

  const domain = process.env.AUTH0_DOMAIN;
  const clientId = process.env.AUTH0_CLIENT_ID;
  const connection = process.env.AUTH0_DB_CONNECTION;

  if (!domain || !clientId || !connection) {
    return NextResponse.json(
      { error: "Auth0 is not configured on the server" },
      { status: 500 },
    );
  }

  const auth0Response = await fetch(
    `https://${domain}/dbconnections/signup`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: clientId,
        email,
        password,
        connection,
        user_metadata: {
          username,
          institution,
          program,
        },
      }),
    },
  );

  const auth0Body = await auth0Response.json().catch(() => ({}));

  if (!auth0Response.ok) {
    return NextResponse.json(
      {
        error:
          auth0Body?.error_description ||
          auth0Body?.error ||
          "Signup failed",
      },
      { status: auth0Response.status },
    );
  }

  return NextResponse.json({ ok: true });
}
