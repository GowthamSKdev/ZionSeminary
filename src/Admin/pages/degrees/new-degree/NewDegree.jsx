import React, { useEffect, useState } from "react";
import Nolesson from "../../../assets/Images/no-lesson-illustration.svg";
import { useNavigate } from "react-router-dom";
import NewChapter from "../../chapter/NewChapter";
// import { addDegree } from "../../../firebase/degreeApi"; // Firebase API integration for adding a degree
import { toast } from "react-toastify";
import NewCourse from "../../courses/new-course/NewCourse";
import axios from "axios";
import AddnewCourse from "../../courses/new-course/AddnewCourse";
const apiBaseUrl = process.env.REACT_APP_BASE_API;

const NewDegree = () => {
  const [popupOpen, setPopupOpen] = useState({ open: false, data: null });

  const navigate = useNavigate();
  const [degreeData, setDegreeData] = useState({
    title: "",
    description: "",
    price: null,
    thumbnail: null,
    courses: [],
    updateIndex: null,
  });

  useEffect(() => {
    if (popupOpen) window.scrollTo(0, 0);
  }, [popupOpen]);

  const handledirectInput = (type, value) => {
    setDegreeData({ ...degreeData, [type]: value });
  };

  const handleDeleteCourse = (courseIndex) => {
    const newCourses = [...degreeData.courses];
    newCourses.splice(courseIndex, 1);
    setDegreeData({ ...degreeData, courses: newCourses });
  };

  const addCoursetoDegree = (course) => {
    console.log(course);
    const newCourses = [...degreeData.courses];
    if (course.updateIndex === null) {
      newCourses.push({
        ...course,
        updateIndex: newCourses?.length > 0 ? newCourses?.length : 0,
      });
      setDegreeData({ ...degreeData, courses: newCourses });
    } else {
      newCourses[course.updateIndex] = course;
      setDegreeData({ ...degreeData, courses: newCourses });
    }
    setPopupOpen({ open: false });
  };

  const uploadDegree = async () => {
    try {
      // const formData = new FormData();
      // // console.log(degreeData.title);
      // formData.append("title", degreeData.title);
      // // console.log(degreeData.description);
      // formData.append("description", degreeData.description);
      // // console.log(degreeData.price);
      // formData.append("price", degreeData.price);

      // formData.append("degreeThumbnail", degreeData.degreeThumbnail);

      // degreeData.courses.forEach((course) => {
      //   formData.append("courseThumbnails", course.courseThumbnail);
      //   // Append course thumbnail if available
      //   //  if (course.courseThumbnail) {
      //   //    formData.append("courseThumbnails", course.courseThumbnail);
      //   //  }
      //   course.chapters.forEach((chapter) => {
      //     chapter.lessons.forEach((lesson) => {
      //       // formData.append("lessonFiles", lesson.file);
      //       lesson.subLessons.forEach((subLesson) => {
      //         formData.append("subLessonFiles", subLesson.subLessonFiles);
      //       });
      //     });
      //   });
      // });

      // console.log(degreeData);

      // formData.append("courses", JSON.stringify(degreeData?.courses));

      // // Send the final payload
      // console.log("FormData : " + formData);

      const payload = {
        title: degreeData.title,
        description: degreeData.description,
        price: degreeData.price,
        thumbnail: degreeData.thumbnail,
        courses: degreeData.courses,
      };

      const response = await axios.post(`${apiBaseUrl}/api/degrees`, payload);

      console.log("Degree added successfully:", response.data);
      toast.success("Degree added successfully!");
      navigate("/admin");
    } catch (error) {
      console.error(
        "Error uploading degree:",
        error.response?.data || error.message
      );
      toast.error("An error occurred while adding the degree.");
    }
  };
  // const uploadDegree = async () => {
  //   try {
  //     const formData = new FormData();
  //     // console.log(degreeData.title);
  //     formData.append("title", degreeData.title);
  //     // console.log(degreeData.description);
  //     formData.append("description", degreeData.description);
  //     // console.log(degreeData.price);
  //     formData.append("price", degreeData.price);

  //     formData.append("degreeThumbnail", degreeData.degreeThumbnail);

  //     degreeData.courses.forEach((course) => {
  //       formData.append("courseThumbnails", course.courseThumbnail);
  //       // Append course thumbnail if available
  //       //  if (course.courseThumbnail) {
  //       //    formData.append("courseThumbnails", course.courseThumbnail);
  //       //  }
  //       course.chapters.forEach((chapter) => {
  //         chapter.lessons.forEach((lesson) => {
  //           // formData.append("lessonFiles", lesson.file);
  //           lesson.subLessons.forEach((subLesson) => {
  //             formData.append("subLessonFiles", subLesson.subLessonFiles);
  //           });
  //         });
  //       });
  //     });

  //     console.log(degreeData);

  //     formData.append("courses", JSON.stringify(degreeData?.courses));

  //     // Send the final payload
  //     console.log("FormData : " + formData);

  //       const response = await axios.post(`${apiBaseUrl}/api/degrees`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //       // withCredentials: true,
  //     });

  //     console.log("Degree added successfully:", response.data);
  //     toast.success("Degree added successfully!");
  //     navigate("/admin");
  //   } catch (error) {
  //     console.error(
  //       "Error uploading degree:",
  //       error.response?.data || error.message
  //     );
  //     toast.error("An error occurred while adding the degree.");
  //   }
  // };

  // const uploadDegree = async () => {
  //   try {
  //     const formData = new FormData();

  //     // Append basic degree details
  //     formData.append("title", degreeData.title);
  //     formData.append("description", degreeData.description);
  //     formData.append("price", degreeData.price);

  //     // Append degree thumbnail
  //     if (degreeData.degreeThumbnail) {
  //       formData.append(
  //         "degreeThumbnail",
  //         degreeData.degreeThumbnail,
  //         degreeData.degreeThumbnail.name
  //       );
  //     }

  //     // Append courses and files
  //     degreeData.courses.forEach((course) => {
  //       if (course.courseThumbnail) {
  //         formData.append(
  //           "courseThumbnails",
  //           course.courseThumbnail,
  //           course.courseThumbnail.name
  //         );
  //       }

  //       course.chapters.forEach((chapter) => {
  //         chapter.lessons.forEach((lesson) => {
  //           lesson.subLessons.forEach((subLesson) => {
  //             if (subLesson.file) {
  //               formData.append(
  //                 "subLessonFiles",
  //                 subLesson.subLessonFiles,
  //                 subLesson.file.name
  //               );
  //             } else {
  //               console.warn("SubLesson file is missing for:", subLesson);
  //             }
  //           });
  //         });
  //       });
  //     });

  //     // Append JSON data
  //     formData.append("courses", JSON.stringify(degreeData.courses));

  //     // Log FormData contents for debugging
  //     for (let pair of formData.entries()) {
  //       console.log(pair[0], pair[1]);
  //     }

  //     // Send the request
  //     const response = await axios.post(`${apiBaseUrl}/api/degrees`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     console.log("Degree added successfully:", response.data);
  //     toast.success("Degree added successfully!");
  //     navigate("/admin");
  //   } catch (error) {
  //     console.error(
  //       "Error uploading degree:",
  //       error.response?.data || error.message || "Unknown error"
  //     );
  //     toast.error("An error occurred while adding the degree.");
  //   }
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

        setDegreeData({
          ...degreeData,
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

  console.log(degreeData);

  return (
    <div
      className="course-list-cnt new-course"
      style={{
        overflow: popupOpen.open ? "hidden" : "scroll",
      }}
    >
      <div className="top-header-cnt">
        <div>
          <h3 className="course-new-title">Create New Degree</h3>
          <p className="course-new-discription">
            Create a new degree and let's publish!
          </p>
        </div>
        <div className="top-btn-cnt">
          <div className="course-delete-btn" onClick={() => navigate("/")}>
            Cancel
          </div>
          <div className="add-new-lesson-btn" onClick={uploadDegree}>
            Save Degree
          </div>
        </div>
      </div>
      <div className="input-split-cover">
        <form className="left-form">
          <div className="course-name-cnt">
            <p>Enter degree Name</p>
            <input
              type="text"
              value={degreeData.title}
              className="name-input"
              onChange={(e) => handledirectInput("title", e.target.value)}
            />
          </div>

          <div className="course-name-cnt">
            <p>Enter degree Description</p>
            <textarea
              value={degreeData.description}
              className="name-input"
              rows="4"
              placeholder="Enter degree description here..."
              onChange={(e) => handledirectInput("description", e.target.value)}
            />
          </div>

          <div className="flex-input">
            <div className="course-name-cnt">
              <p>Enter degree price</p>
              <input
                type="number"
                value={degreeData.price !== null ? degreeData.price : ""}
                className="name-input price-input"
                placeholder="₹"
                onChange={(e) => handledirectInput("price", e.target.value)}
              />
            </div>
          </div>
          <div className="course-name-cnt">
            <p>Upload degree thumbnail</p>
            <input
              type="file"
              accept="image/png, image/svg+xml"
              // onChange={(e) => {
              //   // const file = e.target.files[0];
              //   // if (file) {
              //     setDegreeData({
              //       ...degreeData,
              //       // degreeThumbnail: file,
              //       degreeThumbnail:e.target.files[0]
              //     });
              //   // }
              // }}
              onChange={handleUploadDegreeThumbnail}
              className="styled-input"
            />
          </div>
        </form>
        <form className="form-right">
          <div className="form-right-header">
            <h3 className="course-new-title form-right-heading">Course List</h3>
            <div
              className="add-new-lesson-btn"
              onClick={() => setPopupOpen({ open: true, data: null })}
            >
              Add new course
            </div>
          </div>

          <div className="lesson-list-cnt">
            {degreeData.courses?.length > 0 ? (
              degreeData.courses.map((course, index) => (
                <div
                  key={index}
                  className="lesson"
                  onClick={() => setPopupOpen({ open: true, data: course })}
                >
                  <h1 className="lesson-number">{index + 1}</h1>
                  <div className="lesson-title-cnt">
                    <h3 className="lesson-title">{course?.title}</h3>
                  </div>
                  {/* <ul className="lesson-subtitle-cnt">
                    {course?.lessons?.map((sublesson, idx) => (
                      <li key={idx}>
                        <p className="lesson-subtitle">{sublesson?.name}</p>
                      </li>
                    ))}
                  </ul> */}
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

export default NewDegree;
