"use client";

import React, { useState } from "react";
import Email from "@/app/components/register/Email";
import Password from "@/app/components/register/Password";

export default function Page() {
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting: ", { email, password });
  };

  return (
    <form
      className="flex flex-col h-screen items-center px-12 pt-30 pb-12 gap-16"
      onSubmit={step === 1 ? handleNext : handleSubmit}
    >
      <div className="w-12 h-12 bg-[#E1761F]"></div>
      {step === 1 ? (
        <Email email={email} setEmail={setEmail} />
      ) : (
        <Password password={password} setPassword={setPassword} />
      )}
    </form>
  );
}
