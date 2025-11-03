import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DailyChallenges() {
  const [challenge, setChallenge] = useState(null);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const run = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/challenges/today", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setChallenge(res.data);
      } catch (err) {
        setError(err.response?.data?.error || "No challenge available today.");
      } finally {
        setLoading(false);
      }
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!challenge) return;
    try {
      const res = await axios.post(
        `http://localhost:5000/api/challenges/${challenge._id}/attempt`,
        { answer },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to submit");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Daily Challenge</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : challenge ? (
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="text-lg font-semibold mb-4">{challenge.question}</div>
            {Array.isArray(challenge.options) && challenge.options.length > 0 ? (
              <div className="space-y-2 mb-4">
                {challenge.options.map((opt, i) => (
                  <label key={i} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="opt"
                      value={opt}
                      checked={answer === opt}
                      onChange={() => setAnswer(opt)}
                      className="accent-teal-500"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            ) : (
              <input
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 mb-4"
                placeholder="Your answer"
                value={answer}
                onChange={e => setAnswer(e.target.value)}
              />
            )}
            <button onClick={submit} className="px-4 py-2 bg-teal-600 rounded-lg">Submit</button>
            {result && (
              <p className={`mt-4 ${result.correct ? "text-green-400" : "text-red-400"}`}>
                {result.correct ? "Correct!" : "Incorrect."}
              </p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}




