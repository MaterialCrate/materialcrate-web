"use client";

import React, { useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import Email from "@/app/components/register/Email";
import Password from "@/app/components/register/Password";
import Username from "@/app/components/register/Username";
import School from "@/app/components/register/School";

export default function Page() {
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [school, setSchool] = useState<string>("");

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && email) {
      setStep(2);
    } else if (step === 2 && password) {
      setStep(3);
    } else if (step === 3 && username) {
      setStep(4);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting: ", { email, password, username });
  };

  return (
    <form
      className="flex flex-col h-screen items-center px-12 py-12 gap-16 relative"
      onSubmit={step < 6 ? handleNext : handleSubmit}
    >
      {step !== 1 && (
        <HiOutlineArrowLeft
          className="absolute top-5 left-5"
          size={30}
          onClick={() => setStep(step - 1)}
        />
      )}
      <div className="w-12 h-12 bg-[#E1761F]"></div>
      {step === 1 ? (
        <Email email={email} setEmail={setEmail} />
      ) : step === 2 ? (
        <Password password={password} setPassword={setPassword} />
      ) : step === 3 ? (
        <Username username={username} setUsername={setUsername} />
      ) : (
        step === 4 && <School school={school} setSchool={setSchool} />
      )}
    </form>
  );
}
