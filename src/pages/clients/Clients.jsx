import React from "react";

export default function Clients() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex md:flex-row flex-col gap-5 justify-between md:items-center pb-3 border-b border-gray-200">
        <div>
          <h2 className="md:text-2xl font-medium text-lg my-2">Clients</h2>
          <p>Manage all mining clients and their miners</p>
        </div>
        <button className="bg-homeBg hover:bg-homeBgGradient text-white">
          + Add Client
        </button>
      </div>
    </div>
  );
}
