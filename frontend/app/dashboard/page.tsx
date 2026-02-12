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
  const [filteredContent, setFilteredContent] = useState(CONTENT);
  const [showMenu, setShowMenu] = useState(false);

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
    <div className="p-10 fade-up">
      <header className="flex items-center gap-70 mb-10">
        {/* LEFT */}
        <div className="min-w-[320px]">
          <h1 className="text-3xl font-bold">Browse Content</h1>
          <p className="text-gray-400 text-sm mt-1">
            Secure • Zero-Trust • Permission-Blind Access
          </p>
        </div>

        {/* MIDDLE */}
        <nav className="flex items-center gap-8 text-sm text-gray-300">
          <span className="cursor-pointer hover:text-white">Home</span>
          <span className="cursor-pointer hover:text-white">
            Categories
          </span>
          <span className="cursor-pointer hover:text-white">
            About
          </span>
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-6 mr-6 md:mr-12 lg:mr-20 relative">
          <input
            type="text"
            placeholder="Search movies or series..."
            className="
              w-full
              rounded-full
              bg-gray-900
              border border-gray-700
              px-5 py-2.5
              text-sm
              text-white
              placeholder-gray-400
              outline-none
              focus:border-white
            "
          />

          {/* USER ICON */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="h-10 w-14 rounded-full bg-gray-800 flex items-center justify-center cursor-pointer hover:bg-gray-700 transition"
            >
              👤
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-32 bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-2 z-50">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* CONTENT GRID */}
      {filteredContent.length > 0 ? (
        <section className="mt-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredContent.map((item: typeof CONTENT[0]) => (
            <Link
              key={item.id}
              href={`/watch/${item.id}`}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-xl bg-gray-900">
                <div className="aspect-[2/3] w-full overflow-hidden bg-black">
                  <img
                    src={item.poster}
                    alt={item.title}
                    loading="eager"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
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
          ))}
        </section>
      ) : (
        <p className="text-gray-400 col-span-full mt-10">
          No content found.
        </p>
      )}
    </div>
  );
}
