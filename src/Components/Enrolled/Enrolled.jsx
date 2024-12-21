// import React, { useState, useEffect } from "react";
// // import axios from "axios";
// import "../Degrees/Degrees.css";
// import "./Enrolled.css"
// import { useNavigate } from "react-router-dom";
// import imgd from "../Assets/Images/imagenotxt2.png";
// import LoadingPage from "../LoadingPage/LoadingPage";
// import ErrorDataFetchOverlay from "../Error/ErrorDataFetchOverlay";
// // import courseDataJson from "../Assets/Data/CourseList.json";
// import courseDataJson from "./sampleEnrolledData.json";
// import { getEnrolledCourses } from "../../Admin/firebase/userApi";
// import { getCourseById } from "../../Admin/firebase/degreeApi";
// import axios from "axios";
// import { Lock, Unlock } from "lucide-react";
// const Enrolled = () => {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(true);
//   const [allLessons, setAllLessons] = useState([]);
//   const [coursesData, setCoursesData] = useState([]);
//   const [fetchError, setFetchError] = useState(false);
//   const [selectedFilters, setSelectedFilters] = useState([]);
//   const [hasPurchasedCourses, setHasPurchasedCourses] = useState(true);

//   const userInfo = JSON.parse(localStorage.getItem("userdata"));
//   const userId = userInfo.id;

//   // const fetchData = async () => {
//   //   const res = await axios.get(`api/user/${userId}/enrolled`)
//   //   console.log(res);

//   // }
//   // fetchData()
//   // useEffect(() => {
//   //   const fetchdata = async () => {
//   //     // const res = await getEnrolledCourses(userId)
//   //     // console.log(res);
//   //     // const EnrolledCourseId = res.map(e=>e.courseId)
//   //     // const courseDetails = await getCourseById(EnrolledCourseId)
//   //     // console.log(courseDetails);
//   //     // const enrolledCourses = await getEnrolledCourses(userId);
//   //     // const enrolledCourseIds = enrolledCourses?.map(
//   //     //   (course) => course.courseId
//   //     // );
//   //     // const courseDetails = await getCourseById(enrolledCourseIds);

//   //     // setCoursesData(courseDetails);
//   //     const enrolledCourses = await getEnrolledCourses(userId);
//   //     // const enrolledCourseIds = enrolledCourses.map(
//   //     //   (course) => course.courseId
//   //     // );
//   //     // const enrolldedDegreeId = enrolledCourses.map((degree) => degree.degreeId)
//   //     // // console.log(degreeId,enrolledCourseIds);

//   //     // const courseDetails = [];
//   //     // for (const courseId of enrolledCourseIds) {
//   //     //   // console.log("Fetching course with ID:",{degreeId,courseId});
//   //     //   const courseDetail = await getCourseById(degreeId,courseId);
//   //     //   courseDetails.push(courseDetail);
//   //     // }
//   //     // console.log(courseDetails);

//   //     const courseDetails = [];
//   //     for (const enrolledCourse of enrolledCourses) {
//   //       const { courseId, degreeId } = enrolledCourse; // Destructure courseId and degreeId
//   //       try {
//   //         console.log(
//   //           `Fetching course with ID: ${courseId} and degree ID: ${degreeId}`
//   //         );
//   //         const courseDetail = await getCourseById(courseId, degreeId); // Pass both IDs
//   //         courseDetails.push(courseDetail);
//   //       } catch (error) {
//   //         console.warn(
//   //           `Error fetching course with ID ${courseId}:`,
//   //           error.message
//   //         );
//   //       }
//   //     }
//   //     console.log(courseDetails);

//   //   };
//   //   fetchdata();
//   // }, []);

//   // useEffect(() => {
//   //   const fetchEnrolledCourses = async () => {
//   //     try {
//   //       const enrolledCourses = await getEnrolledCourses(userId); // Fetch enrolled courses
//   //       console.log("Enrolled Courses:", enrolledCourses);

//   //       const courseDetails = [];
//   //       for (const enrolledCourse of enrolledCourses) {
//   //         const { courseId, degreeId } = enrolledCourse; // Destructure courseId and degreeId

//   //         // Log the values before calling the API
//   //         console.log(`Course ID: ${courseId}, Degree ID: ${degreeId}`);

//   //         try {
//   //           if (degreeId) {
//   //             console.log(
//   //               `Fetching course with Course ID: ${courseId} and Degree ID: ${degreeId}`
//   //             );
//   //             const courseDetail = await getCourseById(courseId, degreeId); // Pass both IDs
//   //             courseDetails.push(courseDetail);
//   //           } else {
//   //             console.warn(
//   //               "Degree ID is null or undefined for course:",
//   //               courseId
//   //             );
//   //           }
//   //         } catch (error) {
//   //           console.warn(
//   //             `Error fetching course with ID ${courseId}:`,
//   //             error.message
//   //           );
//   //         }
//   //       }

//   //       setCoursesData(courseDetails);
//   //     } catch (error) {
//   //       console.error("Error fetching enrolled courses:", error);
//   //       setFetchError(true);
//   //     } finally {
//   //       setIsLoading(false);
//   //     }
//   //   };

//   //   if (userId) fetchEnrolledCourses();
//   //   else setFetchError(true);
//   // }, [userId]);

//   // console.log();

//   // useEffect(() => {
//   //   // try {

//   //   // } catch (error) {

//   //   // }
//   //   // const resUpdateCourseDetails = localStorage.getItem('updatecourse')
//   //   // const updateCourseDetail = JSON.parse(resUpdateCourseDetails);
//   //   // const courseId = updateCourseDetail.map((course)=>course.courseId)
//   //   // console.log(courseId);
//   //   setIsLoading(false);
//   //   const degreeData = courseDataJson.map((degree) => degree.courses);
//   //   setCoursesData(degreeData);
//   // }, []);
//   // console.log(coursesData);

//   // useEffect(() => {
//   //   const processCoursesData = () => {
//   //     const degreeData = courseDataJson.map((degree) => degree.courses).flat(); // Flatten if courses are nested arrays
//   //     setCoursesData(degreeData);
//   //     setIsLoading(false); // Set loading to false after processing
//   //   };

//   //   processCoursesData();
//   // }, []);

//   // useEffect(() => {
//   //   const fetchUser = async () => {
//   //     const LoginUser = JSON.parse(localStorage.getItem('userdata'))
//   //     const res = await axios.get('/api/users')
//   //     const { users } = res.data
//   //     const CurrentUser = users.find(user => user.id == LoginUser.id)
//   //     console.log(CurrentUser);

//   //     console.log(users);
//   //    }
//   //   fetchUser()
//   // }, [])

//   // useEffect(() => {
//   //   const fetchUser = async () => {
//   //     try {
//   //       const LoginUser = JSON.parse(localStorage.getItem("userdata")); // Retrieve logged-in user from localStorage
//   //       const res = await axios.get("/api/users"); // Fetch users data from the API
//   //       const { users } = res.data;
//   //       const CurrentUser = users.find((user) => user.id === LoginUser.id); // Find the logged-in user
//   //       // console.log(users.id===user.id);

//   //       console.log(LoginUser.id);

//   //       console.log("CurrentUser:", CurrentUser);
//   //       // console.log("All users:", users);

//   //       if (CurrentUser && CurrentUser.ApplyingFor) {
//   //         const degreeRes = await axios.get(
//   //           `/api/degrees/${CurrentUser.ApplyingFor.degreeId}`
//   //         ); // Fetch degree details using the degreeId
//   //         // const CurrentDegree = degreeRes.data; // Store the degree details
//   //         setCoursesData(degreeRes.data)
//   //         console.log("CurrentDegree:", degreeRes);

//   //         // Here you can save or set the degree details to state if needed
//   //         // For example, if you're using React state:
//   //         // setCurrentDegree(CurrentDegree);
//   //       }
//   //     } catch (error) {
//   //       console.error("Error fetching user or degree:", error);
//   //     }
//   //   };
//   //   fetchUser();
//   // }, []);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const LoginUser = JSON.parse(localStorage.getItem("userdata")); // Retrieve logged-in user from localStorage
//         // if (!LoginUser) {
//         //   console.error("LoginUser is not found in localStorage.");
//         //   return;
//         // }
//         console.log(LoginUser);

//         const userData = await axios.get(`/api/users/${LoginUser.id}`); // Fetch users data from the API
//         const { user } = userData.data;
//         const userDegree = user.applyingFor;
//         console.log(userDegree.degreeId);

//         const degreeData = await axios.get(
//           `/api/degrees/${userDegree.degreeId}`
//         );
//         const degree = degreeData.data.degree;
//         console.log(degree);
//         setIsLoading(false)
//         setFetchError(false)
//         setCoursesData(degree.courses);
        
//         // You can save or set the degree details here if needed
//         // For example, if you're using React state:
//         // setCurrentDegree(CurrentDegree);
//       } catch (error) {
//         setIsLoading(false)
//         setFetchError(false)
//         console.error("Error fetching user or degree:", error);
//       }
//     };

//     fetchUser();
//   }, []);

//   // useEffect(() => {
//   //   // console.log(coursesData); // Logs updated coursesData
//   // }, [coursesData]);

//   // console.log(coursesData);
//   // console.log(degreeData);
//   // const courseData = degreeData.map(course => )

//   // Data Fetching
//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

//   //       const coursesResponse = await axios.get(`${apiBaseUrl}/courseDetail`);

//   //       const allCourses = coursesResponse.data;

//   //       // isUserLogin ?
//   //       const userInfo = JSON.parse(localStorage.getItem("userDataUpdated"));
//   //       // console.log(userInfo);
//   //       if (userInfo) {
//   //         const { coursePurchased } = userInfo;
//   //         const courseIds = coursePurchased.map((course) => course.courseId);

//   //         // Checking course vangiyacha ?
//   //         if (
//   //           courseIds.length === 0 ||
//   //           (courseIds.length === 1 &&
//   //             (courseIds[0] === "" || courseIds[0] === null))
//   //         ) {
//   //           setHasPurchasedCourses(false);
//   //         } else {
//   //           setHasPurchasedCourses(true);
//   //         }

//   //         // Filtering
//   //         const filteredCourses = allCourses.filter((course) =>
//   //           courseIds.includes(course._id)
//   //         );
//   //         setCoursesData(filteredCourses);
//   //       } else {
//   //         setFetchError(true);
//   //         alert("User not logged in, Go to Profile page");
//   //         console.log("No user info found in localStorage");
//   //       }

//   //       setIsLoading(false);
//   //     } catch (error) {
//   //       setFetchError(true);
//   //       setIsLoading(false);
//   //     }
//   //   };
//   //   fetchData();
//   // }, []);

//   // useEffect(() => {
//   //   const getAllLessons = () => {
//   //     let lessons = [];
//   //     coursesData.forEach((course) => {
//   //       course.lessons.forEach((lesson) => {
//   //         if (!lessons.includes(lesson.title)) {
//   //           lessons.push(lesson.title);
//   //         }
//   //       });
//   //     });

//   //     // Random
//   //     for (let i = lessons.length - 1; i > 0; i--) {
//   //       const j = Math.floor(Math.random() * (i + 1));
//   //       [lessons[i], lessons[j]] = [lessons[j], lessons[i]];
//   //     }
//   //     return lessons.slice(0, 10);
//   //   };

//   //   if (coursesData.length > 0) {
//   //     setAllLessons(getAllLessons());
//   //   }
//   // }, [coursesData]);

//   const resolveImagePath = (imagePath) => {
//     if (
//       imagePath &&
//       (imagePath.startsWith("http://") || imagePath.startsWith("https://"))
//     ) {
//       return imagePath;
//     }
//     // else if (imagePath && imagePath.startsWith("base64")) {
//     //   return imgd;
//     // }
//     else {
//       try {
//         return require(`../Assets/Images/${imagePath}`);
//       } catch (error) {
//         return imgd;
//       }
//     }
//   };

//   // const filterCourses = (filters) => {
//   //   try {
//   //     if (filters.length === 0) {
//   //       return coursesData;
//   //     } else {
//   //       return coursesData.filter((course) =>
//   //         course.lessons.some((lesson) => filters.includes(lesson.title))
//   //       );
//   //     }
//   //   } catch (err) {
//   //     console.log(err);
//   //     setFetchError(true);
//   //     return [];
//   //   }
//   // };

//   // const handleFilterClick = (filter) => {
//   //   if (selectedFilters.includes(filter)) {
//   //     setSelectedFilters(selectedFilters.filter((f) => f !== filter));
//   //   } else {
//   //     setSelectedFilters([...selectedFilters, filter]);
//   //   }
//   // };

//   // const clearFilters = () => {
//   //   setSelectedFilters([]);
//   // };

//   // const truncateDescription = (description) => {
//   //   const words = description?.split(" ");
//   //   const truncated = words?.slice(0, 15).join(" ");
//   //   return truncated;
//   // };
//   const truncateDescription = (description) => {
//     const words = description.split(" ");
//     const truncated = words.slice(0, 15).join(" ");
//     return truncated;
//   };

//   // if (isLoading) {
//   //   return (
//   //     <div>
//   //       <LoadingPage />
//   //     </div>
//   //   );
//   // }

//   // if (!fetchError) {
//   //   return <ErrorDataFetchOverlay />;
//   // }

//     const isCompleted = false;

//   return (
//     <>
//       <div className="main-content">
//         <div className="cardContainer3">
//           <h2>Enrolled Courses</h2>
//           {!hasPurchasedCourses && (
//             <h3>No courses have been purchased. Please purchase a course.</h3>
//           )}

//           {/* <div className="filterChips">
//             {allLessons.map((lesson, index) => (
//               <div
//                 key={index}
//                 className={`filterChip ${
//                   selectedFilters.includes(lesson) ? "active" : ""
//                 }`}
//                 onClick={() => handleFilterClick(lesson)}
//               >
//                 {lesson}
//               </div>
//             ))}
//             {selectedFilters.length > 0 && (
//               <button className="clearFilters" onClick={clearFilters}>
//                 Clear All
//               </button>
//             )}
//           </div> */}
//           <div className="courseContainer3">
//             {/* {filterCourses(selectedFilters).map((course) => (
//               <div className="courseCard3" key={course._id}>
//                 <div className="courseOverlay3">
//                   <div className="courseImageBox3">
//                     <img
//                       // src={imgd}
//                       src={course.image ? resolveImagePath(course.image) : imgd}
//                       alt={course.title}
//                       className="courseImage3"
//                     />
//                     <div className="courseImageTxt3">{course.title}</div>
//                   </div>
//                   <div className="courseDetails3">
//                     <p>{truncateDescription(course.description)}...</p>
//                     <button className="courseDetailBtn3">View Details</button>
//                   </div>
//                 </div>
//                 <div className="courseLessonBox3">
//                   <h5>Lessons</h5>
//                   <ul>
//                     {course.lessons.slice(0, 3).map((lesson, index) => (
//                       <li key={index}>{lesson.title}</li>
//                     ))}
//                     {course.lessons.length > 3 && <li>...and more</li>}
//                   </ul>
//                   <button
//                     onClick={() =>
//                       navigate(`/home/courseContent/${course._id}`)
//                     }
//                     className="lessonDetailBtn3"
//                   >
//                     View Course
//                   </button>
//                 </div>
//               </div>
//             ))} */}
//             {/* { console.log(coursesData.courses )} */}
//             {coursesData.map((course) => {
//               // console.log(course);

//               return (
//                 <>
//                   <div className="courseCard3" key={course._id}>
//                     <div className="courseOverlay3">
//                       <div className="courseImageBox3">
//                         <img
//                           src={imgd}
//                           // src={
//                           //   course.thumbnail
//                           //      ? resolveImagePath(course.thumbnail)
//                           //     : imgd
//                           // }
//                           alt={course.title}
//                           className="courseImage3"
//                         />
//                         <div className="courseImageTxt3">{course.title}</div>
//                       </div>
//                       <div className="courseDetails3">
//                         {course.description}
//                         <p>{truncateDescription(course.description)}...</p>
//                         <button className="courseDetailBtn3">
//                           View Details
//                         </button>
//                       </div>
//                     </div>
//                     <div className="courseLessonBox3">
//                       <h5>Chapters</h5>
//                       <ul>
//                         {course?.chapters?.slice(0, 3).map((chapter, index) => (
//                           <li key={index}>{chapter.title}</li>
//                         ))}
//                         {course?.chapters?.length > 3 && <li>...and more</li>}
//                       </ul>
//                       <button
//                         onClick={() =>
//                           navigate(`/home/courseContent/${course.id}`, {
//                             state: course,
//                           })
//                         }
//                         className="lessonDetailBtn3"
//                       >
//                         View Course
//                       </button>
//                     </div>
//                   </div>
//                 </>
//               );
//             })}

//             {coursesData.map((course) => {
//               return (
//                 <div className="" key={course._id}>
//                   <div className="zion-card">
//                     <div className="zion-course-card">
//                       <img src={imgd} alt={course.title} />
//                       <div className="zion-course-content">
//                         <h3 className="zion-course-title">{course.title}</h3>
//                         <p className="zion-course-description">
//                           {course.description}
//                         </p>
//                         <div className="">
//                           {/* <button
//                             className="btn btn-primary"
//                             onClick={() =>
//                               navigate(`/home/courseContent/${course.id}`, {
//                                 state: course,
//                               })
//                             }
//                           ></button> */}
//                           <button
//                             className={`btn ${
//                               isCompleted ? "btn-success" : "btn-danger"
//                               }`}
                            
//                             onClick={() =>
//                               navigate(`/home/courseContent/${course.id}`, {
//                                 state: course,
//                               })
//                             }
                            
//                           >
//                             {isCompleted ? <Unlock /> : <Lock />}
//                             {isCompleted ? " Unlock" : " Locked"}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Enrolled;





import React, { useState, useEffect } from "react";
// import axios from "axios";
import "../Degrees/Degrees.css";
import "./Enrolled.css"
import { useNavigate } from "react-router-dom";
import imgd from "../Assets/Images/imagenotxt2.png";
import LoadingPage from "../LoadingPage/LoadingPage";
import ErrorDataFetchOverlay from "../Error/ErrorDataFetchOverlay";
// import courseDataJson from "../Assets/Data/CourseList.json";
import courseDataJson from "./sampleEnrolledData.json";
import { getEnrolledCourses } from "../../Admin/firebase/userApi";
import { getCourseById } from "../../Admin/firebase/degreeApi";
import axios from "axios";
import { Lock, Unlock } from "lucide-react";
const Enrolled = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [allLessons, setAllLessons] = useState([]);
  const [coursesData, setCoursesData] = useState([]);
  const [fetchError, setFetchError] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [hasPurchasedCourses, setHasPurchasedCourses] = useState(true);

  const userInfo = JSON.parse(localStorage.getItem("userdata"));
  const userId = userInfo.id;

   const apiBaseUrl = process.env.BASE_API

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const LoginUser = JSON.parse(localStorage.getItem("userdata")); // Retrieve logged-in user from localStorage
        // if (!LoginUser) {
        //   console.error("LoginUser is not found in localStorage.");
        //   return;
        // }
        console.log(LoginUser);

        // const userData = await axios.get(`/api/users/${LoginUser.id}`); // Fetch users data from the API
        // const { user } = userData.data;
        // const userDegree = user.applyingFor;
        // console.log(userDegree.degreeId);

        
        const degreeData = await axios.get(
          `${apiBaseUrl}/api/degrees/${LoginUser.applyingFor}`
        );
        const degree = degreeData.data.degree;
        console.log(degree);
        setIsLoading(false)
        setFetchError(false)
        setCoursesData(degree.courses);
        
        // You can save or set the degree details here if needed
        // For example, if you're using React state:
        // setCurrentDegree(CurrentDegree);
      } catch (error) {
        setIsLoading(false)
        setFetchError(false)
        console.error("Error fetching user or degree:", error);
      }
    };

    fetchUser();
  }, []);


  const resolveImagePath = (imagePath) => {
    if (
      imagePath &&
      (imagePath.startsWith("http://") || imagePath.startsWith("https://"))
    ) {
      return imagePath;
    }
    // else if (imagePath && imagePath.startsWith("base64")) {
    //   return imgd;
    // }
    else {
      try {
        return require(`../Assets/Images/${imagePath}`);
      } catch (error) {
        return imgd;
      }
    }
  };

  

 
  const truncateDescription = (description) => {
    const words = description.split(" ");
    const truncated = words.slice(0, 15).join(" ");
    return truncated;
  };

  // if (isLoading) {
  //   return (
  //     <div>
  //       <LoadingPage />
  //     </div>
  //   );
  // }

  // if (!fetchError) {
  //   return <ErrorDataFetchOverlay />;
  // }

    const isCompleted = true;

  return (
    <>
      <div className="main-content">
        <div className="cardContainer3">
          <h2>Enrolled Courses</h2>
          {!coursesData && (
            <h3>No courses have been purchased. Please purchase a course.</h3>
          )}

          
          <div className="courseContainer3">
            
            {/* {coursesData.map((course) => {
              // console.log(course);

              return (
                <>
                  <div className="courseCard3" key={course._id}>
                    <div className="courseOverlay3">
                      <div className="courseImageBox3">
                        <img
                          src={imgd}
                          
                          alt={course.title}
                          className="courseImage3"
                        />
                        <div className="courseImageTxt3">{course.title}</div>
                      </div>
                      <div className="courseDetails3">
                        {course.description}
                        <p>{truncateDescription(course.description)}...</p>
                        <button className="courseDetailBtn3">
                          View Details
                        </button>
                      </div>
                    </div>
                    <div className="courseLessonBox3">
                      <h5>Chapters</h5>
                      <ul>
                        {course?.chapters?.slice(0, 3).map((chapter, index) => (
                          <li key={index}>{chapter.title}</li>
                        ))}
                        {course?.chapters?.length > 3 && <li>...and more</li>}
                      </ul>
                      <button
                        onClick={() =>
                          navigate(`/home/courseContent/${course.id}`, {
                            state: course,
                          })
                        }
                        className="lessonDetailBtn3"
                      >
                        View Course
                      </button>
                    </div>
                  </div>
                </>
              );
            })} */}

            {coursesData.map((course) => {
              return (
                <div className="" key={course._id}>
                  <div className="zion-card">
                    <div className="zion-course-card">
                      <img src={imgd} alt={course.title} />
                      <div className="zion-course-content">
                        <h3 className="zion-course-title">{course.title}</h3>
                        <p className="zion-course-description">
                          {course.description}
                        </p>
                        <div className="">
                          {/* <button
                            className="btn btn-primary"
                            onClick={() =>
                              navigate(`/home/courseContent/${course.id}`, {
                                state: course,
                              })
                            }
                          ></button> */}
                          <button
                            className={`btn ${
                              isCompleted ? "btn-success" : "btn-danger"
                              }`}
                            
                            onClick={() =>
                              navigate(`/home/courseContent/${course.id}`, {
                                state: course,
                              })
                            }

                          >
                            {isCompleted ? <Unlock /> : <Lock />}
                            {isCompleted ? " Unlock" : " Locked"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Enrolled;
