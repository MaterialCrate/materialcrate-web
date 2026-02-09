type VerifyEmailPageProps = {
  searchParams?: { email?: string };
};

export default function VerifyEmailPage({ searchParams }: VerifyEmailPageProps) {
  const email = searchParams?.email;

  return (
    <div className="min-h-screen px-8 py-16 flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Check your email</h1>
      <p className="text-sm text-neutral-700">
        We sent a verification link{email ? ` to ${email}` : ""}. Click the
        link to activate your account.
      </p>
      <div className="text-xs text-neutral-500">
        If you don’t see it, check your spam folder.
      </div>
    </div>
  );
}
