"use client";

import Link from "next/link";

export default function Navbar({
  showSearch = true,
}: {
  showSearch?: boolean;
}) {
  return (
    <header className="w-full flex items-center justify-between px-10 py-6">
      {/* LEFT: Title */}
      <div>
        <h1 className="text-white text-2xl font-bold">
          Browse Content
        </h1>
        <p className="text-gray-400 text-sm">
          Secure • Zero-Trust • Permission-Blind Access
        </p>
      </div>

      {/* CENTER: Nav Links */}
      <nav className="flex items-center gap-8 text-gray-300">
        <Link href="/dashboard" className="hover:text-white">
          Home
        </Link>
        <Link href="#" className="hover:text-white">
          Categories
        </Link>
        <Link href="#" className="hover:text-white">
          About
        </Link>
      </nav>

      {/* RIGHT: Search + User */}
      <div className="flex items-center gap-4">
        {showSearch && (
          <input
            type="text"
            placeholder="Search movies or series..."
            className="w-64 rounded-full bg-gray-900 border border-gray-700 px-4 py-2 text-sm text-white placeholder-gray-400 outline-none focus:border-white"
          />
        )}

        <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center">
          👤
        </div>
      </div>
    </header>
  );
}
