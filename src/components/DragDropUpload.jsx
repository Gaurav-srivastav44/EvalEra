import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function DragDropUpload({ onFileSelect }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      console.log("Dropped files:", acceptedFiles);
      if (onFileSelect) onFileSelect(acceptedFiles[0]);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/mp4": [".mp4"],
      "video/quicktime": [".mov"],
      "video/x-msvideo": [".avi"],
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    multiple: false,
    maxSize: 500 * 1024 * 1024, // 500MB
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white px-6">
      <div
        {...getRootProps()}
        className={`w-[450px] h-[250px] flex flex-col items-center justify-center border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 
          ${isDragActive ? "border-cyan-400 bg-cyan-400/10" : "border-gray-400/40 bg-black/20"}`}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          <div className="text-5xl mb-3">📹</div>
          <p className="text-lg font-semibold">
            {isDragActive ? "Drop your file here..." : "Drag & Drop Your Video/Image Here"}
          </p>
        </div>
      </div>

      {/* Browse Button */}
      <button
        type="button"
        onClick={() => document.querySelector("input[type=file]").click()}
        className="mt-4 px-6 py-2 rounded-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg hover:scale-105 transition-all duration-300"
      >
        Browse Files
      </button>

      {/* File Info */}
      <p className="mt-3 text-sm text-gray-300">
        Supports MP4, MOV, AVI, PNG, JPG, JPEG | Max 500MB
      </p>
    </div>
  );
}
