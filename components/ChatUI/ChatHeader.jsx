// components/ChatHeader.jsx
"use client";

import React from "react";
import { Phone, Video, MoreVertical } from "lucide-react";

const ChatHeader = ({
  user = { name: "Mina", status: "Online", avatar: "" },
}) => {
  return (
    <div className="w-full h-16 bg-[#2C2C2C] flex items-center px-4 justify-between sticky top-0 z-10 border-b border-gray-700">
      {/* Left: Avatar + Name + Status */}
      <div className="flex items-center gap-3">
        <img
          src={user.avatar || "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
          alt={user.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="text-white font-semibold text-sm md:text-base">
            {user.name}
          </span>
          <span className="text-gray-400 text-xs md:text-sm">
            {user.status}
          </span>
        </div>
      </div>

      {/* Right: Action Icons */}
      <div className="flex items-center gap-4 text-gray-300">
        <Phone className="w-5 h-5 cursor-pointer hover:text-white transition" />
        <Video className="w-5 h-5 cursor-pointer hover:text-white transition" />
        <MoreVertical className="w-5 h-5 cursor-pointer hover:text-white transition" />
      </div>
    </div>
  );
};

export default ChatHeader;
