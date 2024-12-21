import React, { useEffect, useState } from "react";
import AddTest from "./AddTest";
import LessonPopUp from "../../../components/degrees/LessonPopUp";
import { toast } from "react-toastify";
import { addCourseToDegree, editCourse } from "../../../firebase/degreeApi";

const initialState = {
  name: "",
  description: "",
  lessons: [],
  updateIndex: null,
  testId: null,
};

const NewLesson = ({ addCourse, cancel, editData, removeThisCourse, degreeId }) => {
  const [currentCourse, setCurrentCourse] = useState(initialState);
  const [openTest, setOpenTest] = useState({ open: false, data: null });
  const [isfold, setFold] = useState(null);
  const [openLessonPopUP, setOPenLessonPopUP] = useState({ open: false, data: null });

  const addLessonToCourse = (lesson) => {
    let updatedLesson = currentCourse?.lessons ? [...currentCourse.lessons] : [];
    if (lesson?.updateIndex !== undefined && lesson.updateIndex !== null) {
      if (lesson.updateIndex >= 0 && lesson.updateIndex < updatedLesson.length) {
        updatedLesson[lesson.updateIndex] = { ...lesson };
      }
    } else {
      updatedLesson.push({ ...lesson });
    }
    setCurrentCourse({ ...currentCourse, lessons: updatedLesson });
  };

  const validateAndUpdateCourse = async () => {
    if (currentCourse.description.length > 5 && currentCourse.name) {
      if (degreeId && !currentCourse?.course_id) {
        let res = await toast.promise(addCourseToDegree(degreeId, currentCourse), {
          pending: "Adding course...",
          success: "Course added successfully",
          error: "Error while adding course",
        });
        setCurrentCourse(res);
        if (res) addCourse(currentCourse);
      } else if (currentCourse?.course_id) {
        let res = await toast.promise(editCourse(degreeId, currentCourse?.course_id, currentCourse), {
          pending: "Updating course...",
          success: "Course updated successfully",
          error: "Error while updating course",
        });
        if (res) addCourse(currentCourse);
      }
    } else {
      toast.error("Please add at least one Lesson and course details");
    }
  };

  useEffect(() => {
    if (editData) setCurrentCourse(editData);
  }, [editData]);

  const handleRemoveLessonFromCourse = (lessonIndex) => {
    const newLessons = [...currentCourse.lessons];
    newLessons.splice(lessonIndex, 1);
    setCurrentCourse({ ...currentCourse, lessons: newLessons });
  };

  const handleDelete = () => {
    const confirm = window.confirm("Confirm to delete this course, all lessons will be deleted");
    if (confirm) {
      removeThisCourse(editData?.updateIndex);
      cancel();
    }
  };

  return (
    <div className="lesson-popup-cnt">
      <div className="lesson-new-cnt">
        {/* Lesson PopUp */}
        {openLessonPopUP.open && (
          <LessonPopUp
            addLesson={(lesson) => addLessonToCourse(lesson)}
            editData={openLessonPopUP.data}
            removeThisLesson={(lessonIndex) => handleRemoveLessonFromCourse(lessonIndex)}
            cancel={() => setOPenLessonPopUP({ open: false, data: null })}
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
        <div className="form-right-header d-flex justify-content-between align-items-center">
          <button className="btn btn-light" onClick={() => cancel()}>
            <i className="bi bi-arrow-left"></i> Back
          </button>
          <div>
            {editData && (
              <button className="btn btn-danger me-2" onClick={handleDelete}>
                <i className="bi bi-trash"></i> Delete Course
              </button>
            )}
            <button className="btn btn-primary" onClick={validateAndUpdateCourse}>
            <i className="bi bi-plus-circle"></i> {currentCourse.course_id ? "Update Course" : "Add to Degree"}
            </button>
          </div>
        </div>

        {/* Form */}
        <h3 className="mt-4">Create New Lesson</h3>
        <div>
          <label>Lesson Title</label>
          <input
            type="text"
            value={currentCourse?.name}
            className="form-control mb-3"
            onChange={(e) => setCurrentCourse({ ...currentCourse, name: e.target.value })}
          />

          <div
            className="d-flex align-items-center text-primary mb-3"
            style={{ cursor: "pointer" }}
            onClick={() => setOpenTest({ open: true, data: currentCourse.testId })}
          >
            <i className="bi bi-file-earmark-text me-2"></i>
            <span>
              {currentCourse?.testId?.length > 3
                ? "Test (Click to Update)"
                : "No Tests Created"}
            </span>
          </div>

          <label>Lesson Description</label>
          <textarea
            value={currentCourse.description}
            className="form-control mb-3"
            rows="3"
            onChange={(e) => setCurrentCourse({ ...currentCourse, description: e.target.value })}
          ></textarea>

          <button
            className="btn btn-success mb-3"
            onClick={() => setOPenLessonPopUP({ open: true, data: null })}
          >
            <i className="bi bi-plus-circle"></i> Add New Lesson
          </button>
        </div>

        {/* Lesson List */}
        {currentCourse?.lessons?.length > 0 &&
          currentCourse?.lessons?.map((lesson, index) => (
            <div key={index} className="border p-2 mb-2">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <i
                    className={`bi bi-chevron-${isfold === index ? "down" : "right"} me-2`}
                    onClick={() => setFold(isfold !== index ? index : null)}
                  ></i>
                  {lesson.name} (ID: {lesson.lessonId || "N/A"})
                </div>
                <div>
                  <i
                    className="bi bi-pencil-square text-primary me-2"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      setOPenLessonPopUP({
                        open: true,
                        data: { ...lesson, updateIndex: index },
                      })
                    }
                  ></i>
                  <i
                    className="bi bi-trash text-danger"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleRemoveLessonFromCourse(index)}
                  ></i>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NewLesson;
