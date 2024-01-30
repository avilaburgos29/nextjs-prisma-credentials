"use client";
import { signOut } from "next-auth/react";

function DashboardPage() {
  return (
    <section className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <h1 className="text-white text-5xl">Dashboard</h1>
      <p>This is the dashboard page</p>
      <button className="bg-white text-black font-bold py-2 px-4 rounded-md mt-4"
      onClick={() => signOut()}  >
        Logout
      </button>
    </section>
  );
}

export default DashboardPage;