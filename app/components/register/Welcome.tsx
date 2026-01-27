import React from "react";

export default function Welcome() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <div className="px-12 text-center">
        <h1 className="font-serif text-4xl">Welcome to Material Crate</h1>
      </div>
      <div className="space-y-5">
        <div>
          <h4 className="font-medium">INSTITUTION NAME</h4>
          <button
            type="button"
            className="border border-black w-full px-4 py-2 rounded-lg"
          >
            Upload or share materials
          </button>
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-3 text-center rounded-4xl font-medium transition-all duration-200 bg-[#E1761F] text-white active:bg-black"
      >
        NEXT
      </button>
    </div>
  );
}
