import React from "react";
import { useState } from "react";

const MCQ = () => {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const questions = [
    {
      id: 1,
      question: "Against which country Rohit Sharma scored 264 runs?",
      options: ["Aghanistan", "Pakistan", "SriLanka", "New Zealand"],
      correct: 2,
    },
    {
      id: 2,
      question: "Which player is known as 'The Wall'?",
      options: ["Rahul Dravid", "Sachin Tendulkar", "Virat Kohli", "Steve Smith"],
      correct: 0,
    },
  ];

  const handleSubmit = () => {
    let s = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct) s += 1;
    });
    setScore(s);
  };

  return (
    <div className="my-8 px-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-2">MCQ Section</h2>
      {questions.map((q) => (
        <div key={q.id} className="mb-6 p-4 bg-white border rounded shadow">
          <p className="font-medium">{q.question}</p>
          {q.options.map((opt, i) => (
            <label key={i} className="block mt-1">
              <input
                type="radio"
                name={`q${q.id}`}
                className="mr-2"
                onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: i }))}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
      {score !== null && (
        <p className="mt-4 text-green-600 font-medium">
          Your Score: {score} / {questions.length}
        </p>
      )}
    </div>
  );
};

export default MCQ;
