import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold">
          Secure Content Platform
        </h1>

        <p className="text-gray-400">
          Zero-Trust • Signed URLs • Traceable Access
        </p>

        {/* BEGIN BUTTON */}
        <Link href="/login">
          <button
            className="
              mt-8
              rounded-full
              bg-white
              px-10
              py-5
              text-black
              font-semibold
              text-sm
              hover:bg-gray-200
              transition
              hover:shadow-xl
              text-xl
              hover:scale-110
              transition
            "
          >
            BEGIN
          </button>
        </Link>
      </div>
    </main>
  );
}
