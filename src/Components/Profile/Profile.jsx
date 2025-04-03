import "./Profile.css";
import { useState, useEffect } from "react";
import phoneSVG from "../Assets/SVG/phoneSVG.svg";
import mailSVG from "../Assets/SVG/mailSVG.svg";
import axios from "axios";
import defaultPorfileSVG from "../Assets/SVG/defaultPorfileSVG.svg";
import defaultBannerSVG from "../Assets/SVG/defaultBannerSVG.svg";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    username: "Default username",
    firstName: "Default firstName",
    lastName: "Default lastName",
    email: "Default email",
    phoneNumber: "Default phoneNumber",
    gender: "Default gender",
    profilePic: defaultPorfileSVG,
    profileBanner: defaultBannerSVG,
    address: "Default address",
    educationalQualification: "Default educational Qualification",
    maritalStatus: "Default marital Status",
    dob: "default dob",
    ministryExperience: "default ministry Experience",
    theologicalQualification: "default theological Qualification",
    salvationExperience: "default salvation Experience",
  });
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [selectedProfileBanner, setSelectedProfileBanner] = useState(null);
  const [selectedSignatureFile, setSelectedSignatureFile] = useState(null);
  const [selectedEducationCertFile, setSelectedEducationCertFile] =
    useState(null);
  const [errors, setErrors] = useState({});
  const user = JSON.parse(localStorage.getItem("userdata"));

  useEffect(() => {
    if (localStorage.getItem("userdata") != null) {
      const user = JSON.parse(localStorage.getItem("userdata"));
      console.log(user);
      setProfileData({
        username: `${user.firstName} ${user.lastName}`,
        firstName: user.firstName,
        lastName: user.lastName,

        email: user.email,
        phoneNumber: user.mobileNo,
        gender: user.gender,
        passportPhotoFile: user.passportPhotoFile
          ? user.passportPhotoFile
          : defaultPorfileSVG,
        profileBanner: user.profileBanner
          ? user.profileBanner
          : defaultBannerSVG,
        address: user.presentAddress,
        educationalQualification: user.educationalQualification,
        maritalStatus: user.maritalStatus,
        dob: user.dob,
        ministryExperience: user.ministryExperience,
        theologicalQualification: user.theologicalQualification,
        salvationExperience: user.salvationExperience,
        signatureFile: user.signatureFile,
        educationCertFile: user.educationCertFile,
      });
    } else {
      navigate("/login");
    }
  }, []);

  console.log(profileData);

  // Validation functions
  const validateName = (value) => {
    return /^[A-Za-z\s]+$/.test(value);
  };

  const validateNumber = (value) => {
    return /^\d+$/.test(value);
  };

  const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  // const validateDateOfBirth = (value) => {
  //   return /^\d{2}-\d{2}-\d{4}$/.test(value);
  // };

  const validateEducationalQualification = (value) => {
    return /^[A-Za-z\s]+$/.test(value);
  };

  const validateGender = (value) => {
    return /^[A-Za-z\s]+$/.test(value);
  };

  const validateMaritalStatus = (value) => {
    return /^[A-Za-z\s]+$/.test(value);
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!profileData.firstName) newErrors.firstName = "First name is required";
    else if (!validateName(profileData.firstName))
      newErrors.firstName = "First name can only contain letters and spaces";

    if (!profileData.lastName) newErrors.lastName = "Last name is required";
    else if (!validateName(profileData.lastName))
      newErrors.lastName = "Last name can only contain letters and spaces";

    if (!profileData.username) newErrors.seurname = "user name is required";
    else if (!validateName(profileData.username))
      newErrors.username = "user name can only contain letters and spaces";

    // if (!profileData.name) newErrors.name = "Name is required";
    // else if (!validateName(profileData.name))
    //   newErrors.name = "Name can only contain letters and spaces";

    if (!profileData.email) newErrors.email = "Email is required";
    else if (!validateEmail(profileData.email))
      newErrors.email = "Please enter a valid email address";

    if (!profileData.phoneNumber)
      newErrors.phoneNumber = "Phone number is required";
    else if (!validateNumber(profileData.phoneNumber))
      newErrors.phoneNumber = "Phone number can only contain numbers";

    if (!profileData.gender) newErrors.gender = "Gender is required";
    else if (!validateGender(profileData.gender))
      newErrors.gender = "Gender can only contain letters and spaces";

    if (!profileData.address) newErrors.address = "Address is required";

    if (!profileData.educationalQualification)
      newErrors.educationalQualification =
        "Educational qualification is required";
    else if (
      !validateEducationalQualification(profileData.educationalQualification)
    )
      newErrors.educationalQualification =
        "Educational qualification can only contain letters and spaces";

    if (!profileData.maritalStatus)
      newErrors.maritalStatus = "Marital status is required";
    else if (!validateMaritalStatus(profileData.maritalStatus))
      newErrors.maritalStatus =
        "Marital status can only contain letters and spaces";

    // if (!profileData.dob) newErrors.dob = "Date of birth is required";
    // else if (!validateDateOfBirth(profileData.dob))
    //   newErrors.dob = "Date of birth must be in the format YYYY-MM-DD";

    if (!profileData.ministryExperience)
      newErrors.ministryExperience = "Ministry experience is required";
    if (!profileData.theologicalQualification)
      newErrors.theologicalQualification =
        "Theological qualification is required";
    if (!profileData.salvationExperience)
      newErrors.salvationExperience = "Salvation experience is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Handle edit/save click
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate input based on field name
    if (name === "firstName" && !validateName(value)) return;
    if (name === "username" && !validateName(value)) return;

    if (name === "lastName" && !validateName(value)) return;
    if (name === "phoneNumber" && !validateNumber(value)) return;
    if (name === "gender" && !validateGender(value)) return;
    if (name === "maritalStatus" && !validateMaritalStatus(value)) return;
    if (
      name === "educationalQualification" &&
      !validateEducationalQualification(value)
    )
      return;
    // if (name === "dob" && !validateDateOfBirth(value)) return;

    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  // Handle save click
  const handleSaveClick = async () => {
    if (!validateForm()) return;

    setIsEditing(false);
    const formData = new FormData();

    for (const key in profileData) {
      if (key === "emergencyContact") {
        const emergencyContact = profileData[key];
        for (const field in emergencyContact) {
          formData.append(emergencyContact.$`{field}, emergencyContact[field]`);
        }
      } else {
        formData.append(key, profileData[key]);
      }
    }
    if (selectedProfileImage) {
      // formData.append("profilePhotoFile", selectedProfileImage);
      formData.append("passportPhotoFile", selectedProfileImage);
    }
    if (selectedProfileBanner) {
      formData.append("profileBanner", selectedProfileBanner);
    }
    if (selectedSignatureFile) {
      formData.append("signatureFile", selectedSignatureFile);
    }
    if (selectedEducationCertFile) {
      formData.append("educationCertFile", selectedEducationCertFile);
    }

    try {
      const apiBaseUrl = process.env.REACT_APP_BASE_API;

      const response = await axios.put(
        `${apiBaseUrl}/api/users/${user._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // localStorage.setItem(
      //   "userDataUpdated",
      //   JSON.stringify(response.data.user)
      // );
      localStorage.setItem("userdata", JSON.stringify(response.data.user));

      if (response.status !== 200) {
        console.error("Error updating profile:", response.data);
      }
    } catch (error) {
      console.error("Network error updating profile:", error);
    }
  };

  // Handle profile image change
  const handleProfileImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileData((prevData) => ({
        ...prevData,
        passportPhotoFile: URL.createObjectURL(file),
        // passportPhotoFile: file,
      }));
      setSelectedProfileImage(file);
    }
  };
  // const handleProfileImageChange = (e) => {

  //   const file = e.target.files[0];
  //   setProfileData((prevData) => ({
  //     ...prevData,
  //     passportPhotoFile: file,
  //   }));
  // };
  // Handle profile banner change
  const handleProfileBannerChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileData((prevData) => ({
        ...prevData,
        profileBanner: URL.createObjectURL(file),
        // profileBanner: file,
      }));
      setSelectedProfileBanner(file);
    }
  };

  const handleSignatureFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileData((prevData) => ({
        ...prevData,
        signatureFile: URL.createObjectURL(file),
      }));
      setSelectedSignatureFile(file);
    }
  };
  const handleEducationCertFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileData((prevData) => ({
        ...prevData,
        educationCertFile: URL.createObjectURL(file),
      }));
      setSelectedEducationCertFile(file);
    }
  };

  return (
    <div className="profileContainer">
      <div className="profileBannerBox">
        <div className="profileBGBox">
          <img
            src={
              profileData?.profileBanner
                ? profileData?.profileBanner
                : defaultBannerSVG
            }
            alt="Banner"
          />
          {isEditing && (
            <label className="custom-file-upload imageBanner">
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileBannerChange}
                className="imageBannerUpload"
              />
              Choose File for Profile Banner
            </label>
          )}
        </div>
        <div className="profileHeader">
          <div className="profileImage">
            <img
              src={
                profileData?.passportPhotoFile
                  ? profileData?.passportPhotoFile
                  : defaultPorfileSVG
              }
              alt="Profile"
              className="defaultImage"
            />
            {isEditing && (
              <label className="custom-file-upload">
                <input
                  name="passportPhotoFile"
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                  className="imageUpload"
                />
                Choose File
              </label>
            )}
          </div>
          <div className="profileHeaderInfo">
            <div className="profileName">{profileData?.username}</div>
            <div className="profileEmail">{profileData?.email}</div>
          </div>
          <div className="profileEditBtn">
            <button onClick={isEditing ? handleSaveClick : handleEditClick}>
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
        </div>
      </div>
      <div className="profileContent">
        <div className="profileSection">
          <div className="hh5">General Information</div>

          {/* new */}
          <div className="profileDetails">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={profileData.username}
              onChange={handleChange}
              disabled={!isEditing}
            />
            {errors.username && (
              <span className="error-message">{errors.username}</span>
            )}
          </div>
          <div className="profileDetails">
            <label>First Name</label>
            <div className="d-flex flex-column w-100 align-items-end">
              <input
                type="text"
                className="w-100"
                name="firstName"
                value={profileData.firstName}
                onChange={handleChange}
                disabled={!isEditing}
              />
              {errors.firstName && (
                <span className="error-message">{errors.firstName}</span>
              )}
            </div>
          </div>
          <div className="profileDetails">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={profileData.lastName}
              onChange={handleChange}
              disabled={!isEditing}
            />
            {errors.lastName && (
              <span className="error-message">{errors.lastName}</span>
            )}
          </div>

          <div className="profileDetails">
            <label>Gender</label>
            <select
              name="gender"
              value={profileData.gender}
              onChange={handleChange}
              disabled={!isEditing}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <span className="error-message">{errors.gender}</span>
            )}
          </div>

          <div className="profileDetails">
            <label>Address</label>
            <textarea
              name="address"
              value={profileData.address}
              onChange={handleChange}
              disabled={!isEditing}
            />
            {errors.address && (
              <span className="error-message">{errors.address}</span>
            )}
          </div>
          <div className="profileSeperator"></div>
          <div className="hh5">Contact Details</div>
          <div className="profileDetails profileSPLBox">
            <img src={phoneSVG} alt="phoneNumberSVG" />
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>
          <div className="profileDetails profileSPLBox">
            <img src={mailSVG} alt="mailSVG" />
            <label>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={profileData.phoneNumber}
              onChange={handleChange}
              disabled={!isEditing}
            />
            {errors.phoneNumber && (
              <span className="error-message">{errors.phoneNumber}</span>
            )}
          </div>
        </div>
        <div className="profileSection">
          <div className="hh5">Other Informations</div>
          <div className="profileDetails">
            <label>Education Qualification</label>
            <input
              type="text"
              name="educationalQualification"
              value={profileData.educationalQualification}
              onChange={handleChange}
              disabled={!isEditing}
            />
            {errors.educationalQualification && (
              <span className="error-message">
                {errors.educationalQualification}
              </span>
            )}
          </div>
          {/* <div className="profileDetails">
            <label>Marital Status</label>
            <input
              type="text"
              name="maritalStatus"
              value={profileData.maritalStatus}
              onChange={handleChange}
              disabled={!isEditing}
            />
            {errors.maritalStatus && (
              <span className="error-message">{errors.maritalStatus}</span>
            )}
          </div> */}

          <div className="profileDetails">
            <label>Marital Status</label>
            <select
              name="maritalStatus"
              value={profileData.maritalStatus || ""}
              onChange={handleChange}
              disabled={!isEditing}>
              <option value="">Select Marital Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
            {errors.maritalStatus && (
              <span className="error-message">{errors.maritalStatus}</span>
            )}
          </div>

          <div className="profileDetails ">
            <label>Date of Birth</label>
            <div className="d-flex flex-column align-items-end">
              <input
                type={!isEditing ? "text" : "date"}
                className="w-100"
                name="dob"
                value={profileData.dob ? profileData.dob.split("T")[0] : ""}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="YYYY-MM-DD"
              />
              {/* {errors.dob && (
                <span className="error-message text-sm-end fs-6">
                  {errors.dob}
                </span>
              )} */}
            </div>
          </div>
          <div className="profileDetails">
            <label>Ministry Experience</label>
            <textarea
              name="ministryExperience"
              value={profileData.ministryExperience}
              onChange={handleChange}
              disabled={!isEditing}
            />
            {errors.ministryExperience && (
              <span className="error-message">{errors.ministryExperience}</span>
            )}
          </div>
          <div className="profileDetails">
            <label>Theological Qualification</label>
            <textarea
              name="theologicalQualification"
              value={profileData.theologicalQualification}
              onChange={handleChange}
              disabled={!isEditing}
            />
            {errors.theologicalQualification && (
              <span className="error-message">
                {errors.theologicalQualification}
              </span>
            )}
          </div>
          <div className="profileDetails">
            <label>Salvation Experience</label>
            <textarea
              name="salvationExperience"
              value={profileData.salvationExperience}
              onChange={handleChange}
              disabled={!isEditing}
            />
            {errors.salvationExperience && (
              <span className="error-message">
                {errors.salvationExperience}
              </span>
            )}
          </div>
          <div className="profileDetails">
            <label>Signature File</label>
            <div className="profileBGBox">
              <img
                src={
                  profileData?.signatureFile
                    ? profileData?.signatureFile
                    : defaultBannerSVG
                }
                alt="Banner"
              />
              {isEditing && (
                <label className="custom-file-upload text-white imageBanner">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSignatureFileChange}
                    className="imageBannerUpload"
                  />
                  Choose File for Signature
                </label>
              )}
            </div>
          </div>
          <div className="profileDetails">
            <label>Education CertFile</label>
            <div className="profileBGBox">
              <img
                src={
                  profileData?.educationCertFile
                    ? profileData?.educationCertFile
                    : defaultBannerSVG
                }
                alt="Banner"
              />
              {isEditing && (
                <label className="custom-file-upload text-white imageBanner">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleEducationCertFileChange}
                    className="imageBannerUpload"
                  />
                  Choose File for Education file
                </label>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
