"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();

      if (!data.access_token) {
        throw new Error("Token missing");
      }

      // Save JWT
      localStorage.setItem("token", data.access_token);

      // Redirect
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-semibold mb-6 text-black">
          Log in
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="
              w-full
              rounded-full
              bg-white
              border
              border-gray-300
              px-5
              py-3
              sm:px-6
              sm:py-4
              text-sm
              sm:text-base
              text-black
              placeholder:text-gray-500
              outline-none
              focus:ring-2
              focus:ring-black
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="
              w-full
              rounded-full
              bg-white
              border
              border-gray-300
              px-5
              py-3
              sm:px-6
              sm:py-4
              text-sm
              sm:text-base
              text-black
              placeholder:text-gray-500
              outline-none
              focus:ring-2
              focus:ring-black
            "
          />

          {error && (
            <p className="text-red-600 text-sm text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-full font-semibold disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Log in"}
          </button>
        </form>
      </div>
    </main>
  );
}
