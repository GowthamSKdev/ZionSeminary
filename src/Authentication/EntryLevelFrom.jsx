import React, { useContext, useEffect, useState } from "react";
import "./Register.css";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import axios from "axios";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const apiBaseUrl = process.env.BASE_API;
const EntryLevelForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { userInfo } = useContext(UserContext);
  const [degrees, setdegrees] = useState([]);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDegrees = async () => {
      const { data } = await axios.get(`${apiBaseUrl}/api/degrees`);
      const { degrees } = data;
      console.log(degrees);

      setdegrees(degrees);
    };
    fetchDegrees();
  }, []);

  // const userData = JSON.parse(localStorage.getItem("loginUserdata"));
  // useEffect(() => {
  //   setUserId(userData.id)
  // }, [])
  // console.log(userId);

  // console.log(degrees, userInfo.id);
  // const userId = userInfo.id

  //  const onSubmit = async (data) => {
  //    try {
  //      // Append userId from context to the data
  //     //  const formData = { data, userId };

  //      // Sending the data to the API
  //      const response = await axios.post(
  //        "/api/users/profile", {

  //          data,
  //          headers: {
  //            "Content-Type": "multipart/formData",
  //          },
  //          userId,
  //          details:true
  //         }

  //      );

  //      // Assuming you want to handle success
  //      console.log("Profile updated successfully", response.data);
  //      navigate("/home"); // Redirecting to profile page after successful submission
  //    } catch (error) {
  //      console.error("Error updating profile:", error);
  //      // Handle the error appropriately
  //    }
  //  };
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userdata"));
    setUserId(userData.id);
    // if (userData) {
    //   // Optionally, set default values if needed
    //   // setValue("firstName", userData.firstName);
    //   // setValue("lastName", userData.lastName);
    //   // setValue("mobileNo", userData.mobileNo);
    // }
  }, []);

  // const onSubmit = async (data) => {
  //   console.log(data);
  //   const payload = {
  //     data,
  //     // formData,
  //     userId: userId,
  //     // details:true
  //   }

  //   try {
  //     const response = await axios.post(
  //       "/api/users/profile",
  //       // degreeId= ("applyingFor", data.applyingFor),
  //       // details = true,
  //       payload,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     console.log("Profile updated successfully", response.data);
  //     navigate("/home");
  //   } catch (error) {
  //     console.error("Error updating profile:", error);
  //   }
  // };

  const onSubmit = async (formData) => {
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      data.append("userId", userId.toString());
      // data.append('details',true)// Add userId explicitly

      const response = await axios.post(
        `${apiBaseUrl}/api/users/profile`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Profile updated successfully:", response.data);
      navigate("/home");
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response?.data || error.message
      );
      alert("Error updating profile. Please try again.");
    }
  };

  return (
    <div className="register min-vh-100 h-100 w-100 elf">
      <div className="register-container d-flex justify-content-center align-items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-100 d-flex justify-content-center align-items-center"
        >
          <div className="register-card d-flex flex-column flex-lg-row shadow-lg rounded w-100">
            {/* Left Column */}
            <div className="form-container d-flex flex-column w-100 px-4 py-4 bg-light">
              {/* First Name */}
              <div className="form-group mb-2">
                <label className="form-label fw-semibold">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter First Name"
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                />
                {errors.firstName && (
                  <p className="text-danger">{errors.firstName.message}</p>
                )}
              </div>

              {/* Last Name */}
              <div className="form-group mb-2">
                <label className="form-label fw-semibold">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Last Name"
                  {...register("lastName", {
                    required: "Last Name is required",
                  })}
                />
                {errors.lastName && (
                  <p className="text-danger">{errors.lastName.message}</p>
                )}
              </div>

              {/* Mobile Number */}
              <div className="form-group mb-2">
                <label className="form-label fw-semibold">Mobile Number</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Mobile Number"
                  {...register("mobileNo", {
                    required: "Mobile Number is required",
                  })}
                />
                {errors.mobileNo && (
                  <p className="text-danger">{errors.mobileNo.message}</p>
                )}
              </div>

              {/* Marital Status */}
              <div className="form-group mb-2">
                <label className="form-label fw-semibold">Marital Status</label>
                <select
                  className="form-select"
                  {...register("maritalStatus", {
                    required: "Marital Status is required",
                  })}
                >
                  <option value="">Select...</option>
                  <option value="Married">Married</option>
                  <option value="Unmarried">Unmarried</option>
                </select>
                {errors.maritalStatus && (
                  <p className="text-danger">{errors.maritalStatus.message}</p>
                )}
              </div>

              {/* Date of Birth */}
              <div className="form-group mb-2">
                <label className="form-label fw-semibold">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  {...register("dob", {
                    required: "Date of Birth is required",
                  })}
                />
                {errors.dob && (
                  <p className="text-danger">{errors.dob.message}</p>
                )}
              </div>

              {/* Gender */}
              <div className="form-group mb-2">
                <label className="form-label fw-semibold">Gender</label>
                <select
                  className="form-select"
                  {...register("gender", {
                    required: "Gender is required",
                  })}
                >
                  <option value="">Select...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-danger">{errors.gender.message}</p>
                )}
              </div>

              {/* Applying For */}
              <div className="form-group mb-2">
                <label className="form-label fw-semibold">Applying For</label>
                <select
                  className="form-select"
                  {...register("applyingFor", {
                    required: "Please select a degree",
                  })}
                >
                  {degrees.map((degree) => (
                    <option key={degree._id} value={degree._id}>
                      {degree.title}
                    </option>
                  ))}
                </select>
                {errors.applyingFor && (
                  <p className="text-danger">{errors.applyingFor.message}</p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="form-container d-flex flex-column w-100 px-4 py-4 bg-light">
              {/* Educational Qualification */}
              <div className="form-group mb-2">
                <label className="form-label fw-semibold">
                  Educational Qualification
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Qualification"
                  {...register("educationalQualification", {
                    required: "Educational Qualification is required",
                  })}
                />
                {errors.educationalQualification && (
                  <p className="text-danger">
                    {errors.educationalQualification.message}
                  </p>
                )}
              </div>

              {/* Theological Qualification */}
              <div className="form-group mb-2">
                <label className="form-label fw-semibold">
                  Theological Qualification
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Theological Qualification"
                  {...register("theologicalQualification", {
                    required: "Theological Qualification is required",
                  })}
                />
                {errors.theologicalQualification && (
                  <p className="text-danger">
                    {errors.theologicalQualification.message}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="form-group mb-2">
                <label className="form-label fw-semibold">
                  Present Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Address"
                  {...register("presentAddress", {
                    required: "Address is required",
                  })}
                />
                {errors.presentAddress && (
                  <p className="text-danger">{errors.presentAddress.message}</p>
                )}
              </div>

              {/* Ministry Experience */}
              <div className="form-group mb-2">
                <label className="form-label fw-semibold">
                  Ministry Experience
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Ministry Experience"
                  {...register("ministryExperience", {
                    required: "Ministry Experience is required",
                  })}
                />
                {errors.ministryExperience && (
                  <p className="text-danger">
                    {errors.ministryExperience.message}
                  </p>
                )}
              </div>

              {/* Salvation Experience */}
              <div className="form-group mb-2">
                <label className="form-label fw-semibold">
                  Salvation Experience
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Salvation Experience"
                  {...register("salvationExperience", {
                    required: "Salvation Experience is required",
                  })}
                />
                {errors.salvationExperience && (
                  <p className="text-danger">
                    {errors.salvationExperience.message}
                  </p>
                )}
              </div>

              {/* Files */}
              <div className="form-group mb-2">
                <label className="form-label fw-semibold">Signature File</label>
                <input
                  type="file"
                  className="form-control"
                  {...register("signatureFile", {
                    required: "Signature file is required",
                  })}
                />
                {errors.signatureFile && (
                  <p className="text-danger">{errors.signatureFile.message}</p>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label fw-semibold">
                  Passport Photo File
                </label>
                <input
                  type="file"
                  className="form-control"
                  {...register("passportPhotoFile", {
                    required: "Passport Photo is required",
                  })}
                />
                {errors.passportPhotoFile && (
                  <p className="text-danger">
                    {errors.passportPhotoFile.message}
                  </p>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label fw-semibold">
                  Education CertFile
                </label>
                <input
                  type="file"
                  className="form-control"
                  {...register("educationCertFile", {
                    required: "Passport Photo is required",
                  })}
                />
                {errors.educationCertFile && (
                  <p className="text-danger">
                    {errors.educationCertFile.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="mt-3">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EntryLevelForm;
