// import React, { useState } from "react";
// import "./UserDetails.css";
// import { useLocation } from "react-router-dom";
// import LeftBar from "../../../../components/global/sidebar/LeftBar";
// import defaultUserImg from "../../../../assets/Images/defaultPorfileSVG.svg";
// import Assignment from "../Assignment/Assignment";
// const UserDetails = () => {
//   const location = useLocation();
//   const { user } = location.state;
//   console.log(user);

//   const [isOpenAssignment, setIsOpenAssignment] = useState(false)
// const formattedDob = new Date(user.dob)
//   .toISOString()
//   .split("T")[0];
//   return (
//     <>
//       <div className="courses-page h-100 min-vh-100">
//         <LeftBar />
//         <div className="w-100 container p-3 h-100 min-dvh-100 position-relative">
//           <h3>User Details</h3>
//           <div className="w-100 h-100 d-flex">
//             {isOpenAssignment && (
//               <Assignment setIsOpenAssignment={setIsOpenAssignment} />
//             )}
//           </div>
//           <div className=" d-flex h-100 min-dvh-100 flex-column-reverse flex-lg-row justify-content-between gap-3">
//             <div className="left w-100 h-100 gap-3 d-flex flex-column justify-content-between align-items-start">
//               <div className="input-form">
//                 First Name :
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder={user.firstName}
//                 />
//               </div>
//               <div className="input-form">
//                 Last Name :{" "}
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder={user.lastName}
//                 />{" "}
//               </div>
//               <div className="input-form">
//                 User Name :{" "}
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder={user.username}
//                 />{" "}
//               </div>
//               <div className="input-form">
//                 User Email :{" "}
//                 <input
//                   type="email"
//                   className="form-control"
//                   placeholder={user.email}
//                 />
//               </div>
//               <div className="input-form">
//                 Date of Birth :{" "}
//                 <input
//                   type="date"
//                   className="form-control"
//                   placeholder={formattedDob}
//                 />
//               </div>
//               <div className="input-form">
//                 Gender :{" "}
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder={user.gender}
//                 />
//               </div>
//               <div className="input-form">
//                 Educational Qualification :{" "}
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder={user.educationalQualification}
//                 />
//               </div>
//               <div className="input-form">
//                 Mobile No :{" "}
//                 <input
//                   type="number"
//                   className="form-control"
//                   placeholder={user.mobileNo}
//                 />
//               </div>
//               <div className="input-form">
//                 Degree Name :
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder={user.degreeName}
//                 />
//               </div>
//               <div className="input-form">
//                 Present Address :{" "}
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder={user.presentAddress}
//                 />
//               </div>
//               <div className="input-form">
//                 Ministry Experience :{" "}
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder={user.ministryExperience}
//                 />
//               </div>
//               <div className="input-form">
//                 Theological Qualification :{" "}
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder={user.theologicalQualification}
//                 />
//               </div>
//             </div>
//             <div className="right w-100 d-flex flex-column justify-content-evenly align-items-end gap-2">
//               <img
//                 src={user.passportPhotoFile || defaultUserImg}
//                 alt={user.username}
//                 height={170}
//                 width={150}
//               />

//               {/* Assignment degree mark */}
//               <div className="w-100 fs-sm">
//                 <table className="table border-1 table-hover">
//                   <thead className="table-dark">
//                     <tr>
//                       <th scope="col">No</th>
//                       <th scope="col">Semester</th>
//                       <th scope="col">Assignment</th>
//                       <th scope="col">Mark</th>
//                       <th scope="col">status</th>
//                     </tr>
//                   </thead>
//                   <tbody className="table-white">
//                     <tr>
//                       <td>1</td>
//                       <td>Semester</td>
//                       <td>
//                         <button
//                           className="btn btn-light btn-sm"
//                           onClick={() => setIsOpenAssignment(true)}
//                         >
//                           View
//                         </button>
//                       </td>
//                       <td>10</td>
//                       <td>
//                         <div className="btn btn-danger btn-sm">process</div>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>1</td>
//                       <td>Semester</td>
//                       <td>
//                         <div className="btn btn-light btn-sm">View</div>
//                       </td>
//                       <td>10</td>
//                       <td>
//                         <div className="btn btn-danger btn-sm">process</div>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>

//               {/*  Payment */}
//               <div className="w-100 border-1 rounded-1 border-dark">
//                 <table className="table border-1 border-dark rounded-1  table-hover">
//                   <thead className="table-dark">
//                     <tr>
//                       <th scope="col">No</th>
//                       <th scope="col">Payment</th>
//                       <th scope="col">Amount</th>
//                       <th scope="col">Status</th>
//                     </tr>
//                   </thead>
//                   <tbody className="table-white">
//                     <tr>
//                       <td>1</td>
//                       <td>Initial Payment</td>
//                       <td>₹1200</td>
//                       <td>
//                         <div className="btn btn-success btn-sm">Paid</div>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>2</td>
//                       <td>month 2</td>
//                       <td>₹1200</td>
//                       <td>
//                         <div className="btn btn-success btn-sm">Paid</div>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>3</td>
//                       <td>month 3</td>
//                       <td>₹1200</td>
//                       <td>
//                         <div className="btn btn-success btn-sm">Paid</div>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>Final</td>
//                       <td>total Payment</td>
//                       <td>₹3600</td>
//                       <td>
//                         <div className="btn btn-success btn-sm">Completed</div>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default UserDetails;







import React, { useState } from "react";
import "./UserDetails.css";
import { useLocation, useNavigate } from "react-router-dom";
import LeftBar from "../../../../components/global/sidebar/LeftBar";
import defaultUserImg from "../../../../assets/Images/defaultPorfileSVG.svg";
import Assignment from "../Assignment/Assignment";
import axios from "axios";
import { toast } from "react-toastify";

const apiBaseUrl = process.env.REACT_APP_BASE_API;

const UserDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user: initialUser } = location.state;

  const [user, setUser] = useState(initialUser); // State to manage user data
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [isOpenAssignment, setIsOpenAssignment] = useState(false);

  const formattedDob = new Date(user.dob).toISOString().split("T")[0];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Save updated user data
  const handleSave = async () => {
    try {
      const res = await axios.put(`${apiBaseUrl}/api/users/${user._id}`, user);
      toast.success("User updated successfully");
      setIsEditing(false); // Exit edit mode after saving
    } catch (err) {
      toast.error("Failed to update user");
      console.error("Failed to update user:", err);
    }
  };

  // Handle back button click
  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <>
      <div className="courses-page h-100 min-vh-100">
        <LeftBar />
        <div className="w-100 container p-3 h-100 min-dvh-100 position-relative">
          <h3>User Details</h3>
          <div className="w-100 h-100 d-flex">
            {isOpenAssignment && (
              <Assignment setIsOpenAssignment={setIsOpenAssignment} />
            )}
          </div>
          <div className="d-flex h-100 min-dvh-100 flex-column-reverse flex-lg-row justify-content-between gap-3">
            <div className="left w-100 h-100 gap-3 d-flex flex-column justify-content-between align-items-start">
              {/* Back Button */}
              <button className="btn btn-secondary mb-3" onClick={handleBack}>
                Back
              </button>

              {/* Editable Fields */}
              <div className="input-form">
                First Name:
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  value={user.firstName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="input-form">
                Last Name:
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  value={user.lastName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="input-form">
                User Name:
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  value={user.username}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="input-form">
                User Email:
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={user.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="input-form">
                Date of Birth:
                <input
                  type="date"
                  name="dob"
                  className="form-control"
                  value={formattedDob}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="input-form">
                Gender:
                <input
                  type="text"
                  name="gender"
                  className="form-control"
                  value={user.gender}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="input-form">
                Educational Qualification:
                <input
                  type="text"
                  name="educationalQualification"
                  className="form-control"
                  value={user.educationalQualification}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="input-form">
                Mobile No:
                <input
                  type="number"
                  name="mobileNo"
                  className="form-control"
                  value={user.mobileNo}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="input-form">
                Degree Name:
                <input
                  type="text"
                  name="degreeName"
                  className="form-control"
                  value={user.degreeName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="input-form">
                Present Address:
                <input
                  type="text"
                  name="presentAddress"
                  className="form-control"
                  value={user.presentAddress}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="input-form">
                Ministry Experience:
                <input
                  type="text"
                  name="ministryExperience"
                  className="form-control"
                  value={user.ministryExperience}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="input-form">
                Theological Qualification:
                <input
                  type="text"
                  name="theologicalQualification"
                  className="form-control"
                  value={user.theologicalQualification}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              {/* New Field: Apply For */}
              {/* <div className="input-form">
                Apply For:
                <input
                  type="text"
                  name="ApplyFor"
                  className="form-control"
                  value={user.ApplyFor}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div> */}
              <div className="input-form">
                Apply For:
                <select
                  name="ApplyFor"
                  className="form-control"
                  value={user.ApplyFor}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                >
                  <option value="">Select an option</option>
                  <option value="Option 1">Bachelor of edited 1</option>
                  <option value="Option 2">B.Th</option>
                  <option value="Option 3">B.Th Fast track</option>
                  <option value="Option 3">dsfd</option>

                  {/* Add more options as needed */}
                </select>
              </div>
              {/* Edit/Save Buttons */}
              <div className="d-flex gap-2">
                {isEditing ? (
                  <>
                    <button className="btn btn-success" onClick={handleSave}>
                      Save
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
            <div className="right w-100 d-flex flex-column justify-content-evenly align-items-end gap-2">
              <img
                src={user.passportPhotoFile || defaultUserImg}
                alt={user.username}
                height={170}
                width={150}
              />

              {/* Assignment degree mark */}
              <div className="w-100 fs-sm">
                <table className="table border-1 table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Semester</th>
                      <th scope="col">Assignment</th>
                      <th scope="col">Mark</th>
                      <th scope="col">status</th>
                    </tr>
                  </thead>
                  <tbody className="table-white">
                    <tr>
                      <td>1</td>
                      <td>Semester</td>
                      <td>
                        <button
                          className="btn btn-light btn-sm"
                          onClick={() => setIsOpenAssignment(true)}
                        >
                          View
                        </button>
                      </td>
                      <td>10</td>
                      <td>
                        <div className="btn btn-danger btn-sm">process</div>
                      </td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>Semester</td>
                      <td>
                        <div className="btn btn-light btn-sm">View</div>
                      </td>
                      <td>10</td>
                      <td>
                        <div className="btn btn-danger btn-sm">process</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Payment */}
              <div className="w-100 border-1 rounded-1 border-dark">
                <table className="table border-1 border-dark rounded-1 table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody className="table-white">
                    <tr>
                      <td>1</td>
                      <td>Initial Payment</td>
                      <td>₹1200</td>
                      <td>
                        <div className="btn btn-success btn-sm">Paid</div>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>month 2</td>
                      <td>₹1200</td>
                      <td>
                        <div className="btn btn-success btn-sm">Paid</div>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>month 3</td>
                      <td>₹1200</td>
                      <td>
                        <div className="btn btn-success btn-sm">Paid</div>
                      </td>
                    </tr>
                    <tr>
                      <td>Final</td>
                      <td>total Payment</td>
                      <td>₹3600</td>
                      <td>
                        <div className="btn btn-success btn-sm">Completed</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
