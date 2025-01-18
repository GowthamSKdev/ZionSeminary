import React, { useEffect, useState } from "react";
import BackIcon from "../../assets/Images/left-arrow.png";
import { toast } from "react-toastify";
import Test from "../../assets/Images/exam.png";
import {
  addChapterToCourse,
  deleteChapter,
  editChapter,
} from "../../firebase/degreeApi";
import LessonPopUp from "./LessonPopUp"; // Ensure the correct path to LessonPopUp
import ChapterTest from "./ChapterTest";
import Edit from "../../assets/Images/edit.png";

const initialState = {
  title: "",
  description: "",
  lessons: [],
  updateIndex: null,
  test: null,
  type: null,
};

const ChapterPopUp = ({
  addChapter,
  cancel,
  editData,
  removeThisChapter,
  degreeId,
  courseId,
}) => {
  const [currentChapter, setCurrentChapter] = useState(initialState);
  const [openLessonPopup, setOpenLessonPopup] = useState(false);
  const [editLessonData, setEditLessonData] = useState(null);
  const [openChapterTest, setOpenChapterTest] = useState(false);

  // const validateAndUpdateChapter = async () => {
  //   if (!currentChapter.name || !currentChapter.description) {
  //     toast.error("Please provide both a chapter title and description.");
  //     return;
  //   }

  //   if (currentChapter?.chapter_id) {
  //     // Edit chapter
  //     const res = await toast.promise(
  //       editChapter(
  //         degreeId,
  //         courseId,
  //         currentChapter?.chapter_id,
  //         currentChapter
  //       ),
  //       {
  //         pending: "Updating chapter...",
  //         success: "Chapter updated successfully",
  //         error: "An error occurred while updating chapter",
  //       }
  //     );
  //     if (res) {
  //       addChapter(currentChapter);
  //       cancel();
  //     }
  //   } else if (degreeId && courseId) {
  //     // Add new chapter
  //     const res = await toast.promise(
  //       addChapterToCourse(degreeId, courseId, currentChapter),
  //       {
  //         pending: "Adding new chapter...",
  //         success: "Chapter added successfully",
  //         error: "An error occurred while adding new chapter",
  //       }
  //     );
  //     if (res) {
  //       addChapter(res);
  //       setCurrentChapter(res);
  //     }
  //   }
  // };

  const validateAndUpdateChapter = () => {
    addChapter(currentChapter);
  };

  const handleAddLesson = (newLesson) => {
    setCurrentChapter((prev) => ({
      ...prev,
      // subLessons: [...prev.subLessons, newLesson],
      lessons: [...prev.lessons, newLesson],
    }));
    setOpenLessonPopup(false); // Close after adding
  };

  const handleEditLesson = (lesson, index) => {
    setEditLessonData({ ...lesson, updateIndex: index });
    setOpenLessonPopup(true);
  };

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Confirm to delete this chapter? All subLessons will be deleted."
    );
    if (confirm) {
      const res = await deleteChapter(
        degreeId,
        courseId,
        currentChapter?.chapter_id
      );
      if (res) {
        removeThisChapter(editData?.updateIndex);
        cancel();
      }
    }
  };

  useEffect(() => {
    if (editData) setCurrentChapter(editData);
  }, [editData]);

  return (
    <div className="lesson-popup-page">
      {openChapterTest && (
        <ChapterTest
          closeTest={() => setOpenChapterTest(false)}
          addTest={(testId) =>
            setCurrentChapter({
              ...currentChapter,
              test: testId,
              type: "test",
            })
          }
          testId={currentChapter.test}
        />
      )}
      {openLessonPopup && (
        <LessonPopUp
          addLesson={handleAddLesson}
          cancel={() => setOpenLessonPopup(false)}
          editData={editLessonData}
          degreeId={degreeId}
          courseId={courseId}
        />
      )}
      <div className="lesson-popup">
        <div className="form-right-header">
          <div className="back-btn" onClick={cancel}>
            <img src={BackIcon} alt="back" className="back-icon-img" />
          </div>
          <div className="top-btn-cnt">
            {editData && (
              <div
                className="add-new-lesson-btn cancel-btn"
                onClick={handleDelete}
              >
                Delete Chapter
              </div>
            )}
            <div
              className="add-new-lesson-btn"
              onClick={() => validateAndUpdateChapter()}
            >
              {currentChapter?.chapter_id ? "Update" : "Add to Course"}
            </div>
          </div>
        </div>
        <div className="lesson-data-inputs-cnt">
          <div className="lesson-name-cnt">
            <p>Chapter Title</p>
            <input
              type="text"
              value={currentChapter?.title || ""}
              className="sublesson-title-input"
              onChange={(e) =>
                setCurrentChapter({ ...currentChapter, title: e.target.value })
              }
            />
          </div>

          <div className="lesson-content-input-cnt">
            <div className="sublesson-name-cnt">
              <p>Chapter Description</p>
              <textarea
                type="text"
                style={{ height: "4.5rem" }}
                className="sublesson-title-input"
                value={currentChapter?.description || ""}
                onChange={(e) =>
                  setCurrentChapter({
                    ...currentChapter,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <div
              className="add-newLesson-btn"
              onClick={() => {
                setEditLessonData(null); // Clear edit data for new lesson
                setOpenLessonPopup(true);
              }}
            >
              <p>Add New Lesson</p>
            </div>
            <div
              className="sublesson-title-input center-media"
              style={{
                cursor: "pointer",
                opacity: currentChapter?.type && "0.5",
                pointerEvents: currentChapter?.type && "none",
              }}
              onClick={() => setOpenChapterTest(true)}
            >
              <img src={Test} alt="imag" className="test-icon" />
            </div>
            {/* <div className="sublesson-content-cover">
              <div className="input-cnt add-sublesson-btn flex-input">
              </div>
            </div> */}
          </div>
        </div>
        <div className="content-list">
          {currentChapter?.Lessons?.length > 0 &&
            currentChapter?.Lessons?.map((lesson, index) => (
              <div
                className="lesson-list-item-cnt lesson-content-input-cnt"
                key={index}
              >
                <div className="sublesson-name-cnt">
                  <p className="sublesson-title-txt">{lesson.title}</p>
                  <button className="delete-btn" onClick={() => handleEditLesson(lesson, index)}>
                  <img
                                        src={Edit}
                                        alt="edit"
                                        className="action-btn-img"
                                        onClick={() => setEditSublesson(chapter, index)}
                                      />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ChapterPopUp;
