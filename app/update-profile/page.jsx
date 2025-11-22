"use client";

import React, { useState, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiUpload, FiCrop } from "react-icons/fi";
import { toast } from "sonner";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/utils/cropImage";

const UpdateProfile = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [profileFile, setProfileFile] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const [loading, setLoading] = useState(false);
  const [showCropper, setShowCropper] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfileFile(file);
    setProfilePreview(URL.createObjectURL(file));
    setShowCropper(true);
  };

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropDone = async () => {
    if (!profileFile || !croppedAreaPixels) return;

    const croppedBlob = await getCroppedImg(profileFile, croppedAreaPixels);
    const croppedFile = new File([croppedBlob], profileFile.name, {
      type: "image/jpeg",
    });

    setProfileFile(croppedFile);
    setProfilePreview(URL.createObjectURL(croppedFile));
    setShowCropper(false);
  };

  const handleCropCancel = () => {
    setShowCropper(false);
  };

  const handleReCrop = () => {
    if (profilePreview) setShowCropper(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("oldPassword", oldPassword);
      if (newPassword) formData.append("newPassword", newPassword);
      if (profileFile) formData.append("profilePicture", profileFile);

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-900 via-blue-900 to-cyan-900 px-4 relative">
      {/* Cropper Modal */}
      {showCropper && profilePreview && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70">
          <div className="relative w-[400px] h-[400px] bg-gray-900 rounded-3xl flex items-center justify-center">
            {/* Cropper */}
            <Cropper
              image={profilePreview}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              cropShape="round"
              showGrid={true}
            />

            {/* Overlay buttons */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4 z-[1010]">
              <button
                type="button"
                onClick={handleCropDone}
                className="bg-blue-500 px-4 py-2 rounded-full text-white hover:bg-blue-600 transition"
              >
                Done
              </button>
              <button
                type="button"
                onClick={handleCropCancel}
                className="bg-gray-500 px-4 py-2 rounded-full text-white hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>

            {/* Zoom slider */}
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-3/4 z-[1010]"
            />
          </div>
        </div>
      )}

      {/* Main Form */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl p-8 bg-gray-900 bg-opacity-60 backdrop-blur-xl rounded-3xl shadow-2xl border border-cyan-500"
      >
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
          {/* Profile Picture */}
          <motion.div className="flex flex-col items-center justify-center">
            <div className="relative w-48 h-48 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 overflow-hidden shadow-xl border-4 border-white flex items-center justify-center cursor-pointer">
              {profilePreview ? (
                <img
                  src={profilePreview}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full border-4 border-white"
                />
              ) : (
                <div className="text-white text-5xl flex flex-col items-center justify-center">
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

            {/* Re-crop button */}
            {profilePreview && !showCropper && (
              <button
                type="button"
                onClick={handleReCrop}
                className="mt-2 flex items-center gap-2 px-4 py-1 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition"
              >
                <FiCrop /> Re-crop
              </button>
            )}
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
