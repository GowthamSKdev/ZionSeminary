


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
      newCourses.push({
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
    
    



    try {
      
      const payload = {
        title: courseData.title,
        description: courseData.description,
        price: courseData.price,
        thumbnail: courseData.thumbnail,
        courses: courseData.courses,
      };

      const response = await axios.put(
        `${apiBaseUrl}/api/degrees/${courseDetails._id}`,
        payload
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
        if (res) navigate("/admin/degrees");
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


   const handleUploadDegreeThumbnail = async (e) => {
     try {
       const file = e.target.files[0];
       if (!file) {
         toast.error("No file selected.");
         return;
       }

       // Show loading toast while uploading
       const toastId = toast.loading("Uploading file...");

       const formData = new FormData();
       formData.append("file", file);

       const res = await axios.post(`${apiBaseUrl}/api/upload/type`, formData, {
         headers: {
           "Content-Type": "multipart/form-data",
         },
         // Optionally handle progress for better UX
         onUploadProgress: (progressEvent) => {
           if (progressEvent.total > 0) {
             const progress = Math.round(
               (progressEvent.loaded / progressEvent.total) * 100
             );
             toast.update(toastId, {
               render: `Uploading: ${progress}%`,
               type: "info", // You can use "info" type to show progress.
               isLoading: true,
               autoClose: false,
             });
           }
         },
       });

       // Check if the upload was successful
       if (res.status === 200) {
         toast.update(toastId, {
           render: "File uploaded successfully.",
           type: "success",
           isLoading: false,
           autoClose: 3000, // Automatically closes after 3 seconds
         });

           setCourseData({
             ...courseData,
             thumbnail: res.data.fileUrl, // Assuming filePath is the response key
             // fileType: res.data.fileType,
           });
       }
     } catch (error) {
       toast.update(toastId, {
         render: "Error uploading file.",
         type: "error",
         isLoading: false,
         autoClose: 3000,
       });
       console.error("File upload error:", error);
     }
   };



  

  return (
    <div
      className="course-list-cnt new-course"
      // style={{
      //   overflow: popupOpen.open ? "hidden" : "scroll",
      // }}
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
              <div className="flex-2">
                <label htmlFor="">Rs.</label>
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
                // onChange={(e) =>
                //   setCourseData({
                //     ...courseData,
                //     degreeThumbnail: e.target.files[0],
                //   })
                // }
                onChange={handleUploadDegreeThumbnail}
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

