import React, { useEffect, useState } from "react";
import Nolesson from "../../../assets/Images/no-lesson-illustration.svg";
import { useNavigate } from "react-router-dom";
import NewChapter from "../../chapter/NewChapter";
// import { addDegree } from "../../../firebase/degreeApi"; // Firebase API integration for adding a degree
import { toast } from "react-toastify";
import NewCourse from '../../courses/new-course/NewCourse'
import axios from "axios";
import AddnewCourse from "../../courses/new-course/AddnewCourse";
const apiBaseUrl = process.env.REACT_APP_BASE_API;

const NewDegree = () => {
  const [popupOpen, setPopupOpen] = useState({ open: false, data: null });

  // const addnewDegree = async(courseData) => {
  //   return await axios.post("/api/degree/", courseData);
  // };

  // const addnewDegree = async (degreeData) => {
  //   try {
  //     const response = await axios.post(`${apiBaseUrl}/api/degree`, degreeData);
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error adding degree:", error);
  //     throw error;
  //   }
  // };

  const navigate = useNavigate();
  const [degreeData, setDegreeData] = useState({
    name: "",
    description: "",
    price: null,
    thumbnail: null,
    courses: [],
  });

  useEffect(() => {
    if (popupOpen) window.scrollTo(0, 0);
  }, [popupOpen]);

  const handledirectInput = (type, value) => {
    setDegreeData({ ...degreeData, [type]: value });
  };

  const handleDeleteCourse = (courseIndex) => {
    const newCourses = [...degreeData.courses];
    newCourses.splice(courseIndex, 1);
    setDegreeData({ ...degreeData, courses: newCourses });
  };

  const addCoursetoDegree = (course) => {
    console.log(course);
    const newCourses = [...degreeData.courses];
    if (course.updateIndex === null) {
      newCourses.push({
        ...course,
        updateIndex: newCourses?.length > 0 ? newCourses?.length : 0,
      });
      setDegreeData({ ...degreeData, courses: newCourses });
    } else {
      newCourses[course.updateIndex] = course;
      setDegreeData({ ...degreeData, courses: newCourses });
    }
    setPopupOpen({ open: false });
  };

  // const uploadDegree = async () => {
  //   if (degreeData.name && degreeData.price && degreeData.description) {
  //     const response = await toast.promise(addnewDegree(degreeData), {
  //       pending: "Adding degree...",
  //       success: "Degree added successfully!",
  //       error: "An error occurred while adding the new degree.",
  //     });
  //     console.log(response);
  //     if (response) navigate("/admin");
  //   } else {
  //     toast.error("Please fill in all degree details, including at least one course.");
  //   }
  // };
  const uploadDegree = async () => {
    if (degreeData.name && degreeData.price && degreeData.description) {
      const response = await toast.promise(
        axios.post(`${apiBaseUrl}/api/degrees`, degreeData),
        {
          pending: "Adding degree...",
          success: "Degree added successfully!",
          error: "An error occurred while adding the new degree.",
        }
      );
      console.log(response);
      if (response) navigate("/admin");
    } else {
      toast.error(
        "Please fill in all degree details, including at least one course."
      );
    }
  };

  console.log(degreeData);

  return (
    <div
      className="course-list-cnt new-course"
      style={{
        overflow: popupOpen.open ? "hidden" : "scroll",
      }}
    >
      <div className="top-header-cnt">
        <div>
          <h3 className="course-new-title">Create New Degree</h3>
          <p className="course-new-discription">
            Create a new degree and let's publish!
          </p>
        </div>
        <div className="top-btn-cnt">
          <div className="course-delete-btn" onClick={() => navigate("/")}>
            Cancel
          </div>
          <div className="add-new-lesson-btn" onClick={uploadDegree}>
            Save Degree
          </div>
        </div>
      </div>
      <div className="input-split-cover">
        <form className="left-form">
          <div className="course-name-cnt">
            <p>Enter degree Name</p>
            <input
              type="text"
              value={degreeData.name}
              className="name-input"
              onChange={(e) => handledirectInput("name", e.target.value)}
            />
          </div>

          <div className="course-name-cnt">
            <p>Enter degree Description</p>
            <textarea
              value={degreeData.description}
              className="name-input"
              rows="4"
              placeholder="Enter degree description here..."
              onChange={(e) => handledirectInput("description", e.target.value)}
            />
          </div>

          <div className="flex-input">
            <div className="course-name-cnt">
              <p>Enter degree price</p>
              <input
                type="number"
                value={degreeData.price !== null ? degreeData.price : ""}
                className="name-input price-input"
                placeholder="₹"
                onChange={(e) => handledirectInput("price", e.target.value)}
              />
            </div>
          </div>
          <div className="course-name-cnt">
            <p>Upload degree thumbnail</p>
            <input
              type="file"
              accept="image/png, image/svg+xml"
              onChange={(e) =>
                setDegreeData({ ...degreeData, thumbnail: e.target.files[0] })
              }
              className="styled-input"
            />
          </div>
        </form>
        <form className="form-right">
          <div className="form-right-header">
            <h3 className="course-new-title form-right-heading">Course List</h3>
            <div
              className="add-new-lesson-btn"
              onClick={() => setPopupOpen({ open: true, data: null })}
            >
              Add new course
            </div>
          </div>

          <div className="lesson-list-cnt">
            {degreeData.courses?.length > 0 ? (
              degreeData.courses.map((course, index) => (
                <div
                  key={index}
                  className="lesson"
                  onClick={() => setPopupOpen({ open: true, data: course })}
                >
                  <h1 className="lesson-number">{index + 1}</h1>
                  <div className="lesson-title-cnt">
                    <h3 className="lesson-title">{course?.title}</h3>
                  </div>
                  {/* <ul className="lesson-subtitle-cnt">
                    {course?.lessons?.map((sublesson, idx) => (
                      <li key={idx}>
                        <p className="lesson-subtitle">{sublesson?.name}</p>
                      </li>
                    ))}
                  </ul> */}
                  <ul className="lesson-subtitle-cnt">
                    {course?.chapters?.map((chapter, idx) => (
                      <li key={idx}>
                        <p className="lesson-subtitle">{chapter?.title}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <div className="no-lesson-cnt">
                <img
                  src={Nolesson}
                  alt="no-lesson"
                  className="empty-lesson-img"
                />
              </div>
            )}
          </div>
        </form>
      </div>
      {popupOpen.open && (
        // <NewChapter
        //   addCourse={(course) => addLessontoCourse(course)}
        //   editData={popupOpen?.data}
        //   cancel={() => setPopupOpen({ open: false, data: null })}
        //   removeThisCourse={(index) => handleDeleteCourse(index)}
        // />
        <NewCourse
          addDegree={addCoursetoDegree}
          editData={popupOpen?.data}
          cancel={() => setPopupOpen({ open: false, data: null })}
          removeThisCourse={(index) => handleDeleteCourse(index)}
        />
      )}
    </div>
  );
};

export default NewDegree;
