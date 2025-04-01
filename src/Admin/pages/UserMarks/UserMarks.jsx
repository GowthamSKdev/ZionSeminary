




// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./UserMarks.css";
// import LeftBar from "../../../Admin/components/global/sidebar/LeftBar";

// const UserMarks = () => {
//   const navigate = useNavigate();
//   const [mockData, setMockData] = useState([
//     {
//       userId: 1,
//       name: "John Doe",
//       totalMarks: 85,
//       totalPossibleMarks: 100,
//       percentage: 85,
//       chapters: [
//         {
//           courseName: "Mathematics",
//           bestMarks: 45,
//           attempts: [
//             {
//               answers: [
//                 {
//                   question: "What is 2+2?",
//                   marks: 5,
//                   maxMarks: 5,
//                   userAnswer: "Four",
//                   correctAnswer: "Four",
//                 },
//                 {
//                   question: "Solve for x: 2x=10",
//                   marks: 3,
//                   maxMarks: 5,
//                   userAnswer: "Three",
//                   correctAnswer: "Five",
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//     {
//       userId: 2,
//       name: "Saran",
//       totalMarks: 85,
//       totalPossibleMarks: 100,
//       percentage: 85,
//       chapters: [
//         {
//           courseName: "Mathematics",
//           bestMarks: 45,
//           attempts: [
//             {
//               answers: [
//                 {
//                   question: "What is 2+2?",
//                   marks: 5,
//                   maxMarks: 5,
//                   userAnswer: "Four",
//                   correctAnswer: "Four",
//                 },
//                 {
//                   question: "Solve for x: 2x=10",
//                   marks: 3,
//                   maxMarks: 5,
//                   userAnswer: "Three",
//                   correctAnswer: "Five",
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//   ]);

//   const [selectedUser, setSelectedUser] = useState(null);
//   const [selectedAttempt, setSelectedAttempt] = useState(null);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [tempMarks, setTempMarks] = useState({});

//   const handleMarksChange = (answerIndex, newMarks) => {
//     setTempMarks({ ...tempMarks, [answerIndex]: newMarks });
//   };

//   const saveMarks = (attemptIndex, answerIndex) => {
//     const updatedData = [...mockData];
//     const user = updatedData.find((user) => user.userId === selectedUser.userId);
//     const attempt = user.chapters[0].attempts[attemptIndex];

//     attempt.answers[answerIndex].marks = tempMarks[answerIndex] || attempt.answers[answerIndex].marks;
//     setMockData(updatedData);
//     setEditingIndex(null);
//   };

//   return (
//     <div style={{ display: "flex" }}>
//       {/* Sidebar */}
//       <LeftBar />

//       {/* Main Content */}
//       <div className="container-fluid mt-4" style={{ flex: 1 }}>
//         {/* Back to Admin UserMarks */}
//         <button className="btn btn-secondary mb-3" onClick={() => navigate("/admin")}>
//           Back
//         </button>

//         {!selectedUser ? (
//           <>
//             <h2 className="text-center text-primary">Marks Overview</h2>
//             <table className="table table-bordered table-striped shadow-sm">
//               <thead className="table-dark">
//                 <tr>
//                   <th>Student Name</th>
//                   <th>Total Marks</th>
//                   <th>Percentage</th>
//                   <th>View Details</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {mockData.map((user) => (
//                   <tr key={user.userId}>
//                     <td>{user.name}</td>
//                     <td>{user.totalMarks}</td>
//                     <td>{user.percentage}%</td>
//                     <td>
//                       <button className="btn btn-outline-info" onClick={() => setSelectedUser(user)}>
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </>
//         ) : (
//           <>
//             {/* Back to User List Button */}
//             <button className="btn btn-secondary d-flex justify-content-end mb-3" onClick={() => setSelectedUser(null)}>
//               Back to User List
//             </button>

//             <h3 className="text-center text-success">{selectedUser.name}'s Marks</h3>
//             <table className="table table-hover table-bordered shadow-sm">
//               <thead className="table-info">
//                 <tr>
//                   <th>Course Name</th>
//                   <th>Best Marks</th>
//                   <th>Attempts</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {selectedUser.chapters.map((item, index) => (
//                   <tr key={index}>
//                     <td>{item.courseName}</td>
//                     <td>{item.bestMarks}</td>
//                     <td>
//                       {item.attempts.map((attempt, idx) => (
//                         <button key={idx} className="btn btn-outline-primary m-1" onClick={() => setSelectedAttempt(attempt)}>
//                           Attempt {idx + 1} ({attempt.answers.reduce((sum, ans) => sum + ans.marks, 0)} Marks)
//                         </button>
//                       ))}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </>
//         )}

//         {selectedAttempt && (
//           <div className="modal fade show d-block" tabIndex="-1">
//             <div className="modal-dialog modal-lg">
//               <div className="modal-content">
//                 <div className="modal-header bg-primary text-white">
//                   <h5 className="modal-title">Attempt Details</h5>
//                   <button className="btn-close" onClick={() => setSelectedAttempt(null)}></button>
//                 </div>
//                 <div className="modal-body">
//                   <table className="table table-bordered shadow-sm">
//                     <thead className="table-primary">
//                       <tr>
//                         <th>Question</th>
//                         <th>User Answer</th>
//                         <th>Correct Answer</th>
//                         <th>Correct?</th>
//                         <th>Marks</th>
//                         <th>Max Marks</th>
//                         <th>Edit</th>
//                         <th>Save</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {selectedAttempt.answers.map((answer, index) => (
//                         <tr key={index}>
//                           <td>{answer.question}</td>
//                           <td>{answer.userAnswer}</td>
//                           <td>{answer.correctAnswer}</td>
//                           <td>{answer.userAnswer === answer.correctAnswer ? "✔" : "✘"}</td>
//                           <td>
//                             {editingIndex === index ? (
//                               <input
//                                 type="number"
//                                 value={tempMarks[index] || answer.marks}
//                                 onChange={(e) => handleMarksChange(index, parseInt(e.target.value, 10))}
//                               />
//                             ) : (
//                               answer.marks
//                             )}
//                           </td>
//                           <td>{answer.maxMarks}</td>
//                           <td>
//                             {editingIndex === index ? (
//                               <button className="btn btn-warning" onClick={() => setEditingIndex(null)}>
//                                 Cancel
//                               </button>
//                             ) : (
//                               <button className="btn btn-info" onClick={() => setEditingIndex(index)}>
//                                 Edit
//                               </button>
//                             )}
//                           </td>
//                           <td>
//                             <button className="btn btn-success" onClick={() => saveMarks(selectedUser.chapters[0].attempts.indexOf(selectedAttempt), index)}>
//                               Save
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//                 <div className="modal-footer">
//                   <button className="btn btn-secondary" onClick={() => setSelectedAttempt(null)}>
//                     Back
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserMarks;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserMarks.css";
import LeftBar from "../../../Admin/components/global/sidebar/LeftBar";

const UserMarks = () => {
  const navigate = useNavigate();
  const [mockData, setMockData] = useState([
    {
      userId: 1,
      name: "John Doe",
      totalMarks: 85,
      totalPossibleMarks: 100,
      percentage: 85,
      chapters: [
        {
          courseName: "Mathematics",
          bestMarks: 45,
          attempts: [
            {
              answers: [
                {
                  question: "What is 2+2?",
                  marks: 5,
                  maxMarks: 5,
                  userAnswer: "Four",
                  correctAnswer: "Four",
                },
                {
                  question: "Solve for x: 2x=10",
                  marks: 3,
                  maxMarks: 5,
                  userAnswer: "Three",
                  correctAnswer: "Five",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      userId: 2,
      name: "Saran",
      totalMarks: 85,
      totalPossibleMarks: 100,
      percentage: 85,
      chapters: [
        {
          courseName: "Mathematics",
          bestMarks: 45,
          attempts: [
            {
              answers: [
                {
                  question: "What is 2+2?",
                  marks: 5,
                  maxMarks: 5,
                  userAnswer: "Four",
                  correctAnswer: "Four",
                },
                {
                  question: "Solve for x: 2x=10",
                  marks: 3,
                  maxMarks: 5,
                  userAnswer: "Three",
                  correctAnswer: "Five",
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedAttempt, setSelectedAttempt] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [tempMarks, setTempMarks] = useState({});

  const handleMarksChange = (answerIndex, newMarks) => {
    setTempMarks({ ...tempMarks, [answerIndex]: newMarks });
  };

  const saveMarks = (attemptIndex, answerIndex) => {
    const updatedData = [...mockData];
    const user = updatedData.find(
      (user) => user.userId === selectedUser.userId
    );
    const attempt = user.chapters[0].attempts[attemptIndex];

    attempt.answers[answerIndex].marks =
      tempMarks[answerIndex] || attempt.answers[answerIndex].marks;
    setMockData(updatedData);
    setEditingIndex(null);
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <LeftBar />

      {/* Main Content */}
      <div className="container-fluid mt-4" style={{ flex: 1 }}>
        {/* Back to Admin UserMarks - Only visible when no user is selected */}
        {!selectedUser && (
          <button
            className="btn btn-secondary mb-3"
            onClick={() => navigate("/admin")}
          >
            Back
          </button>
        )}

        {!selectedUser ? (
          <>
            <h2 className="text-center text-primary">Marks Overview</h2>
            <table className="table table-bordered table-striped shadow-sm">
              <thead className="table-dark">
                <tr>
                  <th>Student Name</th>
                  <th>Total Marks</th>
                  <th>Percentage</th>
                  <th>View Details</th>
                </tr>
              </thead>
              <tbody>
                {mockData.map((user) => (
                  <tr key={user.userId}>
                    <td>{user.name}</td>
                    <td>{user.totalMarks}</td>
                    <td>{user.percentage}%</td>
                    <td>
                      <button
                        className="btn btn-outline-info"
                        onClick={() => setSelectedUser(user)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <>
            {/* Back to User List Button - Only visible when viewing user marks */}
            <button
              className="btn btn-secondary d-flex justify-content-end mb-3"
              onClick={() => setSelectedUser(null)}
            >
              Back to User List
            </button>

            <h3 className="text-center text-success">
              {selectedUser.name}'s Marks
            </h3>
            <table className="table table-hover table-bordered shadow-sm">
              <thead className="table-info">
                <tr>
                  <th>Course Name</th>
                  <th>Best Marks</th>
                  <th>Attempts</th>
                </tr>
              </thead>
              <tbody>
                {selectedUser.chapters.map((item, index) => (
                  <tr key={index}>
                    <td>{item.courseName}</td>
                    <td>{item.bestMarks}</td>
                    <td>
                      {item.attempts.map((attempt, idx) => (
                        <button
                          key={idx}
                          className="btn btn-outline-primary m-1"
                          onClick={() => setSelectedAttempt(attempt)}
                        >
                          Attempt {idx + 1} (
                          {attempt.answers.reduce(
                            (sum, ans) => sum + ans.marks,
                            0
                          )}{" "}
                          Marks)
                        </button>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

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
                        <th>User Answer</th>
                        <th>Correct Answer</th>
                        <th>Correct?</th>
                        <th>Marks</th>
                        <th>Max Marks</th>
                        <th>Edit</th>
                        <th>Save</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedAttempt.answers.map((answer, index) => (
                        <tr key={index}>
                          <td>{answer.question}</td>
                          <td>{answer.userAnswer}</td>
                          <td>{answer.correctAnswer}</td>
                          <td>
                            {answer.userAnswer === answer.correctAnswer
                              ? "✔"
                              : "✘"}
                          </td>
                          <td>
                            {editingIndex === index ? (
                              <input
                                type="number"
                                value={tempMarks[index] || answer.marks}
                                onChange={(e) =>
                                  handleMarksChange(
                                    index,
                                    parseInt(e.target.value, 10)
                                  )
                                }
                              />
                            ) : (
                              answer.marks
                            )}
                          </td>
                          <td>{answer.maxMarks}</td>
                          <td>
                            {editingIndex === index ? (
                              <button
                                className="btn btn-warning"
                                onClick={() => setEditingIndex(null)}
                              >
                                Cancel
                              </button>
                            ) : (
                              <button
                                className="btn btn-info"
                                onClick={() => setEditingIndex(index)}
                              >
                                Edit
                              </button>
                            )}
                          </td>
                          <td>
                            <button
                              className="btn btn-success"
                              onClick={() =>
                                saveMarks(
                                  selectedUser.chapters[0].attempts.indexOf(
                                    selectedAttempt
                                  ),
                                  index
                                )
                              }
                            >
                              Save
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setSelectedAttempt(null)}
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMarks;
