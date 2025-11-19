// app/components/FreindsUI/page.jsx
"use client";

import React from "react";
import { Search } from "lucide-react";

const Page = () => {
  const chats = [
    { name: "Aayush", msg: "Code push gareko xu bro.", time: "21:18" },
    { name: "‪+977 981-5521034‬", msg: "📷 Image received", time: "21:05" },
    { name: "Mina", msg: "Thik cha, worry nagarna.", time: "20:51" },
    { name: "Rohan", msg: "🎤 Voice message", time: "20:40" },
    { name: "Sujal", msg: "✓✓ Aba milxa bro!", time: "20:21" },
    { name: "Aarju", msg: "Goodnight!", time: "19:59" },
    {
      name: "Study Group",
      msg: "Kal ko assignment chai send garna.",
      time: "19:41",
    },
    { name: "Prabesh", msg: "Aile aaudai xu.", time: "17:30" },
    { name: "Bishal Sir", msg: "✓✓ Ramro banako xa!", time: "13:50" },
  ];

  return (
    <div className="w-full h-screen bg-[#111b21] text-white border-r border-gray-800 overflow-y-auto">
      {/* Header */}
      <div className="p-4 text-2xl font-bold border-b border-gray-800">
        CHaatoooo
      </div>

      {/* Search Bar */}
      <div className="p-3">
        <div className="flex items-center bg-[#202c33] p-2 rounded-xl">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search or start a new chat"
            className="bg-transparent outline-none ml-3 w-full text-sm placeholder-gray-400"
          />
        </div>
      </div>

      {/* Chat List */}
      <div>
        {chats.map((chat, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 hover:bg-[#2a3942] cursor-pointer"
          >
            <div>
              <div className="text-[15px] font-semibold">{chat.name}</div>
              <div className="text-gray-400 text-[13px]">{chat.msg}</div>
            </div>
            <div className="text-[11px] text-gray-400">{chat.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
