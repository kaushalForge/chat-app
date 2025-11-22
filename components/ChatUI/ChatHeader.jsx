// components/ChatHeader.jsx
"use client";

import React, { useEffect, useState, useRef } from "react";
import { Phone, Video, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";

const ChatHeader = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [token, setToken] = useState(null);
  const menuRef = useRef();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || null);

    if (!storedUser) {
      router.push("/sign-in");
      return;
    }

    setUser(JSON.parse(storedUser));
  }, [router]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    router.push("/sign-in");
  };

  if (!user) return null;

  return (
    <div className="w-full h-full bg-[#2C2C2C] flex items-center px-4 justify-between sticky top-0 z-10">
      {/* Left: Avatar + Name */}
      <div className="flex items-center gap-2">
        <img
          src={
            user?.profilePicture ||
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=687&auto=format&fit=crop"
          }
          alt={user?.username}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="text-white font-semibold text-sm md:text-base">
            {user?.username}
          </span>
          <span className="text-gray-400 text-xs md:text-sm">Online</span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex relative items-center gap-4 text-gray-300">
        <Phone className="w-5 h-5 cursor-pointer hover:text-white transition" />
        <Video className="w-5 h-5 cursor-pointer hover:text-white transition" />

        {/* Three-dot menu */}
        <div ref={menuRef} className="relative">
          <MoreVertical
            className="w-5 h-5 cursor-pointer hover:text-white transition"
            onClick={() => setMenuOpen((prev) => !prev)}
          />

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded shadow-lg overflow-hidden z-20">
              {token ? (
                <>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-700 transition"
                    onClick={() => {
                      alert("Settings clicked!");
                      setMenuOpen(false);
                    }}
                  >
                    Settings
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-700 transition"
                    onClick={() => {
                      router.push("/update-profile");
                      setMenuOpen(false);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-700 transition"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-700 transition"
                    onClick={() => {
                      router.push("/sign-in");
                      setMenuOpen(false);
                    }}
                  >
                    Sign In
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-700 transition"
                    onClick={() => {
                      router.push("/sign-up");
                      setMenuOpen(false);
                    }}
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
