import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Degrees/Degrees.css";
import "./Marks.css";

const Marks = () => {
  const [marksData, setMarksData] = useState(null);
  const [selectedAttempt, setSelectedAttempt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarksData = async () => {
      try {
        const response = await fetch(
          "https://zion-test.onrender.com/api/answer/user/6767cad4b00b1e6dc40db2e3/6794f7147b1c2b71d55c0ac5"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch marks data");
        }
        const data = await response.json();
        console.log("Fetched Data:", data);
        setMarksData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMarksData();
  }, []);

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="text-center text-danger mt-4">{error}</div>;
  if (!marksData || (!marksData.chapters && !marksData.subLessons)) return <div className="text-center mt-4">No data available.</div>;

  return (
    <div className="container-fluid mt-4">
      <h2 className="text-center text-primary">Marks Summary</h2>
      <table className="table table-bordered table-striped shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Total Marks</th>
            <th>Total Possible Marks</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{marksData.totalMarks ?? "N/A"}</td>
            <td>{marksData.totalPossibleMarks ?? "N/A"}</td>
            <td>{marksData.percentage ? `${marksData.percentage}%` : "N/A"}</td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-center text-success">Chapters</h2>
      <table className="table table-hover table-bordered shadow-sm">
        <thead className="table-info">
          <tr>
            <th>Chapter ID</th>
            <th>Best Marks</th>
            <th>Max Marks</th>
            <th>Attempts</th>
          </tr>
        </thead>
        <tbody>
          {marksData.chapters?.map((chapter) => (
            <React.Fragment key={chapter.chapterId}>
              <tr>
                <td>{chapter.chapterId}</td>
                <td>{chapter.bestMarks ?? "N/A"}</td>
                <td>{chapter.attempts?.reduce((max, attempt) => Math.max(max, attempt.answers.reduce((sum, ans) => sum + ans.marks, 0)), 0) ?? "N/A"}</td>
                <td>
                  {chapter.attempts?.map((attempt, index) => (
                    <button
                      className="btn btn-outline-primary m-1"
                      key={index}
                      onClick={() => setSelectedAttempt(attempt)}
                    >
                      Attempt {index + 1} ({attempt.answers.reduce((sum, ans) => sum + ans.marks, 0)} Marks)
                    </button>
                  )) || "No attempts"}
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <h2 className="text-center text-info">Sub-Lessons</h2>
      <table className="table table-hover table-bordered shadow-sm">
        <thead className="table-warning">
          <tr>
            <th>Sub-Lesson ID</th>
            <th>Sub-Lesson Title</th>
            <th>Best Marks</th>
            <th>Max Marks</th>
            <th>Attempts</th>
          </tr>
        </thead>
        <tbody>
          {marksData.subLessons?.map((subLesson) => (
            <tr key={subLesson.subLessonId}>
              <td>{subLesson.title ?? "N/A"}</td>
              <td>{subLesson.subLessonId}</td>
              <td>{subLesson.bestMarks ?? "N/A"}</td>
              <td>{subLesson.attempts?.reduce((max, attempt) => Math.max(max, attempt.answers.reduce((sum, ans) => sum + ans.marks, 0)), 0) ?? "N/A"}</td>
              <td>
                {subLesson.attempts?.map((attempt, index) => (
                  <button
                    className="btn btn-outline-success m-1"
                    key={index}
                    onClick={() => setSelectedAttempt(attempt)}
                  >
                    Attempt {index + 1} ({attempt.answers.reduce((sum, ans) => sum + ans.marks, 0)} Marks)
                  </button>
                )) || "No attempts"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedAttempt && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Attempt Details</h5>
                <button
                  className="btn-close"
                  onClick={() => setSelectedAttempt(null)}
                ></button>
              </div>
              <div className="modal-body">
                <table className="table table-bordered shadow-sm">
                  <thead className="table-primary">
                    <tr>
                      <th>Question</th>
                      <th>Marks</th>
                      <th>Your Answer</th>
                      <th>Correct Answer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedAttempt.answers?.map((answer, index) => (
                      <tr key={index}>
                        <td>{answer.question ?? "N/A"}</td>
                        <td>{answer.marks ?? "N/A"}</td>
                        <td>
                          {answer.type === "MCQ" ? (
                            answer.userAnswer ?? "N/A"
                          ) : (
                            <a
                              href={answer.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-link"
                            >
                              View File
                            </a>
                          )}
                        </td>
                        <td>{answer.correctAnswer || "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-danger"
                  onClick={() => setSelectedAttempt(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marks;
