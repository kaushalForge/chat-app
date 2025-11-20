// components/ChatHeader.jsx
"use client";

import React, { useEffect, useState } from "react";
import { Phone, Video, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";

const ChatHeader = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      router.push("/sign-in");
      return;
    }
    setUser(JSON.parse(stored));
  }, [router]);

  if (!user) return null;

  return (
    <div className="w-full h-full bg-[#2C2C2C] flex items-center px-4 justify-between sticky top-0 z-10">
      {/* Left: Avatar + Name */}
      <div className="flex items-center gap-3">
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
      <div className="flex items-center gap-4 text-gray-300">
        <Phone className="w-5 h-5 cursor-pointer hover:text-white transition" />
        <Video className="w-5 h-5 cursor-pointer hover:text-white transition" />
        <MoreVertical className="w-5 h-5 cursor-pointer hover:text-white transition" />
      </div>
    </div>
  );
};

export default ChatHeader;
