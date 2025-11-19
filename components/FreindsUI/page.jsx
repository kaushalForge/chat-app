"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";

const Page = () => {
  const [activeChat, setActiveChat] = useState(null);

  const chats = [
    { name: "Aayush", msg: "Code push gareko xu bro.", time: "21:18", online: true, img: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "+977 981-5521034", msg: "📷 Image received", time: "21:05", img: "https://randomuser.me/api/portraits/men/11.jpg" },
    { name: "Mina", msg: "Thik cha, worry nagarna.", time: "20:51", online: true, img: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "Rohan", msg: "🎤 Voice message", time: "20:40", img: "https://randomuser.me/api/portraits/men/24.jpg" },
    { name: "Sujal", msg: "✓✓ Aba milxa bro!", time: "20:21", img: "https://randomuser.me/api/portraits/men/19.jpg" },
    { name: "Aarju", msg: "Goodnight!", time: "19:59", img: "https://randomuser.me/api/portraits/women/29.jpg" },
    { name: "Study Group", msg: "Kal ko assignment chai send garna.", time: "19:41", img: "https://randomuser.me/api/portraits/men/56.jpg" },
    { name: "Prabesh", msg: "Aile aaudai xu.", time: "17:30", img: "https://randomuser.me/api/portraits/men/48.jpg" },
    { name: "Bishal Sir", msg: "✓✓ Ramro banako xa!", time: "13:50", img: "https://randomuser.me/api/portraits/men/1.jpg" },
  ];

  return (
    <div className="w-full h-screen bg-[#2C2C2C] text-white border-r border-gray-800 overflow-y-auto">

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

      {/* Chat List */}
      <div>
        {chats.map((chat, index) => (
          <div
            key={index}
            onClick={() => setActiveChat(index)}
            className={`flex items-center justify-between p-3 cursor-pointer transition-all duration-200 
            ${activeChat === index ? "bg-[#2a3942] shadow-inner" : "hover:bg-[#1f2b32]"}`}
          >

            {/* Avatar + name + message */}
            <div className="flex items-center gap-3">
              
              {/* Profile Picture */}
              <div className="relative w-11 h-11 rounded-full overflow-hidden">
                <img 
                  src={chat.img} 
                  alt={chat.name} 
                  className="w-full h-full object-cover"
                />
                {chat.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0c1418]"></span>
                )}
              </div>

              {/* Name + Message */}
              <div>
                <div className="text-[15px] font-semibold">{chat.name}</div>
                <div className="text-gray-400 text-[13px] truncate w-[160px]">{chat.msg}</div>
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
