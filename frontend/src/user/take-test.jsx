import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";

export default function TakeTest() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [test, setTest] = useState(location.state?.test || null);
  const [answers, setAnswers] = useState({}); // index -> answer string
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (test) return; // already have from state
    const fetchTest = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/tests/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // This admin endpoint includes answers; ensure user side doesn't expose them. Ideally we'd fetch public, but we have id.
        const t = res.data;
        let safeQuestions = t.questions;
        if (t.type === "mcq" || t.type === "ai") {
          safeQuestions = (t.questions || []).map(q => ({ question: q.question, options: q.options }));
        }
        setTest({ ...t, questions: safeQuestions });
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load test");
      } finally {
        setLoading(false);
      }
    };
    fetchTest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const total = useMemo(() => test?.questions?.length || 0, [test]);

  const onSelect = (idx, value) => {
    setAnswers(prev => ({ ...prev, [idx]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!test) return;
    try {
      setSubmitting(true);
      const payload = {
        answers: Object.entries(answers).map(([k, v]) => ({ index: Number(k), answer: v })),
      };
      const res = await axios.post(`http://localhost:5000/api/tests/${test._id}/submit`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to submit");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-400">{error}</div>;
  if (!test) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold">{test.name}</h1>
        <p className="text-gray-300">{test.subject} • {test.difficulty} • {total} questions</p>

        {result ? (
          <div className="mt-8 bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-2">Your Result</h2>
            <p className="text-xl">Score: {result.score} / {result.total}</p>
            <button className="mt-6 px-4 py-2 bg-teal-600 rounded-lg" onClick={() => navigate("/userdashboard")}>Back to Dashboard</button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 space-y-6">
            {test.questions.map((q, idx) => (
              <div key={idx} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="font-semibold mb-3">Q{idx + 1}. {q.question}</div>
                {Array.isArray(q.options) && (
                  <div className="space-y-2">
                    {q.options.map((opt, i) => (
                      <label key={i} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name={`q_${idx}`}
                          value={opt}
                          checked={answers[idx] === opt}
                          onChange={() => onSelect(idx, opt)}
                          className="accent-teal-500"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={submitting}
              className={`px-5 py-3 rounded-lg ${submitting ? "bg-gray-600" : "bg-teal-600 hover:bg-teal-500"}`}
            >
              {submitting ? "Submitting..." : "Submit Test"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}




