import React, { useEffect, useState } from "react";
import Nolesson from "../../../assets/Images/no-lesson-illustration.svg";
import { useNavigate } from "react-router-dom";
import ChapterPopUp from "../../../components/degrees/ChapterPopUp";
import { addDegree } from "../../../firebase/degreeApi";
import { toast } from "react-toastify";

const NewCourse = () => {
  const [popupOpen, setPopupOpen] = useState({ open: false, data: null });
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    courseId: "",
    courseTitle: "",
    description: "",
    thumbnail: null,
    price: null,
    chapters: [],
    overviewPoints: [],
  });

  useEffect(() => {
    if (popupOpen.open) window.scrollTo(0, 0);
  }, [popupOpen]);

  const handleDirectInput = (type, value) => {
    setCourseData({ ...courseData, [type]: value });
  };

  const handleDeleteChapter = (chapterIndex) => {
    const newChapters = [...courseData.chapters];
    newChapters.splice(chapterIndex, 1);
    setCourseData({ ...courseData, chapters: newChapters });
  };

  const addLessonToChapter = (lesson) => {
    const newChapters = [...courseData.chapters];
    if (lesson.updateIndex === null) {
      newChapters.push({ ...lesson, updateIndex: newChapters.length });
    } else {
      newChapters[lesson.updateIndex] = lesson;
    }
    setCourseData({ ...courseData, chapters: newChapters });
    setPopupOpen({ open: false });
  };

  const addOverviewPoint = () => {
    setCourseData((prevData) => ({
      ...prevData,
      overviewPoints: [...prevData.overviewPoints, { heading: "", description: "" }],
    }));
  };

  const updateOverviewPoint = (index, field, value) => {
    setCourseData((prevData) => {
      const updatedPoints = [...prevData.overviewPoints];
      updatedPoints[index] = { ...updatedPoints[index], [field]: value };
      return { ...prevData, overviewPoints: updatedPoints };
    });
  };

  const uploadCourse = async () => {
    if (courseData.courseId && courseData.courseTitle && courseData.price && courseData.description) {
      const response = await toast.promise(addDegree(courseData), {
        pending: "Adding course...",
        success: "Course added successfully!",
        error: "An error occurred while adding the course.",
      });
      if (response) navigate("/admin");
    } else {
      toast.error("Please fill in all required fields.");
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
        rows="2"
        value={point.description}
        onChange={(e) => updateOverviewPoint(index, "description", e.target.value)}
      />
    </div>
  );

  return (
    <div className="container mt-4">
      <div className=" card shadow p-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold">Create New Course</h3>
          <p className="">Create a new course and publish it!</p>
        </div>
        <div>
          <button className="btn btn-danger me-2" onClick={() => navigate("/")}>
            <i className="bi bi-x-circle"></i> Cancel
          </button>
          <button className="btn btn-primary" onClick={uploadCourse}>
            <i className="bi bi-check-circle"></i> Save Course
          </button>
        </div>
      </div>

      <div className="row">
        {/* Left Form */}
        <div className="col-md-6 mb-4">
          <div className="mb-3">
            <label className="form-label w-100 fw-bold">Course ID</label>
            <input
              type="text"
              className="form-control"
              value={courseData.courseId}
              onChange={(e) => handleDirectInput("courseId", e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label w-100 fw-bold">Course Title</label>
            <input
              type="text"
              className="form-control"
              value={courseData.courseTitle}
              onChange={(e) => handleDirectInput("courseTitle", e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label w-100 fw-bold">Description</label>
            <textarea
              className="form-control"
              rows="4"
              value={courseData.description}
              onChange={(e) => handleDirectInput("description", e.target.value)}
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label w-100 fw-bold">Price</label>
            <input
              type="number"
              className="form-control"
              placeholder="₹"
              value={courseData.price || ""}
              onChange={(e) => handleDirectInput("price", e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label w-100 fw-bold">Thumbnail</label>
            <input
              type="file"
              className="form-control"
              accept="image/png, image/svg+xml"
              onChange={(e) =>
                setCourseData({ ...courseData, thumbnail: e.target.files[0] })
              }
            />
          </div>

          <div className="mt-4">
            <h4 className="fw-bold">Overview Points</h4>
            {courseData.overviewPoints.map((point, index) => (
              <OverviewPoint key={index} index={index} point={point} />
            ))}
            <button className="btn btn-outline-primary mt-2" onClick={addOverviewPoint}>
              <i className="bi bi-plus-circle"></i> Add Overview Point
            </button>
          </div>
        </div>

        {/* Right - Chapters Section */}
        <div className="col-md-6">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold">Chapter List</h4>
            <button
              className="btn btn-outline-primary"
              onClick={() => setPopupOpen({ open: true, data: null })}
            >
              <i className="bi bi-plus-circle"></i> Add Chapter
            </button>
          </div>

          <div>
            {courseData.chapters.length > 0 ? (
              courseData.chapters.map((chapter, index) => (
                <div
                  key={index}
                  className="border p-2 mb-2 rounded d-flex justify-content-between"
                >
                  <div>
                    <h6 className="mb-1">{`Chapter ${index + 1}: ${chapter?.name}`}</h6>
                  </div>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDeleteChapter(index)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center">
                <img src={Nolesson} alt="No chapters" width={350} />
                <p>No chapters added yet.</p>
              </div>
            )}
          </div>

          
        </div>
      </div>

      {popupOpen.open && (
        <ChapterPopUp
          addCourse={(chapter) => addLessonToChapter(chapter)}
          editData={popupOpen?.data}
          cancel={() => setPopupOpen({ open: false, data: null })}
        />
      )}
    </div>
    </div>
  );
};

export default NewCourse;
