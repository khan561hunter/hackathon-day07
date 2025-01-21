"use client";
// pages/User.tsx
"use client";
import { useState } from "react";
import Link from "next/link";

export default function User() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Redirect to dashboard upon successful login
        window.location.href = "/dashboard";  // Correctly redirects to /dashboard
      } else {
        setError(data.error || "Login failed.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <form
          id="login-form"
          className="flex flex-col space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
             id="password"
             type="password"
             placeholder="Password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             className="border p-2 rounded"
             required
           />
           <Link href={"/dashboard"}>
           <button
             id="login-button"
             type="submit"
             className="bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50"
             disabled={!email || !password}
           >
             Login
           </button>
           </Link>
         </form>
         {error && <p className="text-red-500 mt-2">{error}</p>}
       </div>
     </div>
   );
 }
