import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white fade-up">
      <div className="text-center space-y-6">
        <h1
          className="text-white text-5xl md:text-6xl font-bold text-center"
          style={{
          textShadow: "0 0 30px_rgba(255,255,255,0.6)",
          }}
        >
          Secure Content Platform
        </h1>

        <p
  className="mt-4 text-sm md:text-base text-white/80 text-center"
  style={{
    textShadow: "0 0 20px rgba(255,255,255,0.5)",
  }}
>
  Zero-Trust • Signed URLs • Traceable Access
</p>


        {/* BEGIN BUTTON */}
        <Link href="/login">
         <button
  className="
    mt-10
    px-14
    py-4
    rounded-full
    bg-white
    text-lg md:text-xl
    text-black
    font-semibold
    transition
    hover:scale-105
  "
  style={{
    boxShadow: "0 0 50px rgba(255,255,255,0.7)",
  }}
>
  BEGIN
</button>

        </Link>
      </div>
    </main>
  );
}
