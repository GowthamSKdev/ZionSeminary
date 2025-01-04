import React, { useEffect, useState } from "react";
import Nolesson from "../../../assets/Images/no-lesson-illustration.svg";
import { useNavigate } from "react-router-dom";
// import NewLesson from "./NewLesson";
import NewLesson from "../../lesson/NewLesson";
import { addDegree } from "../../../firebase/degreeApi";
import { toast } from "react-toastify";
// import NewChapter from "./NewChapter";
import LessonPopUp from "../../../components/degrees/LessonPopUp";
import NewChapter from "./NewChapter";

const NewCourse = ({ addDegree, cancel, editData, removeThisLesson }) => {
  const [popupOpen, setPopupOpen] = useState({ open: false, data: null });

  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    courseThumbnails: null,
    chapters: [],
    updateIndex : null
  });

  useEffect(() => {
    if (popupOpen) window.scrollTo(0, 0);
  }, [popupOpen]);

    useEffect(() => {
      if (editData) setCurrentLesson(editData);
    }, [editData]);

  const handledirectInput = (type, value) => {
    setCourseData({ ...courseData, [type]: value });
  };

  const handleDeleteCourse = (courseIndex) => {
    const newCourseData = [...courseData.chapters]
    newCourseData.splice(courseIndex, 1);
    setCourseData({ ...courseData, chapters: newChapterData });
  }

  const addChapterToCourse = (chapter) => {
    console.log(chapter);
    const newCourse = [...courseData.chapters];
    if (chapter.updateIndex === null) {
      newCourse.push({
        ...chapter,
        updateIndex: newCourse?.length > 0 ? newCourse?.length : 0,
      });
      setCourseData({ ...courseData, chapters: newCourse });
    } else {
      newCourse[chapter.updateIndex] = chapter;
      setCourseData({ ...courseData, chapters: newCourse });
    }
    setPopupOpen({ open: false });
    // addDegree(courseData)
  };


  const uploadCourse = async () => {
    if (!courseData.title || !courseData.courseThumbnails) {
      toast.error("Please provide title and description.");
      return;
    }
    const courseDataObj = {
      title : courseData.title,
      description : courseData.description,
      courseThumbnails : courseData.courseThumbnails,
      chapters : courseData.chapters,
      updateIndex : courseData.updateIndex
    }
    console.log(courseDataObj);
    
    addDegree(courseDataObj);
  };

  return (
    <div className="lesson-popup-cnt" style={{ height: "100% !important" }}>
      <div
        className="course-list-cnt new-course"
        style={{
          // height: popupOpen.open ? "100vh" : "auto",
          overflow: popupOpen.open ? "hidden" : "scroll",
        }}
      >
        <div className="top-header-cnt">
          <div>
            <h3 className="course-new-title">Create New Course</h3>
            <p className="course-new-discription">
              {/* Create new degree and lets publish */}
            </p>
          </div>
          <div className="top-btn-cnt">
            <div className=" course-delete-btn " onClick={() => cancel()}>
              Cancel
            </div>
            <div className="add-new-lesson-btn" onClick={() => uploadCourse()}>
              Save Course
            </div>
          </div>
        </div>
        <div className="input-split-cover">
          <form className="left-form">
            <div className="course-name-cnt">
              <p>Enter Course title</p>
              <input
                type="text"
                name=""
                id=""
                value={courseData?.title}
                className="name-input"
                onChange={(e) => handledirectInput("title", e.target.value)}
              />
            </div>

            <div className="course-description-cnt">
              <p>Describe Course</p>
              <textarea
                type="text"
                name=""
                id=""
                value={courseData?.description}
                className="description-input"
                onChange={(e) =>
                  handledirectInput("description", e.target.value)
                }
              />
            </div>
            {/* <div className="flex-input">
            <div className="course-name-cnt">
              <p>Enter degree price</p>
              <input
                type="number"
                name=""
                id=""
                value={courseData.price !== null ? courseData.price : ""}
                className="name-input price-input"
                placeholder="₹"
                onChange={(e) => handledirectInput("price", e.target.value)}
              />
            </div>
          </div> */}
            <div className="course-name-cnt">
              <p>Upload degree thumbnail</p>
              {/* <input
              type="file"
              accept="image/png, image/svg+xml"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setCourseData({ ...courseData, courseThumbnails: file })
                }
              }}
              className="styled-input"
            /> */}
            <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();

                    // Read the file as a Data URL (Base64 string)
                    reader.onloadend = () => {
                      setCourseData({
                        ...courseData,
                        courseThumbnails: reader.result, // Base64 string of the image
                      });
                    };

                    reader.readAsDataURL(file); // Converts the file to Base64
                  }
                }}
                className="styled-input"
              />
            </div>
          </form>
          <form className="form-right">
            <div className="form-right-header">
              <h3 className="course-new-title form-right-heading">
                Chapter List
              </h3>
              <div
                className="add-new-lesson-btn"
                onClick={() => setPopupOpen({ open: true, data: null })}
              >
                Add new Chapter
              </div>
            </div>

            <div className="lesson-list-cnt">
              {courseData.chapters?.length > 0 ? (
                courseData?.chapters?.map((chapter, index) => (
                  <div
                    className="lesson"
                    onClick={() => setPopupOpen({ open: true, data: chapter })}
                  >
                    <h1 className="lesson-number">{index + 1}</h1>
                    <div className="lesson-title-cnt">
                      <h3 className="lesson-title">{chapter?.title}</h3>
                    </div>
                    <ul className="lesson-subtitle-cnt">
                      {chapter?.lessons?.map((lesson) => (
                        <li>
                          <p className="lesson-subtitle">{lesson?.title}</p>
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
              {/*  */}
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
          <LessonPopUp
            addChapter={addChapterToCourse}
            editData={popupOpen?.data}
            cancel={() => setPopupOpen({ open: false, data: null })}
            removeThisCourse={(index) => handleDeleteCourse(index)}
          />
        )}
      </div>
    </div>
  );
};

export default NewCourse;
