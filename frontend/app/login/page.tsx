"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Montserrat } from "next/font/google";

/* ✅ Font MUST be at module scope */
const brandFont = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700"],
});

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Invalid credentials");

      const data = await res.json();
      if (!data.access_token) throw new Error("Token missing");

      localStorage.setItem("token", data.access_token);
      router.push("/dashboard");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6 fade-up">
      {/* OUTER ROUNDED CONTAINER */}
      <div
  className="
    w-full
    max-w-[70vw]
    h-[80vh]
    bg-white
    rounded-3xl
    overflow-hidden
    flex
    animate-fade-up
  "
  style={{
    boxShadow:
      "0 0 200px rgba(255,255,255,0.35), 0 25px 60px rgba(0,0,0,0.4)",
  }}
>

        {/* LEFT SIDE - IMAGE */}
        <div
          className="hidden md:flex w-1/2 bg-black bg-cover bg-center relative"
          style={{ backgroundImage: "url('/login-bg.jpg')" }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Branding block (40% x 40%) */}
          <div className="absolute bottom-6 left-6 z-10 w-[90%] h-[40%] flex items-end">
            <p
              className={`${brandFont.className} text-[3.6rem] md:text-[4rem] lg:text-[2.5rem] font-bold leading-tight tracking-wide text-white/60`}

            >
              Secure Content<br />
              Distribution<br />
              Platform
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-6">
          <div className="w-full max-w-md p-10">
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
                className="w-full rounded-full border border-gray-300 px-6 py-4 text-black outline-none focus:ring-2 focus:ring-black"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-full border border-gray-300 px-6 py-4 text-black outline-none focus:ring-2 focus:ring-black"
              />

              {error && (
                <p className="text-red-600 text-sm text-center">
                  {error}
                </p>
              )}

              {/* REGISTER */}
              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  bg-black
                  text-white
                  py-3
                  rounded-full
                  font-semibold
                  border
                  border-black
                  hover:bg-white
                  hover:text-black
                  transition
                  disabled:opacity-50
                "
              >
                {loading ? "Processing..." : "Register"}
              </button>

              {/* LOGIN */}
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="w-full border border-black text-black py-3 rounded-full font-semibold hover:bg-black hover:text-white transition"
              >
                Log in
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
