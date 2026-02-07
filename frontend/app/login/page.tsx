"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // TEMP MOCK AUTH
      if (email === "demo@secure.com" && password === "password") {
        localStorage.setItem("token", "demo.jwt.token");
        router.push("/dashboard");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 fade-up">
      <div className="flex w-full max-w-[1400px] min-h-[520px] overflow-hidden rounded-3xl shadow-2xl bg-white md:bg-transparent">

        {/* LEFT SECTION (DESKTOP ONLY) */}
      <div
        className="hidden md:flex w-1/2 relative p-12 text-white bg-cover bg-center"
        style={{ backgroundImage: "url('/login-bg.jpg')" }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-end">
          <h1 className="text-4xl font-bold mb-4">
            Welcome Back!
          </h1>
          <p className="text-gray-300 max-w-sm">
            Secure access to protected content with zero-trust architecture.
          </p>
        </div>
      </div>


        {/* RIGHT SECTION */}
        <div className="w-full md:w-1/2 bg-white p-6 sm:p-10 flex items-center justify-center">
          <div
            className="
              w-full
              max-w-md
              mx-auto
              text-base
              md:scale-115
              scale-100
            "
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6 sm:mb-8">
              Log in
            </h2>

            <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="
                  w-full
                  rounded-full
                  bg-gray-100
                  px-5
                  py-3
                  sm:px-6
                  sm:py-4
                  text-sm
                  sm:text-base
                  text-gray-900
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
                  bg-gray-100
                  px-5
                  py-3
                  sm:px-6
                  sm:py-4
                  text-sm
                  sm:text-base
                  text-gray-900
                  outline-none
                  focus:ring-2
                  focus:ring-black
                "
              />

              <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-black" />
                  Remember me
                </label>
                <span className="cursor-pointer hover:underline">
                  Forgot password?
                </span>
              </div>

              {error && (
                <p className="text-sm text-red-600 text-center">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  rounded-full
                  bg-black
                  py-3
                  sm:py-4
                  text-sm
                  sm:text-base
                  font-semibold
                  text-white
                  hover:opacity-90
                  disabled:opacity-50
                "
              >
                {loading ? "Signing in..." : "Log in"}
              </button>
            </form>

            <p className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-400">
              Zero-Trust • Permission-Blind Frontend
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}
