import React, { useEffect, useState } from "react";
import { getThemeByRole } from "../theme";
import bgImg from "../assets/bgprofile.png";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");


  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Failed to load profile");
        setUser(json.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white bg-gray-950">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-400 bg-gray-950">{error}</div>;
  if (!user) return null;
  const theme = getThemeByRole(user.role);

  return (
    <div
  className={`min-h-screen ${theme.bg} text-white p-6 bg-cover bg-center bg-no-repeat`}
  style={{
    backgroundImage: `url(${bgImg})`,
    backgroundAttachment: "fixed",
  }}
>

      <div className="max-w-3xl mx-auto mt-20">
        <div className={`${theme.card} rounded-2xl p-6 shadow-xl`}>
          <h1 className={`text-3xl font-bold mb-2 ${theme.accent}`}>Profile</h1>
          <p className="text-gray-400 mb-6">Manage your account information</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="text-gray-400 text-sm">Name</div>
              <div className="text-xl font-semibold">{user.username}</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm">Email</div>
              <div className="text-xl font-semibold">{user.email}</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm">Role</div>
              <div className="text-xl font-semibold capitalize">{user.role}</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm">User ID</div>
              <div className="text-sm font-mono break-all">{user._id}</div>
            </div>
          </div>
          <div className="mt-8 flex gap-3">
            <button className={`px-5 py-3 rounded-lg ${theme.button} ${theme.ring}`}>Edit Profile</button>
            <button className={`px-5 py-3 rounded-lg bg-gray-700 border border-gray-600`}>Change Password</button>
          </div>
        </div>
      </div>
    </div>
  );
}


