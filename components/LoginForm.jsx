"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res.error) {
        setError("Invalid credentials");
        return;
      }
      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen place-items-center grid">
      <div className="shadow-lg p-5 rounded border-t-4 border-l-4 border-green-600 ">
        <h1 className="text-xl font-bold my-4">LogIn</h1>
        <form action="" className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            className="border border-gray-300 py-2 px-6 w-[400px] bg-gray-100"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="border border-gray-200 py-2 px-6 w-[400px] bg-gray-100"
          />
          <button className="text-white bg-green-500 px-6 py-2  font-bold">
            Login
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit rounded-md  text-xs py-1 px-3 mt-3">
              {error}
            </div>
          )}
          <Link className="text-sm mt-3 text-right" href={"/register"}>
            Don't have an account? <span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
