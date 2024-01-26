"use client";

import { signOut } from "next-auth/react";

import { useSession } from "next-auth/react";

export default function UserInfo() {
  const { data: session } = useSession();
  return (
    <div className="grid place-items-center h-screen">
      <div className=" shadow-lg my-5 p-8 flex flex-col bg-zinc-50  gap-2">
        <div>
          Name: <span className="font-bold">{session?.user?.name}</span>
        </div>
        <div>
          Email: <span className="font-bold">{session?.user?.email}</span>
        </div>
        <div>
          <button
            className="bg-red-500 text-white font-bold px-6 py-2 mt-3"
            onClick={() => signOut()}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
