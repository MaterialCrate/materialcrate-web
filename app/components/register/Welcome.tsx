import React from "react";

interface options {
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
}

const options = [
  { id: "upload", label: "Upload or Share Materials" },
  { id: "browse", label: "Browse or Find Materials" },
  { id: "space", label: "My Study Space" },
  { id: "none", label: "Not Sure" },
];

export default function Welcome({
  selectedOption,
  setSelectedOption,
}: options) {
  return (
    <div className="flex flex-col h-screen justify-between">
      <div className="text-center font-serif text-3xl">
        <h1>Welcome to Material Crate!</h1>
        <h2>Where would you like to start?</h2>
        <p className="font-sans text-sm mt-3">
          Select what you intend to first do with material crate
        </p>
      </div>
      <div className="space-y-2">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => setSelectedOption(option.id)}
            className={`
              w-full px-4 py-2 rounded-lg text-left border font-medium
              ${
                selectedOption === option.id
                  ? "border-black bg-[#E8E8E8]"
                  : "border-[#CCCCCC] hover:bg-gray-50"
              }
            `}
          >
            {option.label}
          </button>
        ))}
      </div>
      <button
        type="submit"
        disabled={!selectedOption}
        className={`
          w-full py-3 text-center rounded-4xl font-medium transition-all duration-200
          ${
            selectedOption
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
