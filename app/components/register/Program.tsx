import React from "react";

interface passwordTypes {
  program: string;
  setProgram: React.Dispatch<React.SetStateAction<string>>;
}

export default function Program({ program, setProgram }: passwordTypes) {
  return (
    <div className="flex flex-col h-screen justify-between">
      <div className="px-12 text-center">
        <h1 className="font-serif text-4xl">Enter study program</h1>
      </div>
      <div className="space-y-5">
        <div>
          <h4 className="font-medium">PROGRAM</h4>
          <input
            type="text"
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            placeholder="e.g. Computer science"
            className="border border-black w-full px-4 py-2 rounded-lg"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={!program}
        className={`
          w-full py-3 text-center rounded-4xl font-medium transition-all duration-200
          ${
            program
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
