"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [isRegistered, setIsRegistered] = useState(false);
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("All fields are necessary");
      return;
    }

    try {
      const resUserExist = await fetch("/api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const { user } = await resUserExist.json();

      if (user) {
        setError("User Already exists");
        return;
      }

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (res.ok) {
        const form = e.target;
        form.reset();
        setIsRegistered(true);
      } else {
        console.log("User Registration Failed");
      }
    } catch (error) {
      console.log("Error during Registration", error);
    }
  };

  const handleSignUpAnotherAccount = () => {
    setIsRegistered(false);
  };

  return (
    <div className="h-screen place-items-center grid">
      <div className="shadow-lg p-5 rounded border-t-4 border-l-4 border-green-600 ">
        <h1 className="text-xl font-bold my-4">Register</h1>
        {isRegistered ? (
          <div>
            <p className="text-green-500 font-bold">Registration Successful!</p>
            <button
              className="text-white bg-green-500 px-6 py-2 font-bold mt-3"
              onClick={handleSignUpAnotherAccount}
            >
              Sign Up for Another Account
            </button>
          </div>
        ) : (
          <form
            action=""
            className="flex flex-col gap-3"
            onSubmit={handleSubmit}
          >
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Full Name"
              className="border border-gray-300 py-2 px-6 w-[400px] bg-gray-100"
            />
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
            <button className="text-white bg-green-500 px-6 py-2 font-bold">
              Register
            </button>

            {error && (
              <div className="bg-red-500 text-white w-fit rounded-md text-xs py-1 px-3 mt-3">
                {error}
              </div>
            )}
            <Link className="text-sm mt-3 text-right" href={"/"}>
              Already have an account? <span className="underline">Login</span>
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}
