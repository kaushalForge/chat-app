"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Loader2 from "../UI/Loader/Loader2";
import {
  Plus,
  Users,
  UserCheck,
  UserMinus,
  UserX,
  UsersRound,
  ChevronDown,
} from "lucide-react";

const HeadSection = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);

  const desktopRef = useRef(null);
  const mobileRef = useRef(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  // Handle outside click for desktop
  useEffect(() => {
    const handler = (e) => {
      if (desktopRef.current && !desktopRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Handle outside click for mobile
  useEffect(() => {
    const handler = (e) => {
      if (mobileRef.current && !mobileRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/sign-in");
  };

  return (
    <section className="fixed lg:sticky w-full left-0 px-3 top-0 z-[70] bg-[#2C2C2C] pt-2">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <img
          src="/images/logo.png"
          className="h-14 w-14 object-contain"
          alt="Logo"
        />

        {/* Desktop Menu */}
        <div className="hidden lg:flex relative items-center" ref={desktopRef}>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 px-4 py-2 bg-[#3A3A3A] rounded-lg 
            hover:bg-[#505050] transition shadow-sm"
          >
            <UsersRound size={18} className="text-white" />
            <span className="text-white text-sm font-medium">People</span>
            <ChevronDown
              size={16}
              className={`text-gray-300 transition-transform duration-300 ${
                menuOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          {menuOpen && (
            <div
              className="absolute top-full mt-2 w-56 bg-[#3C3C3C] rounded-lg shadow-xl 
            overflow-hidden z-[999] border border-[#4b4b4b]"
            >
              <MenuItem
                icon={<Plus size={16} />}
                label="Add Friend"
                route="/add-friend"
                router={router}
              />
              <MenuItem
                icon={<Users size={16} />}
                label="Create Group"
                route="/create-group"
                router={router}
              />
              <MenuItem
                icon={<UserCheck size={16} />}
                label="Friend Requests"
                route="/friend-requests"
                router={router}
              />
              <MenuItem
                icon={<UserMinus size={16} />}
                label="Suggestions"
                route="/suggestions"
                router={router}
              />
              <MenuItem
                icon={<UserX size={16} />}
                label="Blocked Users"
                route="/blocked-users"
                router={router}
              />
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden relative" ref={mobileRef}>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            <div className="flex flex-col text-right">
              <span className="text-white text-sm font-semibold">
                {user?.username || <Loader2 />}
              </span>
              <span className="text-gray-400 text-xs">Online</span>
            </div>

            <img
              className="h-10 w-10 rounded-full object-cover"
              src={
                user?.profilePicture ||
                "https://res.cloudinary.com/dsvlevzds/image/upload/v1763719226/Kurakani/profilePictures/tgj63mcpfstb3zx27h9x.jpg"
              }
              alt="Profile"
            />
          </div>

          {mobileOpen && (
            <div
              className="absolute right-0 mt-2 w-56 bg-[#3C3C3C] rounded-lg shadow-xl 
            overflow-hidden z-999 border border-[#4b4b4b]"
            >
              <MenuItem
                icon={<Plus size={16} />}
                label="Add Friend"
                route="/add-friend"
                router={router}
              />
              <MenuItem
                icon={<Users size={16} />}
                label="Create Group"
                route="/create-group"
                router={router}
              />
              <MenuItem
                icon={<UserCheck size={16} />}
                label="Friend Requests"
                route="/friend-requests"
                router={router}
              />
              <MenuItem
                icon={<UserMinus size={16} />}
                label="Suggestions"
                route="/suggestions"
                router={router}
              />
              <MenuItem
                icon={<UserX size={16} />}
                label="Blocked Users"
                route="/blocked-users"
                router={router}
              />

              <hr className="border-gray-600 my-1" />

              <MenuItem
                label="Update Profile"
                route="/update-profile"
                router={router}
              />
              <MenuItem label="Settings" route="/settings" router={router} />
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 
                transition font-medium"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// Reusable menu item component
const MenuItem = ({ icon, label, route, router }) => (
  <button
    onClick={() => router.push(route)}
    className="flex items-center gap-2 w-full text-left px-4 py-2 
    text-white hover:bg-gray-700 transition"
  >
    {icon}
    {label}
  </button>
);

export default HeadSection;
