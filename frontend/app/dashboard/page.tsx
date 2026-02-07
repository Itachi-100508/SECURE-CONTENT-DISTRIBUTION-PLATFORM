"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CONTENT = [
  {
    id: "movie-1",
    title: "What If...? (Episode 1)",
    type: "Web Series",
    poster: "/posters/what-if-1.jpg",
  },
  {
    id: "series-2",
    title: "What If...? (Episode 2)",
    type: "Web Series",
    poster: "/posters/what-if-2.jpg",
  },
  {
    id: "series-3",
    title: "What If...? Season 2",
    type: "Web Series",
    poster: "/posters/what-if-s2.jpg",
    fit: "contain",
    noHoverZoom: true,
  },
  {
    id: "movie-2",
    title: "What If...? Thor",
    type: "Web Series",
    poster: "/posters/what-if-thor.jpg",
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <main className="bg-black text-white px-6 pt-7 pb-10 fade-up">

      {/* HEADER */}
      <header className="mb-10 flex items-center justify-between gap-6">

        {/* LEFT: TITLE */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold whitespace-nowrap">
            Browse Content
          </h1>
          <p className="text-gray-400 mt-1 whitespace-nowrap">
            Secure • Zero-Trust • Permission-Blind Access
          </p>
        </div>

        {/* RIGHT: SEARCH + USER */}
        <div className="flex items-center gap-4">

          {/* SEARCH BAR */}
          <input
            type="text"
            placeholder="Search movies or series..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-72
              md:w-80
              rounded-full
              bg-gray-900
              border
              border-gray-700
              px-6
              py-3
              text-base
              text-white
              placeholder-gray-400
              outline-none
              focus:border-white
              focus:ring-2
              focus:ring-white/20
              transition
            "
          />

          {/* USER MENU */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="
                h-11
                w-11
                rounded-full
                bg-gray-800
                border
                border-gray-700
                flex
                items-center
                justify-center
                text-white
                hover:bg-gray-700
                transition
              "
            >
              👤
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-3 w-56 rounded-xl bg-gray-900 border border-gray-700 shadow-xl z-50">
                <div className="px-4 py-3 border-b border-gray-700">
                  <p className="text-sm font-medium">
                    demo@secure.com
                  </p>
                  <p className="text-xs text-gray-400">
                    Logged in user
                  </p>
                </div>

                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    router.push("/login");
                  }}
                  className="
                    w-full
                    text-left
                    px-4
                    py-3
                    text-sm
                    text-red-400
                    hover:bg-gray-800
                    rounded-b-xl
                    transition
                  "
                >
                  Logout
                </button>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* CONTENT GRID */}
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredContent.length > 0 ? (
          filteredContent.map((item) => (
            <Link
              key={item.id}
              href={`/content/${item.id}`}
              className="group"
            >
              <div className="relative overflow-hidden rounded-xl bg-gray-900">

                <div className="aspect-[2/3] w-full overflow-hidden bg-black">
                  <img
                    src={item.poster}
                    alt={item.title}
                    loading="eager"
                    className={`h-full w-full transition-transform duration-300 ${
                      item.noHoverZoom ? "scale-[0.95]" : "group-hover:scale-105"
                    } ${
                      item.fit === "contain"
                        ? "object-contain bg-black"
                        : "object-cover"
                    }`}
                  />
                </div>

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition" />

                <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition">
                  <h3 className="text-sm font-semibold">
                    {item.title}
                  </h3>
                  <span className="text-xs text-gray-300">
                    {item.type}
                  </span>
                </div>

              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-400 col-span-full mt-10">
            No content found.
          </p>
        )}
      </section>

    </main>
  );
}
