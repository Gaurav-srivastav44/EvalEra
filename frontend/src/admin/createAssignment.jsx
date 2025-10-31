import React, { useState } from "react";
import axios from "axios";
import { FaUpload } from "react-icons/fa";

export default function CreateAssignment() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Active");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting form:");
    console.log({ title, date, status, file, token });

    if (!file) {
      setMessage("Please upload a PDF or Word document");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("date", date);
    formData.append("status", status);
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/assignment", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Backend response:", res.data);

      setMessage("Assignment uploaded successfully!");
      setTitle("");
      setDate("");
      setFile(null);
    } catch (err) {
      console.error("Full error:", err);
      console.error("Response data:", err.response?.data);
      setMessage(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 mt-10 bg-gray-50 min-h-screen text-gray-900">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Upload Assignment</h1>

      <form onSubmit={handleSubmit} className="max-w-lg space-y-6 bg-white p-6 rounded-xl shadow-md">
        <div>
          <label className="block mb-2 font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Due Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Upload File</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full text-gray-700"
          />
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-bold shadow-md transition-all duration-200"
          disabled={loading}
        >
          <FaUpload /> {loading ? "Uploading..." : "Upload Assignment"}
        </button>

        {message && <p className="mt-4 text-indigo-600">{message}</p>}
      </form>
    </div>
  );
}
