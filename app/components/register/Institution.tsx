import React from "react";

interface passwordTypes {
  institution: string;
  setInstitution: React.Dispatch<React.SetStateAction<string>>;
}

export default function Institution({
  institution,
  setInstitution,
}: passwordTypes) {
  return (
    <div className="flex flex-col h-screen justify-between">
      <div className="px-12 text-center">
        <h1 className="font-serif text-4xl">What is your instituion?</h1>
      </div>
      <div className="space-y-5">
        <div>
          <h4 className="font-medium">INSTITUTION NAME</h4>
          <input
            type="text"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            placeholder="e.g. Copperbelt University"
            className="border border-black w-full px-4 py-2 rounded-lg"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={!institution}
        className={`
          w-full py-3 text-center rounded-4xl font-medium transition-all duration-200
          ${
            institution
              ? "bg-[#E1761F] text-white active:bg-black"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }
        `}
      >
        NEXT
      </button>
    </div>
  );
}
