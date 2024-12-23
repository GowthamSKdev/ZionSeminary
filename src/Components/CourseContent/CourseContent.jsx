import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./CourseContent.css";
import tick from "../Assets/SVG/tick.svg";
import ErrorDataFetchOverlay from "../Error/ErrorDataFetchOverlay";
import LoadingPage from "../LoadingPage/LoadingPage";
import ProgressBar from "../ProgressBar/ProgressBar";
import { Accordion, AccordionItem } from "react-bootstrap";
import axios from "axios";

const CourseContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const courseDetails = location.state;
  // console.log(courseDetails);

  const { courseId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [courseData, setCourseData] = useState({});
  const [fetchError, setFetchError] = useState(false);
  const [fetchedID, setFetchedID] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [currentCourseData, setCurrentCourseData] = useState({});

  // nxt btn
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(-1);
  const [activeAccordion, setActiveAccordion] = useState(null);

  const [currentSlide, setCurrentSlide] = useState(1);
  const [totalSlides, setTotalSlides] = useState(0);

  // progress
  const [completedExercises, setCompletedExercises] = useState(new Set());
  const [watchedVideoTitles, setWatchedVideoTitles] = useState([]);

  // api data
  const [completedUserData, setCompletedUserData] = useState([]);


  const apiBaseUrl = process.env.REACT_APP_BASE_API;

  // const apiBaseUrl = process.env

  const userInfo = JSON.parse(localStorage.getItem("userdata"));
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const res =
        setCourseData(courseDetails);
        // console.log(courseData);
        // console.log(userInfo);
        if (userInfo) {
          const userID = userInfo._id;
          setUserId(userID);
          // console.log(userID);
        } else {
          setFetchError(true);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching course details:", error);
        setIsLoading(false);
        setFetchError(true);
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    const fetchCompletedVideos = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(`${apiBaseUrl}/api/users/progress/${userInfo._id}/${userInfo.applyingFor}`);
          // const response = await getCompletionDetails(userId, courseId);
        console.log('recevice complete', response);
      const {data} = response;

        if (data.length > 0) {
          const firstItem = data[0];
          const completedTitles = courses;

          const completedSet = new Set(
            firstItem.completedVideos.flatMap((videoTitle) =>
              courseData.chapters.flatMap((chapter, chapterIndex) =>
                chapter.lesson.flatMap((video, videoIndex) =>
                  video.title === videoTitle
                    ? [`${chapterIndex}-${videoIndex}`]
                    : []
                )
              )
            )
          );
            // const completedSet = new Set(
            //   firstItem.completedVideos.flatMap((videoTitle) =>
            //     courseData.chapters.flatMap((chapter, chapterIndex) =>
            //       chapter.lessons.flatMap((video, videoIndex) =>
            //         video.title === videoTitle
            //           ? `${chapterIndex}-${videoIndex}`
            //           : []
            //       )
            //     )
            //   )
            // );
          setCompletedExercises(completedSet);
          setFetchedID(firstItem.id);
          setWatchedVideoTitles(completedTitles);
        } else {
          console.log("No completed videos found.");
          setCompletedUserData([]);
          setWatchedVideoTitles([]);
          setCompletedExercises(new Set());
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            setCompletedUserData([]);
            setWatchedVideoTitles([]);
            setCompletedExercises(new Set());

            try {
              const payload = {
                userId:userInfo._id,
                degreeId:userInfo.applyingFor,
                // completedVideos: [],
                courseId:courseData._id,
                // courseDataIndex: courseData,
                currentLessonIndex,
                currentVideoIndex
              }
              const res = 
                await axios.post(`${apiBaseUrl}/api/users/progress`,payload
              //     {
              //   // userId,
              //   // courseId,
              //   // completedVideos: [],
              // }
              )
              console.log(res);
              
              // await markLessonAsCompleted({
              //   userId,
              //   courseId,
              //   completedVideos: [],
              // });
            } catch (postError) {
              console.error(
                "Error creating new completed video entry:",
                postError
              );
            }
          } else {
            console.error(
              "Error fetching completed videos:",
              err.response.data.message || err.message || err
            );
          }
        }
      }
    };
    fetchCompletedVideos();
  }, []);


  const progress_data = () => {
    // Calculate total exercises and progress percentage
    const totalExercises = courseData.chapters?.reduce(
      (total, chapter) => total + chapter.lessons?.length,
      0
    );

    const progress_percentage =
      totalExercises > 0 ? (completedExercises.size / totalExercises) * 100 : 0;

    const watchedPercentage = progress_percentage;

    // Log progress to check
    console.log("Progress:", watchedPercentage, "%");

    // You can store the progress in localStorage or update the UI here
    localStorage.setItem(`courseProgress-${courseId}`, watchedPercentage);
  };

//   const progress_data = () => {
//     const totalExercises = courseData.chapters?.reduce(
//       (total, chapter) => total + chapter.lesson?.length,
//       0
//     );
//     const progress =
//       totalExercises > 0 ? (completedExercises.size / totalExercises) * 100 : 0;
//  localStorage.setItem(`courseProgress-${courseId}`, progress);
//   }


  const handleLessonComplete = (lessonIndex, chapterIndex) => {
    progress_data(lessonIndex, chapterIndex);
  };

  const handleLessonClick = (index) => {
    setActiveLesson(index === activeLesson ? null : index);
    setActiveAccordion(index === activeLesson ? null : index);
  };

  // Example: Call this function after a user completes a chapter
  handleLessonComplete(currentLessonIndex, currentVideoIndex);


    // const handleNext = async () => {
    //   if (courseData.lessons) {
    //     const currentLesson = courseData.lessons[currentLessonIndex];

    //     if (currentLessonIndex === 0 && currentVideoIndex === -1) {
    //       // If it's the first lesson and no video has been viewed yet, load the first video
    //       handleCurrentContent(currentLesson.chapter[0], currentLessonIndex, 0);
    //       // Update progress state
    //       setCurrentVideoIndex(0);
    //     } else if (currentVideoIndex < currentLesson.chapter.length - 1) {
    //       // If there are more videos in the current lesson, load the next video
    //       handleCurrentContent(
    //         currentLesson.chapter[currentVideoIndex + 1],
    //         currentLessonIndex,
    //         currentVideoIndex + 1
    //       );
    //       // Update progress state
    //       setCurrentVideoIndex(currentVideoIndex + 1);
    //     } else if (currentLessonIndex < courseData.lessons.length - 1) {
    //       // If this is the last video in the current lesson, move to the next lesson
    //       const nextLesson = courseData.lessons[currentLessonIndex + 1];
    //       handleCurrentContent(
    //         nextLesson.chapter[0],
    //         currentLessonIndex + 1,
    //         0
    //       );
    //       // Update progress state
    //       setCurrentLessonIndex(currentLessonIndex + 1);
    //       setCurrentVideoIndex(0); // Reset to first video of the next lesson
    //     }
    //   }
  // };
  
    const handleNext = async () => {
      if (courseData.chapters) {
        const currentLesson = courseData.chapters[currentLessonIndex];

        if (currentLessonIndex === 0 && currentVideoIndex === -1) {
          // If it's the first lesson and no video has been viewed yet, load the first video
          // handleCurrentContent(currentLesson?.lesson[0], currentLessonIndex, 0);
          handleCurrentContent(currentLesson?.lessons[0], currentLessonIndex, 0);
          // Update progress state
          setCurrentVideoIndex(0);
        } else if (currentVideoIndex < currentLesson.lessons?.length - 1) {
          // If there are more videos in the current lesson, load the next video
          handleCurrentContent(
            currentLesson.lessons[currentVideoIndex + 1],
            currentLessonIndex,
            currentVideoIndex + 1
          );
          // Update progress state
          setCurrentVideoIndex(currentVideoIndex + 1);
        } else if (currentLessonIndex < courseData.chapters.length - 1) {
          // If this is the last video in the current lesson, move to the next lesson
          const nextLesson = courseData.chapters[currentLessonIndex + 1];
          handleCurrentContent(
            nextLesson.lessons[0],
            currentLessonIndex + 1,
            0
          );
          // Update progress state
          setCurrentLessonIndex(currentLessonIndex + 1);
          setCurrentVideoIndex(0); // Reset to first video of the next lesson
        }
      }
  };
  






  const handleCurrentContent = async (data, lessonIndex, exerciseIndex) => {
    console.log("Selected Content Data:", data);

    // Prepare modified data for the current course content
    const modifiedData = {
      ...data,
      exerciseNo: exerciseIndex + 1,
      chapter: lessonIndex + 1,
      type: data.type,
      // type: fileType,
      link: data.link,
      duration: data.duration,
    };

    // Update the current course data and UI state
    setCurrentCourseData(modifiedData);
    setCurrentLessonIndex(lessonIndex);
    setCurrentVideoIndex(exerciseIndex);
    setActiveAccordion(lessonIndex);

    // console.log("Current content set:", modifiedData);
  };

  const renderContent = (
    link,
    typeManual,
    data,
    lessonIndex,
    exerciseIndex
  ) => {
    if (typeManual === "video/mp4") {
      return (
        <>
          <div className="embed-responsive-item">
            {/* <video src={link} title={courseData.title || "Video Title"}> */}
            <video
              controls
              onEnded={() => {
                handleMediaEnd(data, lessonIndex, exerciseIndex);
              }}
              style={{ maxWidth: "100%", width: "100%", borderRadius: "1em" }}
            >
              {/* <source src={link} type="video/mp4" /> */}
              {/* <source src={link} type="video/mkv" /> */}
              <source src={link ? `${link}` : "/test.mp4"} type="video/mp4" />
            </video>
          </div>
        </>
      );
    } else if (typeManual === "audio/mpeg") {
      
      return (
        <>
          <div className="embed-responsive-item">
            <img
              src={courseData.thumbnail}
              alt=""
              style={{
                maxWidth: "100%",
                display: "block",
                width: "100%",
                height: "400px",
                objectFit: "fill",
                borderRadius: "1em",
              }}
            />
            <audio
              controls
              style={{ width: "100%", marginTop: "1em" }}
              onEnded={() =>
              {

                handleMediaEnd(
                  { title: `${data?.title}` },
                  lessonIndex,
                  exerciseIndex
                )
              }
              }
            >
              <source src={link} type="audio/mp3" />
            </audio>
          </div>
        </>
      );
    } else if (typeManual === "pdf") {
      return (
        <>
          <div className="embed-responsive-item">
            <object
              data={`${link}#view=FitH`}
              type="application/pdf"
              height={500}
              // contentEditable
              width={"100%"}
              style={{ height: "400px", borderRadius: "1em" }}
            ></object>
          </div>
          <div className="MarkAsCompleted">
            <button
              className="NextBtn"
              onClick={() =>
                handleMediaEnd(
                  { title: `${data?.title}` },
                  // data,
                  lessonIndex,
                  exerciseIndex
                )
              }
            >
              {" "}
              Mark as Completed
            </button>
          </div>
        </>
      );
    } else if (typeManual === "ppt") {
      const fileIdMatch = link.match(/\/d\/([^/]+)/);
      const fileId = fileIdMatch ? fileIdMatch[1] : null;

      if (!fileId) {
        return <p>Error: Invalid link format</p>;
      }

      const googleEmbedUrl = `https://docs.google.com/presentation/d/${fileId}/embed?rm=minimal&start=false&loop=false&slide=${currentSlide}`;
      const officeEmbedUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
        link
      )}`;
      return (
        <>
          <div className="embed-responsive-item">
            <iframe
              title="PPT Viewer"
              src={googleEmbedUrl}
              style={{ width: "100%", height: "500px", border: "none" }}
              allow="autoplay; encrypted-media"
              onError={(e) => {
                e.target.src = officeEmbedUrl;
              }}
            />
            <div className="MarkAsCompleted">
              <button className="NextBtn"> Mark as Completed</button>
            </div>
          </div>
        </>
      );
    }
  };

  // const handleMediaEnd = async () => {
  //   if (currentLessonIndex !== null && currentVideoIndex !== null) {
  //     const exerciseKey = `${currentLessonIndex}-${currentVideoIndex}`;
  //     setCompletedExercises((prev) => {
  //       const updatedSet = new Set(prev);
  //       updatedSet.add(exerciseKey);
  //       return updatedSet;
  //     });

  //     const currentVideo =
  //       courseData.chapters[currentLessonIndex].lesson[currentVideoIndex];
     

  //     setWatchedVideoTitles((prevTitles) => {
  //       const updatedTitles = new Set(prevTitles);
  //       updatedTitles.add(currentVideo.title);
  //       return Array.from(updatedTitles);
  //     });
      
  //     // Check if the chapter is completed
  //     const isChapterCompleted = courseData.chapters[
  //       currentLessonIndex
  //     ]?.lesson.every(
  //       (_, vidIndex) =>
  //         completedExercises.has(`${currentLessonIndex}-${vidIndex}`) ||
  //         `${currentLessonIndex}-${vidIndex}` === exerciseKey
  //     );

  //     if (isChapterCompleted) {
  //       console.log(`Chapter ${currentLessonIndex + 1} completed!`);
  //     }

  //     progress_data(currentLessonIndex, currentVideoIndex);
  //   }
  // };

  const handleMediaEnd = async () => {
    if (currentLessonIndex !== null && currentVideoIndex !== null) {
      const exerciseKey = `${currentLessonIndex}-${currentVideoIndex}`;
      setCompletedExercises((prev) => {
        const updatedSet = new Set(prev);
        updatedSet.add(exerciseKey);
        return updatedSet;
      });

      const currentVideo =
        courseData.chapters[currentLessonIndex]?.lessons[currentVideoIndex];
      setWatchedVideoTitles((prevTitles) => {
        const updatedTitles = new Set(prevTitles);
        updatedTitles.add(currentVideo.title);
        return Array.from(updatedTitles);
      });

      progress_data(currentLessonIndex, currentVideoIndex);
    }
  };
  // const calculateProgress = () => {
  //   const totalExercises = courseData.lessons?.reduce(
  //     (total, lesson) => total + lesson.chapter?.length,
  //     0
  //   );
  //   const progress =
  //     totalExercises > 0 ? (completedExercises.size / totalExercises) * 100 : 0;

  //   localStorage.setItem(`courseProgress-${courseId}`, progress);

  //   return progress;
  // };
  const calculateProgress = () => {
    const totalExercises = courseData.chapters?.reduce(
      (total, chapter) => total + chapter.lessons?.length,
      0
    );
    const progress =
      totalExercises > 0 ? (completedExercises.size / totalExercises) * 100 : 0;

    localStorage.setItem(`courseProgress-${courseId}`, progress);

    return progress;
  };

  const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  if (isLoading) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  }

  if (fetchError) {
    return <ErrorDataFetchOverlay />;
  }

  return (
    <>
      <div className="courseContentContainer">
        <div className="row firstRow g-0">
          <div className="courseContentHeader">
            <button className="BackBtn" onClick={() => navigate(-1)}>
              Back
            </button>
            <div className="courseHeading">
              {truncateText(courseData.title, 45)}
              {/* {courseDetails.title} */}
            </div>
            <button
              className="NextBtn"
              onClick={() => handleNext()}
            >
              Next
            </button>
          </div>
          <div className="courseContentProgressBar">
            <ProgressBar
            progress={calculateProgress()}
            />
          </div>
        </div>
        <div className="row secondRow">
          <div className="col-md-8 pdy">
            <div className="videoBox">
              <div
                className="embed-responsive embed-responsive-16by9"
                // style={{ height: "440px" }}
              >
                {courseData?.chapters.length > 0 &&
                  renderContent(
                    !currentCourseData.file
                      ? courseData.videoUrl
                      : currentCourseData.file,
                  !currentCourseData.file ? "video" : currentCourseData.fileType
                  )}
                {/* <img src={courseData.thumbnail} alt="" /> */}
              </div>
            </div>
            <div className="infoBox">
              <h1>{courseData.title}</h1>
              {courseData.chapters && courseData.chapters.length > 0 && (
                <div className="lessonDescriptionBox">
                  <h3 className="lessonDescriptionBoxTitle">
                    {/* {!courseDetails.title
                    ? ""
                    : `${courseDetails.chapters[0]}.${courseDetails.excerciseNo}`}
                    {!courseDetails.title
                    ? courseDetails.chapters[0].title
                    : courseDetails.title} */}

                    {/* {!currentCourseData?.lessons?.[0]?.title || ""} */}
                    {/* {courseData?.chapters?.[0]?.title || ""} */}
                    {!currentCourseData.title
                      ? courseData.chapters[0].title
                      : currentCourseData.title}
                  </h3>
                  <p className="lessonDescriptionBoxDescription">
                    {/* {!courseDetails.description
                    ? courseDetails.chapters[0].description
                    : courseDetails.description} */}
                    {/* lesson description */}
                    {/* {courseData?.description ||
                    courseData?.chapters?.[0]?.description ||
                    "No description available."} */}
                    {/* {!currentCourseData?.description ||
                    currentCourseData?.lessons?.[0]?.description ||
                    "No description available."} */}
                    {!currentCourseData.notes
                      ? courseData.chapters[0].description
                      : currentCourseData.notes}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-4 CCaccordianBox">
            <Accordion activeKey={activeAccordion} onSelect={handleLessonClick}>
              {courseData?.chapters &&
                courseData.chapters?.map((chapter, index) => {
                  const ChapterCompleted = chapter.lessons?.every(
                    (_, vidIndex) =>
                      completedExercises.has(`${index}-${vidIndex}`)
                  );

                  return (
                    <Accordion.Item key={index} eventKey={index}>
                      <Accordion.Header
                        onClick={() => handleLessonClick(index)}
                        className={
                          !courseData.title
                            ? ""
                            : `${
                                courseData?.chapter === index + 1
                                  ? "accr-btn-active"
                                  : ""
                              }`
                        }
                      >
                        <div className="CClesson-meta">
                          <div className="CClesson-title">
                            <div>
                              {index + 1}&nbsp;.&nbsp;{chapter.title}
                            </div>

                            {ChapterCompleted && (
                              <img
                                className="content-watched"
                                src={tick}
                                alt="watched"
                              />
                            )}
                          </div>
                          <span className="lesson-duration">
                            {/* Duration : {calculateTotalDuration(lesson?.chapter)}{" "} */}
                            {/* &nbsp; /&nbsp; */}
                          </span>
                          <span>Total Content : {chapter.lessons?.length}</span>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="">
                          <ul className="list-group">
                            {chapter.lessons.map((video, vidIndex) => (
                              <li
                                key={vidIndex}
                                className={`list-group-item   ${
                                  courseDetails.title === video.title
                                    ? "list-group-item-active"
                                    : ""
                                }
                                   ${
                                     completedExercises.has(
                                       `${index}-${vidIndex}`
                                     )
                                       ? "completedLesson"
                                       : ""
                                   }
                                `}
                                onClick={() =>
                                  handleCurrentContent(video, index, vidIndex)
                                }
                              >
                                <span className="video-number">
                                  <div>
                                    {/* {`${lesson + 1}.${vidIndex + 1}`}&nbsp; */}
                                    {video.title}
                                  </div>
                                  {completedExercises.has(
                                    `${index}-${vidIndex}`
                                  ) && (
                                    <img
                                      className="content-watched"
                                      src={tick}
                                      alt="watched"
                                    />
                                  )}
                                </span>
                                {video?.type === "video" ? (
                                  <span className="lesson-duration">
                                    Duration :{" "}
                                    {/* {convertToReadableDuration(video.duration)} */}
                                  </span>
                                ) : (
                                  <span className="lesson-duration">
                                    Type : {video?.fileType}
                                  </span>
                                )}
                              </li>
                            ))}
                          </ul>
                          {chapter.testId && (
                            <div className="testButtonBox">
                              <div className="testButtonInr">
                                <div className="testButtonTxt">
                                  Take a Test to Confirm Your Understanding
                                </div>

                                <button
                                  className="testButton"
                                  // onClick={() =>
                                  //   navigate(
                                  //     `/home/tests/${lesson.testId}/user/${userId}`
                                  //   )
                                  // }
                                >
                                  Take Test
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  );
                })}
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseContent;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./CourseContent.css";
// import tick from "../Assets/SVG/tick.svg";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import LoadingPage from "../LoadingPage/LoadingPage";
// import Accordion from "react-bootstrap/Accordion";
// import ErrorDataFetchOverlay from "../Error/ErrorDataFetchOverlay";
// import ProgressBar from "../ProgressBar/ProgressBar";
// const apiBaseUrl = process.env.REACT_APP_BASE_API;

// const CourseDetails = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { courseId } = useParams();
//   const  CourseDetails  = location.state;
//   const [userId, setUserId] = useState("");
//   const [courseData, setCourseData] = useState({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [fetchedID, setFetchedID] = useState(null);
//   const [fetchError, setFetchError] = useState(false);
//   const [activeLesson, setActiveLesson] = useState(null);
//   const [currentCourseData, setCurrentCourseData] = useState({});

//   // nxt btn
//   const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
//   const [currentVideoIndex, setCurrentVideoIndex] = useState(-1);
//   const [activeAccordion, setActiveAccordion] = useState(null);

//   // progress
//   const [completedExercises, setCompletedExercises] = useState(new Set());
//   const [watchedVideoTitles, setWatchedVideoTitles] = useState([]);

//   // api data
//   const [completedUserData, setCompletedUserData] = useState([]);

  
//   const userInfo = JSON.parse(localStorage.getItem("userdata"));
//   console.log(userInfo);
  

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // const response = await axios.get(
//         //   `https://csuite-production.up.railway.app/api/courseDetail/${courseId}`
//         // );
//         // const response = await axios.get(`${apiBaseUrl}/api/degrees/${userInfo.applyingFor}`)
//         // setCourseData(response.data);
//         // console.log(response.data.course);
//         // const {degree} = response.data
//         // const {courses} = degree
//         // set
//         // console.log(courses);
//         setCourseData(CourseDetails)
//         console.log(courseData);
        

//         // console.log(userInfo)
//         if (userInfo) {
//           const userID = userInfo._id;
//           setUserId(userID);
//         } else {
//           setFetchError(true);
//         }

//         setIsLoading(false);
//       } catch (err) {
//         console.error("Error fetching course details:", err);
//         setIsLoading(false);
//         setFetchError(true);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const fetchCompletedVideos = async () => {
//       if (!userId) return;

//       try {
//         const response = await axios.get(
//           `${apiBaseUrl}/api/completevideo/${userId}/${courseId}`
//         );

//         const data = response.data.completedUserData;
//         // console.log("Fetched data:", data[0].completedVideos);
//         setCompletedUserData(data[0].completedVideos);

//         if (data.length > 0) {
//           const firstItem = data[0];
//           const completedTitles = firstItem.completedVideos;

//           // Initialize completedExercises
//           const completedSet = new Set(
//             firstItem.completedVideos.flatMap((videoTitle) =>
//               courseData.lessons.flatMap((lesson, lessonIndex) =>
//                 lesson.chapter.flatMap((video, videoIndex) =>
//                   video.title === videoTitle
//                     ? [`${lessonIndex}-${videoIndex}`]
//                     : []
//                 )
//               )
//             )
//           );
//           setCompletedExercises(completedSet);
//           setFetchedID(firstItem._id);
//           setWatchedVideoTitles(completedTitles);

//           // console.log("Completed video titles:", completedTitles);
//         } else {
//           console.log("No completed videos found.");
//           setCompletedUserData([]);
//           setWatchedVideoTitles([]);
//           setCompletedExercises(new Set());
//         }
//       } catch (err) {
//         if (err.response) {
//           if (err.response.status === 404) {
//             // const message =
//             //   err.response.data.message ||
//             //   "No completed videos found. This might be normal.";
//             // console.log(message);
//             setCompletedUserData([]);
//             setWatchedVideoTitles([]);
//             setCompletedExercises(new Set());

//             try {
//               await axios.post(
//                 `${apiBaseUrl}/api/complete/`,
//                 {
//                   userId,
//                   courseId,
//                   completedVideos: [],
//                 }
//               );
//               // alert("posting in effect");
//               // console.log("New entry created with empty completed videos.");
//             } catch (postErr) {
//               console.error(
//                 "Error creating new completed video entry:",
//                 postErr
//               );
//             }
//           } else {
//             console.error(
//               "Error fetching completed videos:",
//               err.response.data.message || err.message || err
//             );
//           }
//         } else {
//           console.error("Error fetching completed videos:", err.message || err);
//         }
//       }
//     };

//     fetchCompletedVideos();
//   }, []);

//   const handleLessonClick = (index) => {
//     setActiveLesson(index === activeLesson ? null : index);
//     setActiveAccordion(index === activeLesson ? null : index);
//   };

//   const calculateTotalDuration = (videos) => {
//     let totalSeconds = 0;
//     videos?.forEach((video) => {
//       if (video.duration) {
//         const timeComponents = video.duration.split(":").map(Number);
//         totalSeconds += timeComponents[0] * 60 + timeComponents[1];
//       }
//     });

//     const hours = Math.floor(totalSeconds / 3600);
//     const minutes = Math.floor((totalSeconds % 3600) / 60);
//     const seconds = totalSeconds % 60;

//     return `${hours > 0 ? `${hours}h ` : ""}${minutes}m ${seconds}s`;
//   };

//   function convertToReadableDuration(duration) {
//     if (!duration || duration === "0") {
//       return "3mins+";
//     }

//     const [minutes, seconds] = duration.split(":");
//     return `${parseInt(minutes, 10)}m ${parseInt(seconds, 10)}s`;
//   }

//   // currentcourse kkaaga ethu
//   const handleCurrentContent = async (data, lessonIndex, excerciseIndex) => {
//     const exerciseKey = `${lessonIndex}-${excerciseIndex}`;
//     // Update completedExercises set
//     setCompletedExercises((prev) => {
//       const updatedSet = new Set(prev);
//       updatedSet.add(exerciseKey);
//       // console.log("Updated completedExercises:", Array.from(updatedSet));
//       return updatedSet;
//     });

//     // Update watchedVideoTitles array
//     setWatchedVideoTitles((prevTitles) => {
//       const updatedTitles = new Set(prevTitles);
//       updatedTitles.add(data.title);
//       // console.log("Updated watchedVideoTitles:", Array.from(updatedTitles));
//       return Array.from(updatedTitles);
//     });

//     // Modify data and set current course data
//     const modifiedData = {
//       ...data,
//       excerciseNo: excerciseIndex + 1,
//       chapter: lessonIndex + 1,
//       type: data.type,
//       link: data.link,
//       duration: data.duration,
//     };
//     setCurrentCourseData(modifiedData);

//     // Update lesson and video indices
//     setCurrentLessonIndex(lessonIndex);
//     setCurrentVideoIndex(excerciseIndex);
//     setActiveAccordion(lessonIndex);

//     // console.log("Updating completed videos with data:", {
//     //   lesson: data.title,
//     // });

//     try {
//       const videoAlreadyCompleted = completedUserData.includes(data.title);

//       if (!videoAlreadyCompleted) {
//         const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

//         // Video already completed, update if necessary
//         await axios.put(
//           `${apiBaseUrl}/api/complete/${fetchedID}/updatelesson`,
//           { lesson: data.title }
//         );
//       }
//     } catch (err) {
//       console.error("Error handling current content:", err);
//     }
//   };

//   const handleNext = async () => {
//     if (courseData.lessons) {
//       const currentLesson = courseData.lessons[currentLessonIndex];

//       if (currentLessonIndex === 0 && currentVideoIndex === -1) {
//         handleCurrentContent(currentLesson.chapter[0], currentLessonIndex, 0);
//       } else if (currentVideoIndex < currentLesson.chapter.length - 1) {
//         handleCurrentContent(
//           currentLesson.chapter[currentVideoIndex + 1],
//           currentLessonIndex,
//           currentVideoIndex + 1
//         );
//       } else if (currentLessonIndex < courseData.lessons.length - 1) {
//         const nextLesson = courseData.lessons[currentLessonIndex + 1];
//         handleCurrentContent(nextLesson.chapter[0], currentLessonIndex + 1, 0);
//       } else {
//         const totalExercises = courseData.lessons.reduce(
//           (total, lesson) => total + lesson.chapter.length,
//           0
//         );
//         if (completedExercises.size === totalExercises) {
//           alert("Congratulations! You have completed the course!");
//         } else {
//           alert("There are a few lessons you need to complete!");
//         }
//       }
//     }
//   };

//   const renderContent = (link, typeManual) => {
//     if (typeManual === "video") {
//       return (
//         <div>
//           <iframe
//             title={currentCourseData.title || "Video Title"}
//             className="embed-responsive-item"
//             sandbox="allow-forms allow-scripts allow-same-origin allow-presentation"
//             src={`https://player.vimeo.com/video/${link.split("/").pop()}`}
//             style={{ width: "100%", height: "100%" }}
//             allow="autoplay; encrypted-media"
//           ></iframe>
//         </div>
//       );
//     } else if (typeManual === "ppt") {
//       const fileId = link.split("/d/")[1].split("/")[0];
//       const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
//       return (
//         <div>
//           <iframe
//             title="PPT"
//             className="embed-responsive-item"
//             src={embedUrl}
//             style={{ width: "100%", height: "100%" }}
//             allow="autoplay; encrypted-media"
//           ></iframe>
//         </div>
//       );
//     }
//   };

//   const calculateProgress = () => {
//     const totalExercises = courseData.lessons?.reduce(
//       (total, lesson) => total + lesson.chapter?.length,
//       0
//     );
//     const progress =
//       totalExercises > 0 ? (completedExercises.size / totalExercises) * 100 : 0;

//     return progress;
//   };

//   const truncateText = (text, maxLength) => {
//     if (text.length > maxLength) {
//       return text.slice(0, maxLength) + "...";
//     }
//     return text;
//   };

//   if (isLoading) {
//     return (
//       <div>
//         <LoadingPage />
//       </div>
//     );
//   }

//   if (!fetchError) {
//     return <ErrorDataFetchOverlay />;
//   }

//   return (
//     <div className="courseContentContainer">
//       <div className="row firstRow g-0">
//         <div className="courseContentHeader">
//           <button className="BackBtn" onClick={() => navigate(-1)}>
//             Back
//           </button>
//           <div className="courseHeading">
//             {truncateText(courseData.title, 45)}
//           </div>
//           <button className="NextBtn" onClick={() => handleNext()}>
//             Next
//           </button>
//         </div>
//         <div className="courseContentProgressBar">
//           <ProgressBar progress={calculateProgress()} />
//         </div>{" "}
//       </div>
//       <div className="row secondRow">
//         <div className="col-md-8 pdy">
//           <div className="videoBox">
//             <div className="embed-responsive embed-responsive-16by9">
//               {courseData?.chapters.length > 0 &&
//                 renderContent(
//                   !currentCourseData.file
//                     ? courseData.videoUrl
//                     : currentCourseData.file,
//                   !currentCourseData.file ? "video" : currentCourseData.fileType
//                 )}
//             </div>
//             <div>
//               <div className="infoBox">
//                 <h1>{courseData.title}</h1>
//                 {courseData.chapters && courseData.chapters.length > 0 && (
//                   <div className="lessonDescriptionBox">
//                     <h3 className="lessonDescriptionBoxTitle">
//                       {!currentCourseData.title
//                         ? ""
//                         : `${currentCourseData.chapter}.${currentCourseData.excerciseNo}`}{" "}
//                       {!currentCourseData.title
//                         ? courseData.lessons[0].title
//                         : currentCourseData.title}
//                       {/* {courseData.lessons[0].title} */}
//                     </h3>
//                     <p className="lessonDescriptionBoxDescription">
//                       {!currentCourseData.notes
//                         ? courseData.lessons[0].description
//                         : currentCourseData.notes}
//                       {/* {courseData.lessons[0].description} */}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-4 CCaccordianBox">
//           <Accordion activeKey={activeAccordion} onSelect={handleLessonClick}>
//             {courseData?.chapters &&
//               courseData.chapters?.map((chapter, index) => {
//                 const lessonCompleted = chapter?.lesson.every((_, vidIndex) =>
//                   completedExercises.has(`${index}-${vidIndex}`)
//                 );

//                 return (
//                   <Accordion.Item key={index} eventKey={index}>
//                     <Accordion.Header
//                       onClick={() => handleLessonClick(index)}
//                       className={
//                         !currentCourseData.title
//                           ? ""
//                           : `${
//                               currentCourseData.chapter === index + 1
//                                 ? "accr-btn-active"
//                                 : ""
//                             }`
//                       }
//                     >
//                       <div className="CClesson-meta">
//                         <div className="CClesson-title">
//                           <div>
//                             {index + 1}&nbsp;.&nbsp;{lesson.title}
//                           </div>

//                           {lessonCompleted && (
//                             <img
//                               className="content-watched"
//                               src={tick}
//                               alt="watched"
//                             />
//                           )}
//                         </div>
//                         <span className="lesson-duration">
//                           Duration : {calculateTotalDuration(lesson?.chapter)}{" "}
//                           &nbsp; /&nbsp;
//                         </span>

//                         <span>Total Content : {lesson.chapter?.length}</span>
//                       </div>
//                     </Accordion.Header>
//                     <Accordion.Body>
//                       <div>
//                         <ul className="list-group">
//                           {lesson.chapter?.map((video, vidIndex) => (
//                             <li
//                               key={vidIndex}
//                               className={`list-group-item 
//              ${
//                currentCourseData.title === video.title
//                  ? "list-group-item-active"
//                  : completedExercises.has(`${index}-${vidIndex}`)
//                  ? "completedLesson"
//                  : ""
//              }`}
//                               onClick={() =>
//                                 handleCurrentContent(video, index, vidIndex)
//                               }
//                             >
//                               <span className="video-number">
//                                 {/* <a href={video.link}>
//                                   {`${index + 1}.${vidIndex + 1}`}&nbsp;
//                                   {video.title}
//                                 </a> */}
//                                 <div>
//                                   {`${index + 1}.${vidIndex + 1}`}&nbsp;
//                                   {video.title}
//                                 </div>

//                                 {completedExercises.has(
//                                   `${index}-${vidIndex}`
//                                 ) && (
//                                   <img
//                                     className="content-watched"
//                                     src={tick}
//                                     alt="watched"
//                                   />
//                                 )}
//                               </span>
//                               {video?.type === "video" ? (
//                                 <span className="lesson-duration">
//                                   Duration :{" "}
//                                   {convertToReadableDuration(video.duration)}
//                                 </span>
//                               ) : (
//                                 <span className="lesson-duration">
//                                   Type : {video?.type}
//                                 </span>
//                               )}
//                             </li>
//                           ))}
//                         </ul>
//                         {lesson.testId && (
//                           <div className="testButtonBox">
//                             <div className="testButtonInr">
//                               <div className="testButtonTxt">
//                                 Take a Test to Confirm Your Understanding
//                               </div>

//                               <button
//                                 className="testButton"
//                                 onClick={() =>
//                                   navigate(
//                                     `/home/tests/${lesson.testId}/user/${userId}`
//                                   )
//                                 }
//                               >
//                                 Take Test
//                               </button>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </Accordion.Body>
//                   </Accordion.Item>
//                 );
//               })}
//           </Accordion>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseDetails;
