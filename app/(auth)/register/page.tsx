import React from "react";

export default function page() {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-full px-12">
        <div className="px-12 text-center mb-7">
          <h1 className="font-serif text-4xl">Let&#39;s get started</h1>
        </div>
        <div className="space-y-5">
          <button
            type="button"
            className="border border-black flex items-center justify-between w-full px-4 py-2 rounded-lg"
          >
            <p className="font-medium">Continue with Google</p>
            <div className="w-7 h-7 rounded-full bg-black"></div>
          </button>
          <button
            type="button"
            className="border border-black flex items-center justify-between w-full px-4 py-2 rounded-lg mb-15"
          >
            <p className="font-medium">Continue with Facebook</p>
            <div className="w-7 h-7 rounded-full bg-black"></div>
          </button>
          <div className="flex items-center justify-between">
            <div className="h-px w-15 bg-linear-to-r from-transparent via-gray-500 to-black" />
            <p className="text-xs">OR CONTINUE WITH EMAIL</p>
            <div className="h-px w-15 bg-linear-to-l from-transparent via-gray-500 to-black" />
          </div>
          <input
            placeholder="Email"
            className="border border-black w-full px-4 py-2 rounded-lg mt-4"
          />
          <button
            type="button"
            className="w-full bg-black py-3 text-center text-white rounded-4xl font-medium active:bg-[#E1761F] transition-all duration-200"
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
}
