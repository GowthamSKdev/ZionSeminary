import React, { useEffect, useState } from "react";
import BackIcon from "../../assets/Images/left-arrow.png";
import { toast } from "react-toastify";
import Test from "../../assets/Images/exam.png";
import LessonPopUp from "./LessonPopUp"; // Ensure the correct path to LessonPopUp
import ChapterTest from "./ChapterTest";
import Edit from "../../assets/Images/edit.png";
import AddTest from "../../pages/tests/AddTest";

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

  useEffect(() => {
      if (editData) setCurrentChapter(editData);
    }, [editData]);
  // Validate and update chapter
  const validateAndUpdateChapter = () => {
    if (!currentChapter.title.trim()) {
      toast.error("Chapter title is required");
      return;
    }
    addChapter(currentChapter);
  };

  // Add lesson
  // const handleAddLesson = (newLesson) => {
  //   if (!newLesson?.title?.trim()) {
  //     toast.error("Lesson title cannot be empty");
  //     return;
  //   }
  //   setCurrentChapter((prev) => ({
  //     ...prev,
  //     lessons: [...prev.lessons, newLesson],
  //   }));
  //   setOpenLessonPopup(false); // Close after adding
  // };

  const handleAddLesson = (newLesson) => {
    if (!newLesson?.title?.trim()) {
      toast.error("Lesson title cannot be empty");
      return;
    }

    // If updateIndex exists, it's an edit action, otherwise it's adding a new lesson
    setCurrentChapter((prev) => {
      const updatedLessons = [...prev.lessons];
      if (
        newLesson.updateIndex !== undefined &&
        newLesson.updateIndex !== null
      ) {
        // Update existing lesson
        updatedLessons[newLesson.updateIndex] = {
          title: newLesson.title,
          subLessons: newLesson.subLessons,
          test: newLesson.test, // Assuming this is a part of the lesson
        };
      } else {
        // Add new lesson
        updatedLessons.push(newLesson);
      }
      return { ...prev, lessons: updatedLessons };
    });

    setOpenLessonPopup(false); // Close popup after adding or editing
  };

  // // Edit lesson function
  // const handleEditLesson = (lesson, index) => {
  //   // Set the edit data with updateIndex so it can be recognized as an edit
  //   setEditLessonData({ ...lesson, updateIndex: index });
  //   setOpenLessonPopup(true); // Open the lesson popup for editing
  // };



  // const handleAddLesson = (newLesson) => {
  //   if (!newLesson?.title?.trim()) {
  //     toast.error("Lesson title cannot be empty");
  //     return;
  //   }

  //   setCurrentChapter((prev) => {
  //     const updatedLessons = [...prev.lessons];
  //     if (
  //       newLesson.updateIndex !== undefined &&
  //       newLesson.updateIndex !== null
  //     ) {
  //       // Update existing lesson
  //       updatedLessons[newLesson.updateIndex] = {
  //         // title: newLesson.title,
  //         // description: newLesson.description,
  //         title: newLesson.title,
  //         subLessons: newLesson.subLessons,
  //         test:newLesson.test
  //       };
  //     } else {
  //       // Add new lesson
  //       updatedLessons.push(newLesson);
  //     }
  //     return { ...prev, lessons: updatedLessons };
  //   });
  //   setOpenLessonPopup(false); // Close popup
  // };

  // Add or update lesson
  // const handleAddLesson = (newLesson) => {
  //   if (!newLesson?.title?.trim()) {
  //     toast.error("Lesson title cannot be empty");
  //     return;
  //   }

  //   if (newLesson.updateIndex !== undefined && newLesson.updateIndex !== null) {
  //     // Update existing lesson
  //     setCurrentChapter((prev) => {
  //       const updatedLessons = [...prev.lessons];
  //       updatedLessons[newLesson.updateIndex] = {
  //         title: newLesson.title,
  //         description: newLesson.description,
  //       };
  //       return { ...prev, lessons: updatedLessons };
  //     });
  //   } else {
  //     // Add new lesson
  //     setCurrentChapter((prev) => ({
  //       ...prev,
  //       lessons: [...prev.lessons, newLesson],
  //     }));
  //   }
  //   setOpenLessonPopup(false); // Close after adding or editing
  // };

  // Edit lesson
  const handleEditLesson = (lesson, index) => {
    setEditLessonData({ ...lesson, updateIndex: index });
    setOpenLessonPopup(true);
  };

  // Delete lesson
  const handleDelete = (index) => {
    if (!Array.isArray(currentChapter.lessons)) {
      console.error("Lessons is not an array or undefined");
      return;
    }
    const newLessons = [...currentChapter.lessons];
    newLessons.splice(index, 1);
    setCurrentChapter({ ...currentChapter, lessons: newLessons });
  };

  // Set chapter data for editing
  useEffect(() => {
    if (editData) setCurrentChapter(editData);
  }, [editData]);

  return (
    <div className="lesson-popup-page">
      {openChapterTest && (
        // <ChapterTest
        //   closeTest={() => setOpenChapterTest(false)}
        //   addTest={(testId) =>
        //     setCurrentChapter({
        //       ...currentChapter,
        //       test: testId,
        //       type: "test",
        //     })
        //   }
        //   testId={currentChapter.test}
        // />
        <AddTest
          closeTest={() => setOpenChapterTest(false)}
          addTest={(testId) =>
            setCurrentChapter({
              ...currentChapter,
              test: testId
              // type: null,
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
                onClick={() => removeThisChapter(editData?.updateIndex)}
              >
                Delete Chapter
              </div>
            )}
            <div
              className="add-new-lesson-btn"
              onClick={validateAndUpdateChapter}
            >
              {editData ? "Update" : "Add to Course"}
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
              <img src={Test} alt="test" className="test-icon" />
            </div>
          </div>
        </div>
        <div className="content-list">
          {currentChapter?.lessons?.length > 0 &&
            currentChapter.lessons.map((lesson, index) => (
              <div
                className="lesson-list-item-cnt lesson-content-input-cnt"
                key={index}
              >
                <div className="sublesson-name-cnt">
                  <p className="sublesson-title-txt">{lesson.title}</p>
                </div>
                <div className="add-new-lesson-btn add-sublesson-btn edit-sublesson-btn">
                  <button
                    className="delete-btn"
                    onClick={() => handleEditLesson(lesson, index)}
                  >
                    <img src={Edit} alt="edit" className="action-btn-img" />
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(index)}
                  >
                    <img src={Edit} alt="delete" className="action-btn-img" />
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

