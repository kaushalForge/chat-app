"use client";

import React, { useState } from "react";
import { Search, UserPlus } from "lucide-react";

const AddFriend = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);

    try {
      // Call your backend API here
      const res = await fetch("/api/search-user?query=" + query);
      const data = await res.json();

      setResults(data.users || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const sendRequest = async (userId) => {
    await fetch("/api/send-request", {
      method: "POST",
      body: JSON.stringify({ userId }),
    });

    alert("Friend request sent!");
  };

  return (
    <div className="h-screen bg-[#0c1418] text-white p-5">

      {/* Title */}
      <h1 className="text-2xl font-bold mb-5">Add Friend</h1>

      {/* Search Bar */}
      <div className="flex items-center bg-[#1f2b32] rounded-xl px-4 py-2 gap-3 border border-gray-700">
        <Search className="text-gray-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="bg-transparent outline-none w-full text-sm"
          placeholder="Search by username or email..."
        />
        <button
          onClick={handleSearch}
          className="bg-green-600 px-3 py-1 rounded-lg text-sm hover:bg-green-700"
        >
          Search
        </button>
      </div>

      {/* Loader */}
      {loading && (
        <p className="text-center text-gray-400 mt-4">Searching...</p>
      )}

      {/* Search Results */}
      <div className="mt-5 flex flex-col gap-3">
        {results.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between p-3 bg-[#111b21] rounded-xl border border-gray-700"
          >
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <img
                src={
                  user.profilePicture ||
                  "https://res.cloudinary.com/dsvlevzds/image/upload/v1763719226/Kurakani/profilePictures/tgj63mcpfstb3zx27h9x.jpg"
                }
                className="w-10 h-10 rounded-full"
              />

              <div>
                <p className="font-semibold">{user.username}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
            </div>

            <button
              onClick={() => sendRequest(user._id)}
              className="flex items-center gap-1 bg-blue-600 px-3 py-1 rounded-lg text-sm hover:bg-blue-700"
            >
              <UserPlus size={16} />
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddFriend;
