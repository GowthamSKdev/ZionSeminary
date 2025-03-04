import "./Profile.css";
import { useState, useEffect } from "react";
// import profileImage from "../Assets/Images/profileImage.jpeg";
// import profileBanner from "../Assets/Images/profileBanner.jpg";
import phoneSVG from "../Assets/SVG/phoneSVG.svg";
import mailSVG from "../Assets/SVG/mailSVG.svg";
import axios from "axios";
// import LoadingPage from "../LoadingPage/LoadingPage";
// import ErrorDataFetchOverlay from "../Error/ErrorDataFetchOverlay";
// import { fetchUserData } from "../../../api/baseapi";
import defaultPorfileSVG from "../Assets/SVG/defaultPorfileSVG.svg";
import defaultBannerSVG from "../Assets/SVG/defaultBannerSVG.svg";
import { useNavigate } from "react-router-dom";
// import { User } from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: "Default name",
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
  const user = JSON.parse(localStorage.getItem("userdata"));
  useEffect(() => {
    if (localStorage.getItem("userdata") != null) {
      const user = JSON.parse(localStorage.getItem("userdata"));
      console.log(user);
      setProfileData({
        name: `${user.firstName} ${user.lastName}`,
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
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);


  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("emergencyContact.")) {
      const field = name.split(".")[1];
      setProfileData((prevData) => ({
        ...prevData,
        emergencyContact: {
          ...prevData.emergencyContact,
          [field]: value,
        },
      }));
    } else {
      setProfileData({
        ...profileData,
        [name]: value,
      });
    }
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    const formData = new FormData();

    for (const key in profileData) {
      if (key === "emergencyContact") {
        const emergencyContact = profileData[key];
        for (const field in emergencyContact) {
          formData.append(`emergencyContact.${field}`, emergencyContact[field]);
        }
      } else {
        formData.append(key, profileData[key]);
      }
    }
    if (selectedProfileImage) {
      formData.append("profilePhotoFile", selectedProfileImage);
    }
    if (selectedProfileBanner) {
      formData.append("profileBanner", selectedProfileBanner);
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

      localStorage.setItem(
        "userDataUpdated",
        JSON.stringify(response.data.user)
      );

      if (response.status !== 200) {
        console.error("Error updating profile:", response.data);
      }
    } catch (error) {
      console.error("Network error updating profile:", error);
    }
  };

  const handleProfileImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedProfileImage(file);
      setProfileData((prevData) => ({
        ...prevData,
        passportPhotoFile: e.target.result,
      }));
    }
  };

  const handleProfileBannerChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedProfileBanner(file);
      setProfileData((prevData) => ({
        ...prevData,
        profileBanner: e.target.result,
      }));
    }
  };
  const inputClassName = (value) => {
    if (value === "" || value === null || value === undefined) {
      return "error-border";
    }
    return "";
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
            <div className="profileName">{profileData?.name}</div>
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
          <div
            className={`${inputClassName(profileData?.name)} profileDetails`}
          >
            <label>Name</label>
            <input
              type="Name"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div
            className={`${inputClassName(profileData.gender)} profileDetails`}
          >
            {" "}
            <label>Gender</label>
            <input
              type="text"
              name="gender"
              value={profileData?.gender}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div
            className={`${inputClassName(profileData.address)} profileDetails`}
          >
            <label>Address</label>
            <textarea
              type="text"
              name="address"
              value={profileData?.address}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="profileSeperator"></div>
          <div className="hh5">Contact Details</div>
          <div
            className={`${inputClassName(
              profileData.email
            )} profileDetails profileSPLBox`}
          >
            <img src={phoneSVG} alt="phoneNumberSVG" />
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={profileData?.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div
            className={`${inputClassName(
              profileData.phoneNumber
            )} profileDetails profileSPLBox`}
          >
            <img src={mailSVG} alt="mailSVG" />
            <label>Phone Number</label>
            <input
              type="number"
              name="phoneNumber"
              value={profileData?.phoneNumber}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className="profileSection">
          <div className="hh5">Other Informations</div>
          <div
            className={`${inputClassName(
              profileData.educationalQualification
            )} profileDetails`}
          >
            <label>Education Qualification</label>
            <input
              type="text"
              name="companyname"
              value={profileData?.educationalQualification}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div
            className={`${inputClassName(
              profileData.maritalStatus
            )} profileDetails`}
          >
            <label>Marital Status</label>
            <input
              type="text"
              name="position"
              value={profileData?.maritalStatus}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className={`${inputClassName(profileData.dob)} profileDetails`}>
            <label>Date of Birth</label>
            <input
              type="text"
              name="DOB"
              value={profileData?.dob}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div
            className={`${inputClassName(
              profileData.ministryExperience
            )} profileDetails`}
          >
            <label>Ministry Experience</label>
            <textarea
              name="bio"
              value={profileData?.ministryExperience}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div
            className={`${inputClassName(
              profileData.theologicalQualification
            )} profileDetails`}
          >
            <label>Theological Qualification</label>
            <textarea
              name="bio"
              value={profileData?.theologicalQualification}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div
            className={`${inputClassName(
              profileData.salvationExperience
            )} profileDetails`}
          >
            <label>Salvation Experience</label>
            <textarea
              name="bio"
              value={profileData?.salvationExperience}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div
            className={`${inputClassName(
              profileData.signatureFile
            )} profileDetails`}
          >
            <label>signatureFile</label>
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
                    onChange={(e)=>setProfileData({...profileData, signatureFile:e.target.files[0]})}
                    className="imageBannerUpload"
                  />
                  Choose File for Signature
                </label>
              )}
            </div>
          </div>
          <div
            className={`${inputClassName(
              profileData.educationCertFile
            )} profileDetails`}
          >
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
                    onChange={(e)=>setProfileData({...profileData, educationCertFile:e.target.files[0]})}
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
