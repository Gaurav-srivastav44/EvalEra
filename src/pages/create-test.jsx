import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateTest() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(60);
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState({ question: "", options: ["", "", "", ""], answer: 0 });
  const [file, setFile] = useState(null);

  // Add question manually
  const addQuestion = () => {
    if (currentQ.question && currentQ.options.every(opt => opt) && currentQ.answer !== null) {
      setQuestions([...questions, currentQ]);
      setCurrentQ({ question: "", options: ["", "", "", ""], answer: 0 });
    } else {
      alert("Please fill all fields for the question.");
    }
  };

  // Handle option change
  const handleOptionChange = (index, value) => {
    const newOptions = [...currentQ.options];
    newOptions[index] = value;
    setCurrentQ({ ...currentQ, options: newOptions });
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    const fileExtension = uploadedFile.name.split('.').pop().toLowerCase();
    if (fileExtension !== "pdf" && fileExtension !== "docx" && fileExtension !== "doc") {
      alert("Please upload a PDF or Word document (.docx/.doc)");
      return;
    }

    setFile(uploadedFile);
    alert(`File "${uploadedFile.name}" uploaded successfully!`);
    // TODO: Integrate parser to extract questions from the uploaded file
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || (!questions.length && !file)) {
      alert("Please fill title, description, and add questions or upload a file.");
      return;
    }

    console.log({ title, description, duration, questions, file });
    alert("Test created successfully!");
    navigate("/mock-tests");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 via-gray-100 to-cyan-200 text-gray-900 p-6 md:p-20 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-br from-cyan-700 to-blue-700 bg-clip-text text-transparent">
        Create Your Own Test
      </h1>
      <p className="text-gray-700 mb-10 max-w-2xl text-center">
        Add title, description, duration, and multiple questions. You can also upload a PDF or Word document with questions.
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col gap-6">
        <input
          type="text"
          placeholder="Test Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-cyan-500 focus:outline-none text-gray-900"
        />

        <textarea
          placeholder="Test Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-cyan-500 focus:outline-none resize-none h-24 text-gray-900"
        ></textarea>

        <input
          type="number"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
          min={1}
          className="px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-cyan-500 focus:outline-none text-gray-900"
        />

        {/* File Upload */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Upload Questions (PDF or Word)</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-cyan-500 bg-white text-gray-900"
          />
          {file && <span className="text-gray-600 text-sm mt-1">Uploaded file: {file.name}</span>}
        </div>

        {/* Manual Question Builder */}
        <div className="border border-gray-300 p-4 rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Add Question Manually</h2>
          <input
            type="text"
            placeholder="Question"
            value={currentQ.question}
            onChange={(e) => setCurrentQ({ ...currentQ, question: e.target.value })}
            className="w-full px-3 py-2 mb-2 rounded border border-gray-300 focus:outline-none focus:border-cyan-500"
          />

          {currentQ.options.map((opt, idx) => (
            <input
              key={idx}
              type="text"
              placeholder={`Option ${idx + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(idx, e.target.value)}
              className="w-full px-3 py-2 mb-2 rounded border border-gray-300 focus:outline-none focus:border-cyan-500"
            />
          ))}

          <select
            value={currentQ.answer}
            onChange={(e) => setCurrentQ({ ...currentQ, answer: parseInt(e.target.value) })}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-cyan-500 mb-2"
          >
            <option value={0}>Answer: Option 1</option>
            <option value={1}>Answer: Option 2</option>
            <option value={2}>Answer: Option 3</option>
            <option value={3}>Answer: Option 4</option>
          </select>

          <button type="button" onClick={addQuestion} className="py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-full shadow-md w-full transition hover:scale-105 hover:shadow-lg">
            Add Question
          </button>
        </div>

        {questions.length > 0 && (
          <div className="mt-4">
            <h2 className="font-semibold mb-2">Questions Added:</h2>
            <ul className="list-decimal list-inside space-y-1">
              {questions.map((q, idx) => (
                <li key={idx}>
                  {q.question} (Answer: Option {q.answer + 1})
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="submit"
          className="py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg"
        >
          Create Test
        </button>
      </form>
    </div>
  );
}
