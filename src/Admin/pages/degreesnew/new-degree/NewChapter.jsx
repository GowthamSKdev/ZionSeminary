import React, { useEffect, useState } from "react";
import AddTest from "./AddTest";
import ChapterPopUp from "../../../components/degrees/ChapterPopUp";
import { toast } from "react-toastify";
import { addCourseToDegree, editCourse } from "../../../firebase/degreeApi";

const initialState = {
  name: "",
  description: "",
  lessons: [],
  updateIndex: null,
  testId: null,
};

const NewChapter = ({ addCourse, cancel, editData, removeThisCourse, degreeId }) => {
  const [currentCourse, setCurrentCourse] = useState(initialState);
  const [openTest, setOpenTest] = useState({ open: false, data: null });
  const [isfold, setFold] = useState(null);
  const [openChapterPopUP, setOPenChapterPopUP] = useState({ open: false, data: null });

  const addLessonToCourse = (lesson) => {
    let updatedLessons = [...(currentCourse?.lessons || [])];
    if (lesson?.updateIndex !== undefined && lesson.updateIndex !== null) {
      updatedLessons[lesson.updateIndex] = { ...lesson };
    } else {
      updatedLessons.push({ ...lesson });
    }
    setCurrentCourse({ ...currentCourse, lessons: updatedLessons });
  };

  const validateAndUpdateCourse = async () => {
    if (currentCourse.description.length > 5 && currentCourse.name) {
      let res;
      if (degreeId && !currentCourse?.course_id) {
        res = await toast.promise(addCourseToDegree(degreeId, currentCourse), {
          pending: "Adding course...",
          success: "Course added successfully!",
          error: "Error while adding course!",
        });
      } else {
        res = await toast.promise(editCourse(degreeId, currentCourse.course_id, currentCourse), {
          pending: "Updating course...",
          success: "Course updated successfully!",
          error: "Error while updating course!",
        });
      }
      if (res) addCourse(currentCourse);
    } else {
      toast.error("Please add valid course details and at least one lesson.");
    }
  };

  const handleRemoveLessonFromCourse = (index) => {
    const updatedLessons = currentCourse.lessons.filter((_, i) => i !== index);
    setCurrentCourse({ ...currentCourse, lessons: updatedLessons });
  };

  useEffect(() => {
    if (editData) setCurrentCourse(editData);
  }, [editData]);

  return (
    <div className="container p-4 border rounded bg-white">
      {openChapterPopUP.open && (
        <ChapterPopUp
          addLesson={addLessonToCourse}
          editData={openChapterPopUP.data}
          removeThisLesson={handleRemoveLessonFromCourse}
          cancel={() => setOPenChapterPopUP({ open: false, data: null })}
          degreeId={degreeId}
          courseId={currentCourse?.course_id}
        />
      )}

      {openTest.open && (
        <AddTest
          testId={currentCourse?.testId}
          addTest={(data) => setCurrentCourse({ ...currentCourse, testId: data })}
          closeTest={() => setOpenTest({ open: false })}
        />
      )}

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <i className="bi bi-arrow-left fs-4 cursor-pointer" onClick={cancel}></i>
        <div>
          {editData && (
            <button className="btn btn-danger me-2" onClick={() => removeThisCourse(editData?.updateIndex)}>
              <i className="bi bi-trash"></i> Delete Course
            </button>
          )}
          <button className="btn btn-primary" onClick={validateAndUpdateCourse}>
            {currentCourse.course_id ? "Update Course" : "Add to Degree"}
          </button>
        </div>
      </div>

      {/* Form */}
      <h4 className="mb-3">Create New Chapter</h4>
      <div className="mb-3">
        <label className="form-label">Course Title</label>
        <input
          type="text"
          className="form-control"
          value={currentCourse?.name}
          onChange={(e) => setCurrentCourse({ ...currentCourse, name: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Course Description</label>
        <textarea
          className="form-control"
          rows="3"
          value={currentCourse.description}
          onChange={(e) => setCurrentCourse({ ...currentCourse, description: e.target.value })}
        ></textarea>
      </div>

      <button
        className="btn btn-outline-success mb-3"
        onClick={() => setOPenChapterPopUP({ open: true, data: null })}
      >
        <i className="bi bi-plus-circle"></i> Add New Chapter
      </button>

      {/* Lessons List */}
      {currentCourse?.lessons?.map((lesson, index) => (
        <div className="border rounded mb-2 p-2" key={index}>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <i
                className={`bi bi-chevron-right me-2 ${
                  isfold === index ? "rotate-90" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => setFold(isfold === index ? null : index)}
              ></i>
              <strong>{lesson.name}</strong>
            </div>
            <div>
              <i
                className="bi bi-pencil text-primary me-2"
                style={{ cursor: "pointer" }}
                onClick={() => setOPenChapterPopUP({ open: true, data: { ...lesson, updateIndex: index } })}
              ></i>
              <i
                className="bi bi-trash text-danger"
                style={{ cursor: "pointer" }}
                onClick={() => handleRemoveLessonFromCourse(index)}
              ></i>
            </div>
          </div>
          {isfold === index && (
            <div className="mt-2 ps-4">
              {lesson.chapters?.map((chapter, subIndex) => (
                <div key={subIndex} className="d-flex justify-content-between">
                  <div>{chapter.name}</div>
                  <div>{chapter.duration}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NewChapter;
