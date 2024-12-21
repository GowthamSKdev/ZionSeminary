import React, { useEffect, useState } from "react";
import Nolesson from "../../../assets/Images/no-lesson-illustration.svg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { addDegree } from "../../../firebase/degreeApi";
import { toast } from "react-toastify";

// Bootstrap Icons
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const NewDegree = () => {
  const [popupOpen, setPopupOpen] = useState({ open: false, data: null });
  const navigate = useNavigate();

  const [degreeData, setDegreeData] = useState({
    degreeId: "",
    degreeTitle: "",
    description: "",
    thumbnail: null,
    overviewPoints: [],
    courses: [],
  });

  useEffect(() => {
    if (popupOpen) window.scrollTo(0, 0);
  }, [popupOpen]);

  const handleDirectInput = (type, value) => {
    setDegreeData((prevData) => ({ ...prevData, [type]: value }));
  };

  const handleDeleteCourse = (courseIndex) => {
    setDegreeData((prevData) => {
      const newCourses = [...prevData.courses];
      newCourses.splice(courseIndex, 1);
      return { ...prevData, courses: newCourses };
    });
  };

  const addLessonToCourse = (lesson) => {
    setDegreeData((prevData) => {
      const newCourses = [...prevData.courses];
      if (lesson.updateIndex === null) {
        newCourses.push({ ...lesson, updateIndex: newCourses.length });
      } else {
        newCourses[lesson.updateIndex] = lesson;
      }
      return { ...prevData, courses: newCourses };
    });
    setPopupOpen({ open: false });
  };

  const addOverviewPoint = () => {
    setDegreeData((prevData) => ({
      ...prevData,
      overviewPoints: [
        ...prevData.overviewPoints,
        { heading: "", description: "" },
      ],
    }));
  };

  const updateOverviewPoint = (index, field, value) => {
    setDegreeData((prevData) => {
      const updatedPoints = [...prevData.overviewPoints];
      updatedPoints[index] = { ...updatedPoints[index], [field]: value };
      return { ...prevData, overviewPoints: updatedPoints };
    });
  };

  const uploadDegree = async () => {
    if (
      degreeData.degreeId &&
      degreeData.degreeTitle &&
      degreeData.description &&
      degreeData.courses.length > 0
    ) {
      const response = await toast.promise(addDegree(degreeData), {
        pending: "Adding degree...",
        success: "Degree added successfully!",
        error: "An error occurred while adding the new degree.",
      });
      if (response) navigate("/admin");
    } else {
      toast.error("Please fill in all degree details, including at least one course.");
    }
  };

  const OverviewPoint = ({ index, point }) => (
    <div className="overview-point mb-2">
      <input
        type="text"
        className="form-control mb-1"
        placeholder="Heading"
        value={point.heading}
        onChange={(e) => updateOverviewPoint(index, "heading", e.target.value)}
      />
      <textarea
        placeholder="Description"
        className="form-control"
        value={point.description}
        rows="2"
        onChange={(e) => updateOverviewPoint(index, "description", e.target.value)}
      />
    </div>
  );

  const CourseCard = ({ course, index }) => (
    <div
      className="lesson border p-3 mb-2"
      onClick={() => setPopupOpen({ open: true, data: course })}
    >
      <h4 className="lesson-number">{index + 1}</h4>
      <h5 className="lesson-title">{course?.name}</h5>
      <ul>
        {course?.lessons?.map((sublesson, idx) => (
          <li key={idx}>{sublesson?.name}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="container mt-4" style={{ overflow: popupOpen.open ? "hidden" : "scroll" }}>
            <div className=" card shadow p-4">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h3 className="fw-bold">Create New Degree</h3>
          <p>Fill in the details and create a degree</p>
        </div>
        <div>
          <button className="btn btn-danger me-2" onClick={() => navigate("/")}>
            <i className="bi bi-x-circle"></i> Cancel
          </button>
          <button className="btn btn-primary" onClick={uploadDegree}>
            <i className="bi bi-save"></i> Save Degree
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label w-100 fw-bold">Degree ID</label>
            <input
              type="text"
              value={degreeData.degreeId}
              className="form-control"
              onChange={(e) => handleDirectInput("degreeId", e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label w-100 fw-bold">Degree Title</label>
            <input
              type="text"
              value={degreeData.degreeTitle}
              className="form-control"
              onChange={(e) => handleDirectInput("degreeTitle", e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label w-100 fw-bold">Degree Description</label>
            <textarea
              value={degreeData.description}
              className="form-control"
              rows="4"
              placeholder="Enter degree description here..."
              onChange={(e) => handleDirectInput("description", e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label w-100 fw-bold">Upload Degree Thumbnail</label>
            <input
              type="file"
              accept="image/png, image/svg+xml"
              onChange={(e) =>
                setDegreeData((prevData) => ({
                  ...prevData,
                  thumbnail: e.target.files[0],
                }))
              }
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label w-100 fw-bold">Overview Points</label>
            {degreeData.overviewPoints.map((point, index) => (
              <OverviewPoint key={index} index={index} point={point} />
            ))}
            <button className="btn btn-outline-primary" onClick={addOverviewPoint}>
              <i className="bi bi-plus-circle"></i> Add Overview Point
            </button>
          </div>
        </div>

        <div className="col-md-6">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold">Courses List</h4>
            <Link to="/admin/courses/new" className="btn btn-outline-primary mb-2">
              <i className="bi bi-plus-circle"></i> Add New Course
            </Link>
          </div>
          <div>
            {degreeData.courses?.length > 0 ? (
              degreeData.courses.map((course, index) => (
                <CourseCard key={index} course={course} index={index} />
              ))
            ) : (
              <div className="text-center">
              <img
                src={Nolesson}
                alt="no-lesson"
                className="img-fluid"
                width={350}
              />
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default NewDegree;
