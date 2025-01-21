// import React, { useEffect, useState } from "react";
// import Trash from "../../../assets/Images/trash.png";
// import EditImg from "../../../assets/Images/edit.png";
// import Nolesson from "../../../assets/Images/no-lesson-illustration.svg";
// import BackIcon from "../../../assets/Images/left-arrow.png";
// import { useNavigate } from "react-router-dom";
// import { deleteDegree, editDegree } from "../../../firebase/degreeApi";
// import { toast } from "react-toastify";
// import axios from "axios";
// import EditCourse from "../../courses/edit-course/Edit";
// import NewCourse from "../../courses/new-course/NewCourse";
// const apiBaseUrl = process.env.REACT_APP_BASE_API;
// const Edit = ({ courseDetails }) => {
//   const [popupOpen, setPopupOpen] = useState({ open: false, data: null });
//   const [editCourse, setEditCourse] = useState(false);
//   const [currentOverview, setCurrentOverview] = useState({
//     heading: "",
//     content: "",
//     updateIndex: null,
//   });

//   const navigate = useNavigate();
//   const [courseData, setCourseData] = useState({
//     title: "",
//     description: "",
//     price: null,
//     degreeThumbnail: null,
//     // overviewPoints: [],
//     courses: [],
//   });

//   useEffect(() => {
//     if (popupOpen) window.scrollTo(0, 0);
//   }, [popupOpen]);

//   useEffect(() => {
//     setCourseData(courseDetails);
//   }, [courseDetails]);

//   const handledirectInput = (type, value) => {
//     setCourseData({ ...courseData, [type]: value });
//   };

//   const handleOverviewInput = (type, value) => {
//     setCurrentOverview({ ...currentOverview, [type]: value });
//   };

//   const addNewOverview = () => {
//     if (currentOverview.heading && currentOverview.content) {
//       const newOverview = courseData.overviewPoints;
//       if (
//         currentOverview.updateIndex === null ||
//         currentOverview.updateIndex === undefined
//       ) {
//         newOverview.push({
//           ...currentOverview,
//           updateIndex: newOverview.length > 0 ? newOverview?.length : 0,
//         });
//         setCourseData({ ...courseData, overviewPoints: newOverview });
//       } else {
//         newOverview[currentOverview?.updateIndex] = currentOverview;
//         setCourseData({ ...courseData, overviewPoints: newOverview });
//       }
//       setCurrentOverview({
//         heading: "",
//         content: "",
//         updateIndex: null,
//       });
//     }
//   };

//   const addLessontoCourse = (lesson) => {
//     console.log(lesson);
//     const newCourse = [...courseData.courses];
//     if (lesson.updateIndex === null) {
//       newCourse.push({
//         ...lesson,
//         updateIndex: newCourse?.length > 0 ? newCourse?.length : 0,
//       });
//       setCourseData({ ...courseData, courses: newCourse });
//     } else {
//       newCourse[lesson.updateIndex] = lesson;
//       setCourseData({ ...courseData, courses: newCourse });
//     }

//     setPopupOpen({ open: false });
//   };

//   const uploadCourse = async () => {
//     try {
//       const formData = new FormData();
//       // console.log(degreeData.title);
//       formData.append("title", courseData.title);
//       // console.log(degreeData.description);
//       formData.append("description", courseData.description);
//       // console.log(degreeData.price);
//       formData.append("price", courseData.price);

//       formData.append("degreeThumbnail", courseData.degreeThumbnail);

//       courseData.courses.forEach((course) => {
//         formData.append("courseThumbnails", course.courseThumbnail);
//         // Append course thumbnail if available
//         //  if (course.courseThumbnail) {
//         //    formData.append("courseThumbnails", course.courseThumbnail);
//         //  }
//         course.chapters.forEach((chapter) => {
//           chapter.lessons.forEach((lesson) => {
//             // formData.append("lessonFiles", lesson.file);
//             lesson.subLessons.forEach((subLesson) => {
//               formData.append("subLessonFiles", subLesson.subLessonFiles);
//             });
//           });
//         });
//       });

//       console.log(courseData);

//       formData.append("courses", JSON.stringify(courseData?.courses));

//       // Send the final payload
//       console.log("FormData : " + formData);

//       const response = await axios.put(
//         `${apiBaseUrl}/api/degrees/${courseDetails._id}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           // withCredentials: true,
//         }
//       );

//       console.log("Degree added successfully:", response.data);
//       toast.success("Degree added successfully!");
//       navigate("/admin/degrees");
//     } catch (error) {
//       console.error(
//         "Error uploading degree:",
//         error.response?.data || error.message
//       );
//       toast.error("An error occurred while adding the degree.");
//     }
//   };

//   const deleteThisCourse = async () => {
//     const confirm = window.confirm(
//       "Confirm to delete this course all lessons associated will be lost"
//     );
//     if (confirm) {
//       try {
//         const res = await toast.promise(
//           axios.delete(`${apiBaseUrl}/api/degrees/${courseDetails._id}`),
//           {
//             pending: "deleting degree...",
//             success: "Degree deleted successfully",
//             error: "An error occurred while deleting Degree",
//           }
//         );
//         if (res) navigate("/admin");
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };

//   const handleRemoveOverview = (index) => {
//     const newOverviews = [...courseData?.overviewPoints];
//     newOverviews.splice(index, 1);
//     setCourseData({ ...courseData, overviewPoints: newOverviews });
//   };

//   const handleDeleteCourse = (courseIndex) => {
//     const newCourseData = [...courseData.courses];
//     newCourseData.splice(courseIndex, 1);
//     setCourseData({ ...courseData, courses: newCourseData });
//   };

//   const openEditLesson = (course, index) => {
//     course.updateIndex = index;
//     setPopupOpen({ open: true, data: course });
//   };

//   const setEditValues = (overview, index) => {
//     overview.updateIndex = index;
//     setCurrentOverview(overview);
//   };

//   console.log(courseData);
//   return (
//     <div
//       className="course-list-cnt new-course"
//       style={{
//         // height:  popupOpen ? "100vh" :"auto",
//         overflow: popupOpen ? "hidden" : "scroll",
//       }}
//     >
//       <div className="top-header-cnt">
//         <div className="back-btn" onClick={() => navigate("/admin/degrees")}>
//           <img src={BackIcon} alt="back" className="back-icon-img" />
//         </div>
//         {editCourse ? (
//           <div className="top-btn-cnt">
//             <div
//               className=" course-delete-btn "
//               onClick={() => setEditCourse(false)}
//             >
//               Cancel Edit
//             </div>
//             <div className="add-new-lesson-btn" onClick={() => uploadCourse()}>
//               Update Course
//             </div>
//           </div>
//         ) : (
//           <div className="top-btn-cnt">
//             <div
//               className=" course-delete-btn "
//               onClick={() => deleteThisCourse()}
//             >
//               Delete Course
//             </div>
//             <div
//               className="add-new-lesson-btn"
//               onClick={() => setEditCourse(true)}
//             >
//               Edit Course
//             </div>
//           </div>
//         )}
//       </div>
//       <div className="top-header-cnt">
//         <div>
//           <h3 className="course-new-title">Course Details</h3>
//           <p className="course-new-discription">Edit course and publish</p>
//         </div>
//         {/* <div className="top-btn-cnt">
//           <div className=" course-delete-btn " onClick={() => navigate("/")}>
//             Cancel
//           </div>
//           <div className="add-new-lesson-btn" onClick={() => uploadCourse()}>
//             Save Course
//           </div>
//         </div> */}
//       </div>
//       <div className="input-split-cover">
//         <form className="left-form">
//           <div className="course-name-cnt">
//             <p>Enter course title</p>
//             <input
//               type="text"
//               name=""
//               id=""
//               className="name-input"
//               value={courseData?.title}
//               readOnly={editCourse ? false : true}
//               onChange={(e) => handledirectInput("title", e.target.value)}
//             />
//           </div>
//           <div className="course-name-cnt">
//             <p>Enter degree Description</p>
//             <input
//               type="text"
//               name=""
//               id=""
//               className="name-input"
//               value={courseData?.description}
//               readOnly={editCourse ? false : true}
//               onChange={(e) => handledirectInput("description", e.target.value)}
//             />
//           </div>
//           <div className="flex-input">
//             <div className="course-name-cnt responsive-input">
//               <p>Enter course price</p>
//               <input
//                 type="number"
//                 name=""
//                 id=""
//                 readOnly={editCourse ? false : true}
//                 value={courseData?.price !== null ? courseData?.price : ""}
//                 className="name-input price-input"
//                 placeholder="₹"
//                 onChange={(e) => handledirectInput("price", e.target.value)}
//               />
//             </div>
//             <div className="course-name-cnt">
//               <p>Upload Degree Thumbnail</p>
//               <input
//                 type="file"
//                 name=""
//                 id=""
//                 className="styled-input"
//                 readOnly={editCourse ? false : true}
//                 accept="image/*, image/svg+xml"
//                 onChange={(e) =>
//                   handledirectInput("degreeThumbnail", e.target.files[0])
//                 }
//               />
//             </div>
//           </div>
//         </form>
//         <form className="form-right">
//           <div className="form-right-header">
//             <h3 className="course-new-title form-right-heading">
//               List The Lessons
//             </h3>
//             {editCourse && (
//               <div
//                 className="add-new-lesson-btn"
//                 onClick={() => setPopupOpen({ open: true, data: null })}
//               >
//                 Add new Course
//               </div>
//             )}
//           </div>
//           <div className="lesson-list-cnt">
//             {courseData?.courses?.length > 0 ? (
//               courseData?.courses?.map((course, index) => (
//                 <div
//                   className="lesson"
//                   style={{ pointerEvents: editCourse ? "all" : "none" }}
//                   onClick={() => openEditLesson(course, index)}
//                 >
//                   <h1 className="lesson-number">{index + 1}</h1>
//                   <div className="lesson-title-cnt">
//                     <h3 className="lesson-title">{course?.title}</h3>
//                   </div>
//                   <ul className="lesson-subtitle-cnt">
//                     {course?.chapters?.map((chapter) => (
//                       <li>
//                         <p className="lesson-subtitle">{chapter?.title}</p>
//                         {/* <p className="lesson-duration-txt">
//                           duration : {chapter?.duration}
//                         </p> */}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ))
//             ) : (
//               <div className="no-lesson-cnt">
//                 <img
//                   src={Nolesson}
//                   alt="no-lesson"
//                   className="empty-lesson-img"
//                 />
//               </div>
//             )}
//           </div>
//         </form>
//       </div>
//       {popupOpen.open && (
//         // <NewLesson
//         //   addCourse={(course) => addLessontoCourse(course)}
//         //   editData={popupOpen?.data}
//         //   cancel={() => setPopupOpen({ open: false, data: null })}
//         //   removeThisCourse={(index) => handleDeleteCourse(index)}
//         //   degreeId={courseData.id}
//         // />
//         <NewCourse
//           addDegree={addLessontoCourse}
//           editData={popupOpen?.data}
//           cancel={() => setPopupOpen({ open: false, data: null })}
//           removeThisCourse={(index) => handleDeleteCourse(index)}
//         />
//       )}
//     </div>
//   );
// };

// export default Edit;


import React, { useEffect, useState } from "react";
import Trash from "../../../assets/Images/trash.png";
import EditImg from "../../../assets/Images/edit.png";
import Nolesson from "../../../assets/Images/no-lesson-illustration.svg";
import BackIcon from "../../../assets/Images/left-arrow.png";
import { useNavigate } from "react-router-dom";
import { deleteDegree, editDegree } from "../../../firebase/degreeApi";
import { toast } from "react-toastify";
import axios from "axios";
import EditCourse from "../../courses/edit-course/Edit";
import NewCourse from "../../courses/new-course/NewCourse";

const apiBaseUrl = process.env.REACT_APP_BASE_API;

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
    degreeThumbnail: null,
    courses: [],
  });

  useEffect(() => {
    if (popupOpen.open) window.scrollTo(0, 0);
  }, [popupOpen]);

  useEffect(() => {
    setCourseData(courseDetails);
  }, [courseDetails]);

  // const handledirectInput = (type, value) => {
  //   setCourseData({ ...courseData, [type]: value });
  // };

  const handleOverviewInput = (type, value) => {
    setCurrentOverview({ ...currentOverview, [type]: value });
  };

  const addNewOverview = () => {
    if (currentOverview.heading && currentOverview.content) {
      const newOverview = [...courseData.overviewPoints];
      if (
        currentOverview.updateIndex === null ||
        currentOverview.updateIndex === undefined
      ) {
        newOverview.push({
          ...currentOverview,
          updateIndex: newOverview.length > 0 ? newOverview.length : 0,
        });
      } else {
        newOverview[currentOverview.updateIndex] = currentOverview;
      }
      setCourseData({ ...courseData, overviewPoints: newOverview });
      setCurrentOverview({ heading: "", content: "", updateIndex: null });
    } else {
      toast.error("Both heading and content are required for overview.");
    }
  };

  const addCoursetoDegree = (course) => {
    const newCourses = [...courseData.courses];
    if (course.updateIndex === null) {
      courseData.push({
        ...course,
        updateIndex: newCourses?.length > 0 ? newCourses?.length : 0,
      });
      setCourseData({ ...courseData, courses: newCourses });
    } else {
      newCourses[course.updateIndex] = course;
      setCourseData({ ...courseData, courses: newCourses });
    }
    setPopupOpen({ open: false });
  };

  console.log(courseData);
  
  const uploadCourse = async () => {
    // if (
    //   !courseData.title ||
    //   !courseData.description ||
    //   courseData.price == null
    // ) {
    //   toast.error("Please fill in all required fields before updating.");
    //   return;
    // }

    // const formData = new FormData();
    // formData.append("title", courseData.title);
    // formData.append("description", courseData.description);
    // formData.append("price", courseData.price);

    // if (courseData.degreeThumbnail) {
    //   formData.append("degreeThumbnail", courseData.degreeThumbnail);
    // }

    // courseData.courses.forEach((course) => {
    //   if (course.courseThumbnail) {
    //     formData.append("courseThumbnails", course.courseThumbnail);
    //   }
    //   course.chapters.forEach((chapter) => {
    //     chapter.lessons.forEach((lesson) => {
    //       lesson.subLessons.forEach((subLesson) => {
    //         if (subLesson.subLessonFiles) {
    //           formData.append("subLessonFiles", subLesson.subLessonFiles);
    //         }
    //       });
    //     });
    //   });
    // });
    const formData = new FormData();
    // console.log(degreeData.title);
    formData.append("title", courseData.title);
    // console.log(degreeData.description);
    formData.append("description", courseData.description);
    // console.log(degreeData.price);
    formData.append("price", courseData.price);

    formData.append("degreeThumbnail", courseData.degreeThumbnail);

    courseData.courses.forEach((course) => {
      formData.append("courseThumbnails", course.courseThumbnail);
      // Append course thumbnail if available
      //  if (course.courseThumbnail) {
      //    formData.append("courseThumbnails", course.courseThumbnail);
      //  }
      course.chapters.forEach((chapter) => {
        chapter.lessons.forEach((lesson) => {
          // formData.append("lessonFiles", lesson.file);
          lesson.subLessons.forEach((subLesson) => {
            formData.append("subLessonFiles", subLesson.subLessonFiles);
          });
        });
      });
    });


    formData.append("courses", JSON.stringify(courseData.courses));

    console.log(formData);
    

    try {
      const response = await axios.put(
        `${apiBaseUrl}/api/degrees/${courseDetails._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Course updated successfully!");
      navigate("/admin/degrees");
    } catch (error) {
      toast.error("An error occurred while updating the course.");
      console.error(
        "Error updating course:",
        error.response?.data || error.message
      );
    }
  };

  const deleteThisCourse = async () => {
    const confirm = window.confirm(
      "Confirm to delete this course. All lessons associated will be lost."
    );
    if (confirm) {
      try {
        const res = await toast.promise(
          axios.delete(`${apiBaseUrl}/api/degrees/${courseDetails._id}`),
          {
            pending: "Deleting course...",
            success: "Course deleted successfully.",
            error: "Error deleting course.",
          }
        );
        if (res) navigate("/admin");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleRemoveOverview = (index) => {
    const newOverviews = [...courseData?.overviewPoints];
    newOverviews.splice(index, 1);
    setCourseData({ ...courseData, overviewPoints: newOverviews });
  };

  const handleDeleteCourse = (courseIndex) => {
    const newCourseData = [...courseData.courses];
    newCourseData.splice(courseIndex, 1);
    setCourseData({ ...courseData, courses: newCourseData });
  };

  const openEditLesson = (course, index) => {
    course.updateIndex = index;
    setPopupOpen({ open: true, data: course });
  };

  const setEditValues = (overview, index) => {
    overview.updateIndex = index;
    setCurrentOverview(overview);
  };

  // Edit lesson function
  // const handleEditLesson = (lesson, index) => {
  //   // Set the edit data with updateIndex so it can be recognized as an edit
  //   setEditLessonData({ ...lesson, updateIndex: index });
  //   setOpenLessonPopup(true); // Open the lesson popup for editing
  // };

  return (
    <div
      className="course-list-cnt new-course"
      style={{
        overflow: popupOpen.open ? "hidden" : "scroll",
      }}
    >
      <div className="top-header-cnt">
        <div className="back-btn" onClick={() => navigate("/admin/degrees")}>
          <img src={BackIcon} alt="back" className="back-icon-img" />
        </div>
        {editCourse ? (
          <div className="top-btn-cnt">
            <div
              className="course-delete-btn"
              onClick={() => setEditCourse(false)}
            >
              Cancel Edit
            </div>
            <div className="add-new-lesson-btn" onClick={() => uploadCourse()}>
              Update Course
            </div>
          </div>
        ) : (
          <div className="top-btn-cnt">
            <div
              className="course-delete-btn"
              onClick={() => deleteThisCourse()}
            >
              Delete Course
            </div>
            <div
              className="add-new-lesson-btn"
              onClick={() => setEditCourse(true)}
            >
              Edit Course
            </div>
          </div>
        )}
      </div>
      <div className="top-header-cnt">
        <div>
          <h3 className="course-new-title">Course Details</h3>
          <p className="course-new-description">Edit course and publish</p>
        </div>
      </div>
      <div className="input-split-cover">
        <form className="left-form">
          <div className="course-name-cnt">
            <p>Enter course title</p>
            <input
              type="text"
              className="name-input"
              value={courseData?.title}
              readOnly={!editCourse}
              onChange={(e) =>
                setCourseData({
                  ...courseData,
                  title: e.target.value,
                })
              }
            />
          </div>
          <div className="course-name-cnt">
            <p>Enter course description</p>
            <input
              type="text"
              className="name-input"
              value={courseData?.description}
              readOnly={!editCourse}
              onChange={(e) =>
                setCourseData({
                  ...courseData,
                  description: e.target.value,
                })
              }
            />
          </div>
          <div className="flex-input">
            <div className="course-name-cnt responsive-input">
              <p>Enter course price</p>
              <input
                type="number"
                className="name-input price-input"
                value={courseData?.price ?? ""}
                placeholder="₹"
                readOnly={!editCourse}
                onChange={(e) =>
                  setCourseData({
                    ...courseData,
                    price: e.target.value,
                  })
                }
              />
            </div>
            {/* <div className="course-name-cnt">
              <p>Upload Degree Thumbnail</p>
              
              <input
                type="file"
                className="styled-input"
                readOnly={!editCourse}
                accept="image/*"
                onChange={(e) =>
                  handledirectInput("degreeThumbnail", e.target.files[0])
                }
              />
            </div> */}

            <div className="course-name-cnt">
              <p>Upload Degree Thumbnail</p>
              {courseData?.degreeThumbnail && (
                <div className="thumbnail-preview">
                  {typeof courseData.thumbnail === "string" ? (
                    <img
                      src={courseData.thumbnail}
                      alt="Degree Thumbnail"
                      height={100}
                      width={100}
                    />
                  ) : (
                    <img
                      src={URL.createObjectURL(courseData.degreeThumbnail)}
                      alt="Degree Thumbnail"
                      height={100}
                      width={100}
                    />
                  )}
                </div>
              )}
              <input
                type="file"
                className="styled-input"
                readOnly={!editCourse}
                accept="image/*"
                onChange={(e) =>
                  setCourseData({
                    ...courseData,
                    degreeThumbnail: e.target.files[0],
                  })
                }
              />
            </div>
          </div>
        </form>
        <form className="form-right">
          <div className="form-right-header">
            <h3 className="course-new-title form-right-heading">
              List The Lessons
            </h3>
            {editCourse && (
              <div
                className="add-new-lesson-btn"
                onClick={() => setPopupOpen({ open: true, data: null })}
              >
                Add new Course
              </div>
            )}
          </div>
          <div className="lesson-list-cnt">
            {courseData?.courses?.length > 0 ? (
              courseData?.courses.map((course, index) => (
                <div
                  key={index}
                  className="lesson"
                  style={{ pointerEvents: editCourse ? "all" : "none" }}
                  onClick={() => openEditLesson(course, index)}
                >
                  <h1 className="lesson-number">{index + 1}</h1>
                  <div className="lesson-title-cnt">
                    <h3 className="lesson-title">{course?.title}</h3>
                  </div>
                  <ul className="lesson-subtitle-cnt">
                    {course?.chapters?.map((chapter, idx) => (
                      <li key={idx}>
                        <p className="lesson-subtitle">{chapter?.title}</p>
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
          </div>
        </form>
      </div>
      {popupOpen.open && (
        <NewCourse
          addDegree={addCoursetoDegree}
          editData={popupOpen?.data}
          cancel={() => setPopupOpen({ open: false, data: null })}
          removeThisCourse={(index) => handleDeleteCourse(index)}
        />
      )}
    </div>
  );
};

export default Edit;

