// app/layout.jsx
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ChatUI from "@/components/ChatUI/page";
import FriendsUI from "@/components/FreindsUI/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Chat App",
  description: "Chatting Application By genZ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex h-screen w-full">
          {/* Friends list: hidden on small screens */}
          <div className="hidden lg:block lg:w-1/4 border-r border-gray-300">
            <FriendsUI />
          </div>

          {/* Chat area: full width on small screens */}
          <div className="w-full lg:w-3/4">
            <ChatUI />
          </div>
        </div>
      </body>
    </html>
  );
}
