"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";

const Page = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all"); // all / friends / groups

  const chats = [
    {
      name: "Aayush",
      msg: "Code push gareko xu bro.",
      time: "21:18",
      online: true,
      type: "friend",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "+977 981-5521034",
      msg: "📷 Image received",
      time: "21:05",
      type: "friend",
      img: "https://randomuser.me/api/portraits/men/11.jpg",
    },
    {
      name: "Mina",
      msg: "Thik cha, worry nagarna.",
      time: "20:51",
      online: true,
      type: "friend",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Study Group",
      msg: "Kal ko assignment chai send garna.",
      time: "19:41",
      type: "group",
      img: "https://randomuser.me/api/portraits/men/56.jpg",
    },
    {
      name: "Work Group",
      msg: "Meeting 10am ma cha.",
      time: "18:30",
      type: "group",
      img: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      name: "Rohan",
      msg: "🎤 Voice message",
      time: "20:40",
      type: "friend",
      img: "https://randomuser.me/api/portraits/men/24.jpg",
    },
  ];

  // Filter chats based on activeFilter
  const filteredChats = chats.filter(
    (chat) =>
      activeFilter === "friends"
        ? chat.type === "friend"
        : activeFilter === "groups"
        ? chat.type === "group"
        : true // all
  );

  return (
    <div
      id="style"
      className="scrollbar w-full h-screen bg-[#2C2C2C] text-white overflow-y-scroll"
    >
      {/* Header */}
      <div className="p-4 text-2xl font-bold border-b border-gray-800 bg-[#2C2C2C] sticky top-0 z-20 shadow-md">
        Kurakani
      </div>

      {/* Search Bar */}
      <div className="p-3 sticky top-[64px] bg-[#2C2C2C] z-10">
        <div className="flex items-center bg-[#202c33]/60 backdrop-blur-sm p-2 rounded-xl border border-gray-700/40 transition-all">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search or start a new chat"
            className="bg-transparent outline-none ml-3 w-full text-sm placeholder-gray-500 text-gray-200"
          />
        </div>
      </div>

      {/* Filters: All / Friends / Groups */}
      <div className="px-3 py-2 flex items-center gap-3 sticky top-[112px] bg-[#2C2C2C] z-10">
        {["all", "friends", "groups"].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`flex-1 py-1 px-3 rounded-full text-sm font-medium transition
              ${
                activeFilter === filter
                  ? "bg-blue-600 text-white"
                  : "bg-[#202c33] text-gray-300 hover:bg-[#1f2b32]"
              }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {/* Chat List */}
      <div>
        {filteredChats.map((chat, index) => (
          <div
            key={index}
            onClick={() => setActiveChat(index)}
            className={`flex items-center justify-between p-3 cursor-pointer transition-all duration-200 
              ${
                activeChat === index
                  ? "bg-[#2a3942] shadow-inner"
                  : "hover:bg-[#1f2b32]"
              }`}
          >
            {/* Avatar + Name + Message */}
            <div className="flex items-center gap-3">
              {/* Profile Picture */}
              <div className="relative w-11 h-11 rounded-full overflow-hidden">
                <img
                  src={chat.img}
                  alt={chat.name}
                  className="w-full h-full object-cover"
                />
                {chat.online && chat.type === "friend" && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0c1418]"></span>
                )}
              </div>

              {/* Name + Last Message */}
              <div>
                <div className="text-[15px] font-semibold">{chat.name}</div>
                <div className="text-gray-400 text-[13px] truncate w-[160px]">
                  {chat.msg}
                </div>
              </div>
            </div>

            {/* Time */}
            <div className="text-[11px] text-gray-500">{chat.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
