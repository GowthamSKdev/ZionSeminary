import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./WrittenTest.css";
import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_BASE_API;
const userInfo = JSON.parse(localStorage.getItem("userdata"));

export default function WrittenTest() {
  const [questionData, setQuestionData] = useState(null); // Initialize as null for better error handling
  const [answer, setAnswer] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { test } = location.state;

  useEffect(() => {
    if (test && Array.isArray(test)) {
      setQuestionData(test[0]);
    }
  }, [test]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadTest = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
      formData.append("userId", userInfo._id);
    formData.append("degreeId", userInfo.applyingFor);
    formData.append("chapterId",questionData._id)
    formData.append("answer", answer);
    if (file) {
      formData.append("answerFiles", file);
    }

    try {
      const res = await axios.post(
        `${apiBaseUrl}/api/answer/submit`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Upload successful:", res.data);
      alert("Test submitted successfully!");
    } catch (error) {
      console.error("Failed to upload", error);
      alert("Failed to submit the test. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="writtenTest p-4 h-100 min-vh-100">
      <div className="d-flex align-items-center gap-2">
        <button className="btn btn-danger" onClick={() => navigate(-1)}>
          Back
        </button>
        <h3 className="m-0">Written Test</h3>
      </div>
      <div className="written-test-container container-fluid h-100 p-4 d-flex flex-column gap-2">
        <h6>Question</h6>
        {questionData && questionData.questions ? (
          <p className="written-question">
            {`1. ${
              questionData.questions[0]?.question || "No question available"
            }`}
          </p>
        ) : (
          <p className="written-question">Loading question...</p>
        )}
        <textarea
          className="form-control h-75"
          placeholder="Write your answer here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        ></textarea>
        <span className="text-center w-100 d-flex justify-content-between">
          <hr /> Or <hr />
        </span>
        <input
          type="file"
          className="form-control"
          onChange={handleFileChange}
        />
        <div className="d-flex align-items-end justify-content-end gap-4 mt-5">
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleUploadTest}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
