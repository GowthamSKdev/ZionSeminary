import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewLesson from "../new-degree/NewLesson";
import { deleteDegree, editDegree } from "../../../firebase/degreeApi";
import { toast } from "react-toastify";

const Edit = ({ courseDetails }) => {
  const [popupOpen, setPopupOpen] = useState({ open: false, data: null });
  const [editCourse, setEditCourse] = useState(false);
  const [currentOverview, setCurrentOverview] = useState({
    heading: "",
    content: "",
    updateIndex: null,
  });

  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    price: null,
    thumbnail: null,
    overviewPoints: [],
    lessons: [],
  });

  useEffect(() => {
    if (popupOpen) window.scrollTo(0, 0);
  }, [popupOpen]);

  useEffect(() => {
    setCourseData(courseDetails);
  }, [courseDetails]);

  const handledirectInput = (type, value) => {
    setCourseData({ ...courseData, [type]: value });
  };

  const addLessontoCourse = (lesson) => {
    const newCourse = [...courseData.courses];
    if (lesson.updateIndex === null) {
      newCourse.push({
        ...lesson,
        updateIndex: newCourse.length > 0 ? newCourse.length : 0,
      });
      setCourseData({ ...courseData, courses: newCourse });
    } else {
      newCourse[lesson.updateIndex] = lesson;
      setCourseData({ ...courseData, courses: newCourse });
    }
    setPopupOpen({ open: false });
  };

  const uploadCourse = async () => {
    if (courseData.name && courseData.courses.length > 0) {
      try {
        const res = await toast.promise(editDegree(courseDetails.id, courseData), {
          pending: "Updating course...",
          success: "Course updated successfully",
          error: "An error occurred while updating the course",
        });
        if (res) navigate("/admin");
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("This course is not valid. Add at least one lesson and fill in the details.");
    }
  };

  const deleteThisCourse = async () => {
    const confirm = window.confirm(
      "Confirm to delete this course. All lessons associated will be lost."
    );
    if (confirm) {
      try {
        const res = await toast.promise(deleteDegree(courseDetails.id), {
          pending: "Deleting course...",
          success: "Course deleted successfully",
          error: "An error occurred while deleting the course",
        });
        if (res) navigate("/admin");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const openEditLesson = (lesson, index) => {
    lesson.updateIndex = index;
    setPopupOpen({ open: true, data: lesson });
  };

  return (
    <div
      className="course-list-cnt new-course"
      style={{
        overflow: popupOpen ? "hidden" : "scroll",
      }}
    >
      {/* Top Navigation */}
      <div className="top-header-cnt d-flex justify-content-between align-items-center">
        <div className="back-btn" onClick={() => navigate("/")}>
          <i className="bi bi-arrow-left-circle fs-3 text-primary" title="Back"></i>
        </div>
        <div className="top-btn-cnt d-flex gap-2">
          {editCourse ? (
            <>
              <button
                className="btn btn-danger"
                onClick={() => setEditCourse(false)}
              >
                <i className="bi bi-x-circle me-1"></i>Cancel Edit
              </button>
              <button className="btn btn-success" onClick={() => uploadCourse()}>
                <i className="bi bi-upload me-1"></i>Update Course
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-danger" onClick={() => deleteThisCourse()}>
                <i className="bi bi-trash3 me-1"></i>Delete Course
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setEditCourse(true)}
              >
                <i className="bi bi-pencil-square me-1"></i>Edit Course
              </button>
            </>
          )}
        </div>
      </div>

      {/* Course Details */}
      <div className="mt-4">
        <h3>Course Details</h3>
        <p>Edit course and publish</p>
        <form>
          <div className="mb-3">
            <label>Course Name</label>
            <input
              type="text"
              className="form-control"
              value={courseData?.name}
              readOnly={!editCourse}
              onChange={(e) => handledirectInput("name", e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Course Price (₹)</label>
            <input
              type="number"
              className="form-control"
              value={courseData?.price || ""}
              readOnly={!editCourse}
              onChange={(e) => handledirectInput("price", e.target.value)}
            />
          </div>
        </form>
      </div>

      {/* Lessons */}
      <div>
        <h3>List of Lessons</h3>
        {editCourse && (
          <button
            className="btn btn-outline-primary mb-3"
            onClick={() => setPopupOpen({ open: true, data: null })}
          >
            <i className="bi bi-plus-circle"></i> Add New Lesson
          </button>
        )}
        {courseData?.courses?.length > 0 ? (
          courseData?.courses?.map((lesson, index) => (
            <div
              key={index}
              className="card mb-2"
              style={{ pointerEvents: editCourse ? "all" : "none" }}
              onClick={() => openEditLesson(lesson, index)}
            >
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title mb-0">{lesson?.name}</h5>
                </div>
                {editCourse && (
                  <i
                    className="bi bi-trash text-danger fs-5"
                    onClick={() => deleteThisCourse()}
                    title="Delete Lesson"
                  ></i>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No lessons available.</p>
        )}
      </div>

      {/* Lesson Popup */}
      {popupOpen.open && (
        <NewLesson
          addCourse={(course) => addLessontoCourse(course)}
          editData={popupOpen?.data}
          cancel={() => setPopupOpen({ open: false, data: null })}
          degreeId={courseData.id}
        />
      )}
    </div>
  );
};

export default Edit;
