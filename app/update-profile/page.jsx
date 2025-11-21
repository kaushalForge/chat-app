"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import { toast, Toaster } from "sonner"; // ✅ Sonner toast

const UpdateProfile = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => setProfilePicture(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("oldPassword", oldPassword);
      if (newPassword) formData.append("newPassword", newPassword);
      if (profilePicture) formData.append("profilePicture", profilePicture);

      const token = localStorage.getItem("token");

      const res = await axios.post("/api/user/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: token,
        },
      });

      toast.success(res.data.message || "Profile updated successfully!", {
        position: "top-right",
      });

      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        router.push("/");
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Update failed",
        { position: "top-right" }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-900 via-blue-900 to-cyan-900 px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl p-8 bg-gray-900 bg-opacity-60 backdrop-blur-xl rounded-3xl shadow-2xl border border-cyan-500"
      >
        {/* Header */}
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center text-4xl font-extrabold text-white mb-10 tracking-wider"
        >
          💎 Update Profile
        </motion.h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
        >
          {/* Profile Picture Upload */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center justify-center"
          >
            <div className="relative w-48 h-48 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center overflow-hidden shadow-xl cursor-pointer hover:scale-105 transition-transform border-4 border-white">
              {profilePicture ? (
                <img
                  src={URL.createObjectURL(profilePicture)}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full border-4 border-white"
                />
              ) : (
                <div className="text-white text-5xl font-bold flex flex-col items-center justify-center">
                  <FiUpload className="animate-bounce" />
                  <span className="text-lg mt-2 font-medium">Upload</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <p className="mt-3 text-gray-300 font-medium">Profile Picture</p>
          </motion.div>

          {/* Form Inputs */}
          <motion.div className="flex flex-col gap-5">
            <motion.input
              whileFocus={{ scale: 1.02, borderColor: "#06b6d4" }}
              type="email"
              placeholder="*Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-800 border border-cyan-500 p-4 rounded-2xl placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />

            <motion.input
              whileFocus={{ scale: 1.02, borderColor: "#06b6d4" }}
              type="password"
              placeholder="*Verify Old Password"
              value={oldPassword}
              required
              onChange={(e) => setOldPassword(e.target.value)}
              className="bg-gray-800 border border-cyan-500 p-4 rounded-2xl placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />

            <motion.input
              whileFocus={{ scale: 1.02, borderColor: "#06b6d4" }}
              type="password"
              placeholder="New Password (optional)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-gray-800 border border-cyan-500 p-4 rounded-2xl placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold p-4 rounded-2xl shadow-lg flex items-center justify-center gap-3 hover:from-cyan-500 hover:to-blue-500 transition-all disabled:opacity-50"
            >
              {loading && (
                <AiOutlineLoading3Quarters className="animate-spin" />
              )}
              {loading ? "Updating..." : "Save Changes"}
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdateProfile;
