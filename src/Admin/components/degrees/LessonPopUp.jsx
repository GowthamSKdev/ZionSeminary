import React, { useEffect, useState } from "react";
import BackIcon from "../../assets/Images/left-arrow.png";
import { findFileType } from "../../hooks/newCourseFunctions";
import Test from "../../assets/Images/exam.png";
import Trash from "../../assets/Images/trash.png";
import Edit from "../../assets/Images/edit.png";
import LoadingGif from "../../assets/gif/loading.gif";
import Upload from "../../assets/Images/upload.png";
// import { uploadFile } from "../../firebase/degreeApi";
import LessonTest from "./LessonTest";
import { toast } from "react-toastify";
// import {
//   addLessonToChapter,
//   deleteLesson,
//   editLesson,
// } from "../../firebase/degreeApi";

const initialState = {
  title: "",
  // duration: "",
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

  // const handleAddFile = async (file) => {
  //   console.log(file);
  //   setUploadingFile(true);
  //   const filetype = findFileType(file);
  //   setCurrentSublesson({ ...currentSublesson, lessonFiles : file, type: filetype });
  //   setUploadingFile(false);
  // };

  // const handleFileUpload = (e) => {
  //   const file = e.target.files[0]; // Get the selected file
  //   if (!file) return; // If no file is selected, exit
  
  //   const supportedTypes = [
  //     "video",
  //     "audio",
  //     "application/pdf",
  //     "application/vnd.ms-powerpoint",
  //     "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  //   ];
  
  //   const fileType = file.type.split("/")[0]; // Get the major type (e.g., "video")
  //   const isValidType =
  //     supportedTypes.includes(file.type) || supportedTypes.includes(fileType);
  
  //   if (!isValidType) {
  //     toast.error("Unsupported file type. Please upload a valid file.");
  //     return;
  //   }
  
  //   // const reader = new FileReader(); // Initialize FileReader
  
  //   // reader.onloadend = () => {
  //     setCurrentSublesson({
  //       ...currentSublesson,
  //       file: file, // Base64 string
  //       // type: file.type,
  //     });
  //   // };
  
  //   // reader.onerror = () => {
  //     // toast.error("Failed to read file. Please try again.");
  //   // };
  
  //   // reader.readAsDataURL(file); // Convert file to Base64
  // };
  

  const handleSubLessonsInput = (type, value) => {
    setCurrentSublesson({ ...currentSublesson, [type]: value });
  };

  const addSublessons = async () => {
    if (
      // !currentSublesson.duration ||
      // !currentSublesson.type ||
      !currentSublesson.title
    ) {
      toast.error("fill all details and add a test or file");
      return;
    }

    const newLessons = [...currentLesson.subLessons];

    if (currentUpdateIndex !== null && currentUpdateIndex !== undefined) {
      newLessons[currentUpdateIndex] = currentSublesson;
    } else {
      newLessons.push(currentSublesson);
    }
    setCurrentLesson({ ...currentLesson, subLessons: newLessons });
    setCurrentSublesson(initialState);
    setCurrentUpdateIndex(null);
  };

  const validateAndUpdateLesson = () => {
    // addChapter(currentLesson);
    addLesson(currentLesson);
   }

  const setEditSublesson = (chapter, index) => {
    setCurrentSublesson(chapter);
    setCurrentUpdateIndex(index);
  };

  const handleRemoveSublesson = (index) => {
    if (!Array.isArray(currentLesson.chapters)) {
      console.error("Chapters is not an array or undefined");
      return;
    }
  
    const newsubLessons = [...currentLesson.chapters];
    newsubLessons.splice(index, 1);
    setCurrentLesson({ ...currentLesson, chapters: newsubLessons });
  };
  

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Confirm to delete this lesson, all subLessons will be deleted"
    );
    console.log(editData?.title);
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

  console.log(currentSublesson, currentUpdateIndex);

  useEffect(() => {
    if (editData) setCurrentLesson(editData);
  }, [editData]);

  return (
    <div className="lesson-popup-page ">
      {openLessonTest && (
        <LessonTest
          closeTest={() => setOpenLessonTest(false)}
          addTest={(testId) =>
            setCurrentSublesson({
              ...currentSublesson,
              test: testId,
              type: "test",
            })
          }
          testId={currentSublesson.test}
        />
      )}
      <div className="lesson-popup lesson-z-index">
        <div className="form-right-header">
          <div className="back-btn" onClick={() => cancel()}>
            <img src={BackIcon} alt="back" className="back-icon-img" />
          </div>
          <div className="top-btn-cnt">
            {editData && (
              <div
                className="add-new-lesson-btn cancel-btn"
                onClick={() => handleDelete()}
              >
                Delete Lesson
              </div>
            )}
            <div
              className="add-new-lesson-btn"
              onClick={() => validateAndUpdateLesson()}
            >
              {currentLesson?.lesson_id ? "Update" : " Add to Course"}
            </div>
          </div>
        </div>
        <div className="lesson-data-inputs-cnt">
          <div className="lesson-name-cnt">
            <p>Lesson Title</p>
            <input
              type="text"
              name=""
              id=""
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
                name=""
                id=""
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
              {/* <div className="input-cnt">
                <p>Duration</p>
                <input
                  type="text"
                  name=""
                  id=""
                  className="sublesson-duration-input sublesson-title-input "
                  value={currentSublesson?.duration}
                  onChange={(e) =>
                    handleSubLessonsInput("duration", e.target.value)
                  }
                />
              </div> */}
              <div className="input-cnt add-sublesson-btn flex-input">
                <div
                  className="sublesson-title-input center-media"
                  style={{
                    opacity: currentSublesson?.test && "0.5",
                    pointerEvents: currentSublesson?.test && "none",
                  }}
                >
                  {currentSublesson?.file?.length > 5 && !uploadingFile && (
                    <p>{currentSublesson?.type}</p>
                  )}
                  <img
                    src={!uploadingFile ? Upload : LoadingGif}
                    alt="imag"
                    className={`${!uploadingFile ? "test-icon" : LoadingGif}`}
                  />
                  {/* <input
                    type="file"
                    name="video-upload"
                    accept="video/,audio/,application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                    style={{ position: "absolute" }}
                    id=""
                    className="file-title-input"
                    onChange={(e) => handleAddFile(e.target.files[0])}
                  /> */}
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
                onClick={() => addSublessons()}
              >
                {currentUpdateIndex !== null ? "Update" : "Add"}
              </div>
            </div>
          </div>
        </div>
        <div className="content-list">
          {currentLesson?.subLessons?.map((subLesson, index) => (
            <div
              className="lesson-content-input-cnt sublesson"
              key={index}
              style={{
                background:
                  currentSublesson.updateIndex === index ? "#eaeaea" : null,
              }}
            >
              <div className="sublesson-name-cnt">
                <p className="sublesson-title-txt">Sub lesson Title</p>
                <input
                  type="text"
                  name=""
                  id=""
                  value={subLesson?.title}
                  className="sublesson-title-input sublesson-card-input"
                />
              </div>
              <div className="sublesson-content-cover">
                {/* <div className="input-cnt sublesson-title-txt">
                  <p>Duration</p>
                  <input
                    type="text"
                    name=""
                    id=""
                    value={chapter?.duration}
                    className="sublesson-duration-input sublesson-title-input sublesson-card-input"
                  />
                </div> */}
                <div className="input-cnt add-sublesson-btn">
                  <div
                    className="sublesson-title-input center-media sublesson-card-input"
                    onClick={() => window.open(chapter?.link)}
                  >
                    <p className="sublesson-title-txt">open media</p>
                  </div>
                </div>
                <div
                  className="add-new-lesson-btn add-sublesson-btn edit-sublesson-btn"
                  //   onClick={() => setPopupOpen(false)}
                >
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
                      onClick={() => setEditSublesson(chapter, index)}
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