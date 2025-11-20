"use client";

import React from "react";
import FriendsUI from "@/components/FreindsUI/page";
import ChatUI from "@/components/ChatUI/page";

const page = () => {
  return (
    <>
      <div className="flex h-screen w-full">
        {/* Friends list: hidden on small screens */}
        <div className="w-full lg:block lg:w-1/4">
          <FriendsUI />
        </div>

        {/* Chat area: full width on small screens */}
        <div className="w-full lg:w-3/4 lg:block hidden">
          <ChatUI />
        </div>
      </div>
    </>
  );
};

export default page;
