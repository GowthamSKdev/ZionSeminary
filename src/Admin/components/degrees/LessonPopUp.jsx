import React, { useEffect, useState } from "react";
import BackIcon from "../../assets/Images/left-arrow.png";
import Test from "../../assets/Images/exam.png";
import Trash from "../../assets/Images/trash.png";
import Edit from "../../assets/Images/edit.png";
import LoadingGif from "../../assets/gif/loading.gif";
import Upload from "../../assets/Images/upload.png";
import LessonTest from "./LessonTest";
import { toast } from "react-toastify";
import AddTest from "../../pages/tests/AddTest";

const initialState = {
  title: "",
  link: "",
  subLessonFiles: null,
  updateIndex: null,
  type: null,
  test: null,
};

const LessonPopUp = ({
  addLesson,
  cancel,
  editData,
  removeThisLesson,
  degreeId,
  courseId,
}) => {
  const [currentLesson, setCurrentLesson] = useState({
    title: "",
    subLessons: [],
    updateIndex: null,
  });

  const [currentSublesson, setCurrentSublesson] = useState(initialState);
  const [currentUpdateIndex, setCurrentUpdateIndex] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [openLessonTest, setOpenLessonTest] = useState(false);

  useEffect(() => {
    if (editData) setCurrentLesson(editData);
  }, [editData]);

  const handleSubLessonsInput = (type, value) => {
    setCurrentSublesson({ ...currentSublesson, [type]: value });
  };

  const addSublessons = () => {
    if (!currentSublesson.title) {
      toast.error("Please provide a title for the sub-lesson.");
      return;
    }

    const newLessons = [...currentLesson.subLessons];

    // If editing an existing sub-lesson
    if (currentUpdateIndex !== null) {
      newLessons[currentUpdateIndex] = currentSublesson;
    } else {
      // Adding a new sub-lesson
      newLessons.push(currentSublesson);
    }

    setCurrentLesson({ ...currentLesson, subLessons: newLessons });
    setCurrentSublesson(initialState); // Reset sub-lesson state
    setCurrentUpdateIndex(null); // Reset update index
  };

  const validateAndUpdateLesson = () => {
    if (!currentLesson.title) {
      toast.error("Lesson title is required.");
      return;
    }
    addLesson(currentLesson);
  };

  const setEditSublesson = (subLesson, index) => {
    // Set currentSublesson with the selected sub-lesson data for editing
    setCurrentSublesson(subLesson);
    setCurrentUpdateIndex(index); // Track the index of the sub-lesson being edited
  };

  const handleRemoveSublesson = (index) => {
    const newSubLessons = [...currentLesson.subLessons];
    newSubLessons.splice(index, 1);
    setCurrentLesson({ ...currentLesson, subLessons: newSubLessons });
  };

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Confirm to delete this lesson. All sub-lessons will be deleted."
    );
    if (confirm) {
      const res = await deleteLesson(
        degreeId,
        courseId,
        currentLesson?.lesson_id
      );
      if (res) removeThisLesson(editData?.updateIndex);
      if (res) cancel();
    }
  };

  const cancelEdit = () => {
    setCurrentSublesson(initialState);
    setCurrentUpdateIndex(null);
  };

  return (
    <div className="lesson-popup-page ">
      {openLessonTest && (
        // <LessonTest
        //   closeTest={() => setOpenLessonTest(false)}
        //   addTest={(testId) =>
        //     setCurrentSublesson({
        //       ...currentSublesson,
        //       test: testId,
        //       type: "test",
        //     })
        //   }
        //   testId={currentSublesson.test}
        // />
        <AddTest
          closeTest={() => setOpenLessonTest(false)}
            addTest={(testId) =>
              setCurrentSublesson({
                ...currentSublesson,
                test: testId
              })
            }
            testId={currentSublesson.test}
        />
      )}
      <div className="lesson-popup lesson-z-index">
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
                Delete Lesson
              </div>
            )}
            <div
              className="add-new-lesson-btn"
              onClick={validateAndUpdateLesson}
            >
              {editData ? "Update" : " Add to Course"}
            </div>
          </div>
        </div>
        <div className="lesson-data-inputs-cnt">
          <div className="lesson-name-cnt">
            <p>Lesson Title</p>
            <input
              type="text"
              value={currentLesson?.title}
              className="sublesson-title-input"
              onChange={(e) =>
                setCurrentLesson({ ...currentLesson, title: e.target.value })
              }
            />
          </div>
          <div className="lesson-content-input-cnt">
            <div className="sublesson-name-cnt">
              <p>Sub Title</p>
              <input
                type="text"
                value={currentSublesson?.title}
                className="sublesson-title-input"
                onChange={(e) =>
                  setCurrentSublesson({
                    ...currentSublesson,
                    title: e.target.value,
                  })
                }
              />
            </div>
            <div className="sublesson-content-cover">
              <div className="input-cnt add-sublesson-btn flex-input">
                <div
                  className="sublesson-title-input center-media"
                  style={{
                    opacity: currentSublesson?.subLessonFiles && "0.5",
                    pointerEvents: currentSublesson?.subLessonFiles && "none",
                  }}
                >
                  <img
                    src={!currentSublesson.subLessonFiles ? Upload : LoadingGif}
                    alt="imag"
                    className={`${
                      !currentSublesson.subLessonFiles
                        ? "test-icon"
                        : "upload-icon"
                    }`}
                  />
                  <input
                    type="file"
                    name="lesson-upload"
                    accept="video/*,audio/*,application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                    style={{ position: "absolute" }}
                    className="file-title-input"
                    onChange={(e) =>
                      setCurrentSublesson({
                        ...currentSublesson,
                        subLessonFiles: e.target.files[0],
                      })
                    }
                  />
                </div>
                <div
                  className="sublesson-title-input center-media"
                  style={{
                    cursor: "pointer",
                    opacity: currentSublesson?.type && "0.5",
                    pointerEvents: currentSublesson?.type && "none",
                  }}
                  onClick={() => setOpenLessonTest(true)}
                >
                  <img src={Test} alt="imag" className="test-icon" />
                </div>
              </div>
              <div
                className="add-new-lesson-btn add-sublesson-btn"
                onClick={addSublessons}
              >
                {currentUpdateIndex !== null
                  ? "Update Sub-Lesson"
                  : "Add Sub-Lesson"}
              </div>
            </div>
          </div>
        </div>
        <div className="content-list">
          {currentLesson?.subLessons?.map((subLesson, index) => (
            <div className="lesson-content-input-cnt sublesson" key={index}>
              <div className="sublesson-name-cnt">
                <p className="sublesson-title-txt">Sub lesson Title</p>
                <input
                  type="text"
                  value={subLesson?.title}
                  className="sublesson-title-input sublesson-card-input"
                  readOnly
                />
              </div>
              <div className="sublesson-content-cover">
                <div className="input-cnt add-sublesson-btn">
                  <div
                    className="sublesson-title-input center-media sublesson-card-input"
                    onClick={() => window.open(subLesson?.link)}
                  >
                    <p className="sublesson-title-txt">Open Media</p>
                  </div>
                </div>
                <div className="add-new-lesson-btn add-sublesson-btn edit-sublesson-btn">
                  <div className="delete-btn">
                    <img
                      src={Trash}
                      alt="delete"
                      className="action-btn-img"
                      onClick={() => handleRemoveSublesson(index)}
                    />
                  </div>
                  <div className="delete-btn">
                    <img
                      src={Edit}
                      alt="edit"
                      className="action-btn-img"
                      onClick={() => setEditSublesson(subLesson, index)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LessonPopUp;
