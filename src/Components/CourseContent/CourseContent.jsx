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
  // const [fetchedID, setFetchedID] = useState(null);
  const [fetchedID, setFetchedID] = useState("");
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

  console.log(courseData);

  useEffect(() => {
    const fetchCompletedVideos = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(
          `${apiBaseUrl}/api/complete/${userInfo._id}/${courseId}/`
        );
        // const response = await getCompletionDetails(userId, courseId);
        // console.log("recevice complete", response);
        const resdata = response.data;
        console.log(resdata);
        
        console.log("res", resdata.data.completedLessons);
        const data = completedUserData
        setCompletedUserData(resdata.data[0].completedLessons);
        if (data.length > 0) {
          const firstItem = resdata.data;
          const completedTitles = firstItem.completedLessons;
          const completedSet = new Set(
            completedUserData.flatMap((videoTitle) =>
              courseData.chapters.flatMap((chapter, lessonIndex) =>
                chapter.lessons.flatMap((video, videoIndex) =>
                  video.title === videoTitle
                    ? `${lessonIndex}-${videoIndex}`
                    : []
                )
              )
            )
          )
          setCompletedExercises(completedSet);
          setFetchedID(firstItem._id);
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
                userId: userInfo._id,
                degreeId: userInfo.applyingFor,
                completedVideos: [],
                // courseId: courseData._id,
                // courseDataIndex: courseData,
                // currentLessonIndex,
                // currentVideoIndex,
              };
              const res = await axios.post(
                `${apiBaseUrl}/api/complete`,
                payload
                //     {
                //   // userId,
                //   // courseId,
                //   // completedVideos: [],
                // }
              );
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
  }, [completedExercises, courseData, currentLessonIndex, currentVideoIndex]);

  // useEffect(() => {
  //   const fetchCompletedVideos = async () => {
  //     if (!userId) return;

  //     try {
  //       const response = await axios.get(
  //         `${apiBaseUrl}/api/complete/${userInfo._id}/${courseId}/`
  //       );
  //       const resdata = response.data;

  //       console.log("res", resdata.data.completedLessons);

  //       // Set completed user data if it exists
  //       if (resdata.data.length > 0) {
  //         const firstItem = resdata.data[0];
  //         const completedTitles = firstItem.completedLessons;

  //         setCompletedUserData(completedTitles);
  //         setFetchedID(firstItem._id);
  //         setWatchedVideoTitles(completedTitles);

  //         // Calculate completed exercises based on completed lessons and courseData
  //         const completedSet = new Set(
  //           completedTitles.flatMap((videoTitle) =>
  //             courseData.chapters.flatMap((chapter, lessonIndex) =>
  //               chapter.lessons.flatMap((video, videoIndex) =>
  //                 video.title === videoTitle
  //                   ? `${lessonIndex}-${videoIndex}`
  //                   : []
  //               )
  //             )
  //           )
  //         );
  //         setCompletedExercises(completedSet);
  //       } else {
  //         console.log("No completed videos found.");
  //         setCompletedUserData([]);
  //         setWatchedVideoTitles([]);
  //         setCompletedExercises(new Set());
  //       }
  //     } catch (error) {
  //       if (error.response) {
  //         if (error.response.status === 404) {
  //           setCompletedUserData([]);
  //           setWatchedVideoTitles([]);
  //           setCompletedExercises(new Set());

  //           try {
  //             const payload = {
  //               userId: userInfo._id,
  //               degreeId: userInfo.applyingFor,
  //               completedVideos: [],
  //             };
  //             const res = await axios.post(
  //               `${apiBaseUrl}/api/complete`,
  //               payload
  //             );
  //             console.log(res);
  //           } catch (postError) {
  //             console.error(
  //               "Error creating new completed video entry:",
  //               postError
  //             );
  //           }
  //         } else {
  //           console.error(
  //             "Error fetching completed videos:",
  //             error.response.data.message || error.message || error
  //           );
  //         }
  //       }
  //     }
  //   };

  //   fetchCompletedVideos();
  // }, [userId, courseId, userInfo._id, courseData]); // Removed completedExercises and other unnecessary dependencies

  // useEffect(() => {
  //   const fetchCompletedVideos = async () => {
  //     if (!userId || !courseId) return;

  //     try {
  //       const response = await axios.get(
  //         `${apiBaseUrl}/api/complete/${userId}/${courseId}/`
  //       );
  //       const resdata = response.data;

  //       if (resdata.data.length > 0) {
  //         const firstItem = resdata.data[0];
  //         const completedTitles = firstItem.completedLessons;

  //         // Update the completed user data and watched titles
  //         setCompletedUserData(completedTitles);
  //         setFetchedID(firstItem._id);
  //         setWatchedVideoTitles(completedTitles);

  //         // Calculate completed exercises based on completed lessons and courseData
  //         const completedSet = new Set(
  //           completedTitles.flatMap((videoTitle) =>
  //             courseData.chapters.flatMap((chapter, lessonIndex) =>
  //               chapter.lessons.flatMap((video, videoIndex) =>
  //                 video.title === videoTitle
  //                   ? `${lessonIndex}-${videoIndex}`
  //                   : []
  //               )
  //             )
  //           )
  //         );
  //         setCompletedExercises(completedSet);
  //       } else {
  //         console.log("No completed videos found.");
  //         setCompletedUserData([]);
  //         setWatchedVideoTitles([]);
  //         setCompletedExercises(new Set());
  //       }
  //     } catch (error) {
  //       if (error.response) {
  //         if (error.response.status === 404) {
  //           setCompletedUserData([]);
  //           setWatchedVideoTitles([]);
  //           setCompletedExercises(new Set());

  //           try {
  //             const payload = {
  //               userId: userInfo._id,
  //               degreeId: userInfo.applyingFor,
  //               completedVideos: [],
  //             };
  //             const res = await axios.put(
  //               `${apiBaseUrl}/api/complete`,
  //               payload
  //             );
  //             console.log(res);
  //           } catch (postError) {
  //             console.error(
  //               "Error creating new completed video entry:",
  //               postError
  //             );
  //           }
  //         } else {
  //           console.error("Error fetching completed videos:", error.message);
  //         }
  //       }
  //     }
  //   };

  //   fetchCompletedVideos();
  // }, [userId, courseId, courseData]); // Trigger only when userId, courseId, or courseData changes

  const progress_data = async () => {
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
    // if (!userId || !courseId || watchedPercentage == null) {
    //     console.error("Missing required data for API request.");
    //     return;
    //   }

    //   try {
    //     // Endpoint URL
    //     const endpoint = `${apiBaseUrl}/api/users/progress`;

    //     // API request payload
    //     const payload = {
    //       // userId,
    //       // courseId,
    //       // watchedPercentage,
    //       // lessonIndex,
    //       // chapterIndex,
    //       userId: userInfo._id,
    //       degreeId: userInfo.applyingFor,
    //       watchedPercentage,
    //       courseIndex: courseId,
    //       lessonIndex: currentLessonIndex,
    //       chapterIndex: currentChapterIndex,
    //     };

    //     // API request
    //     const response = await axios.post(endpoint, payload);

    //     console.log("Progress updated successfully:", response.data);
    //   } catch (err) {
    //     console.error(
    //       "Error updating progress:",
    //       err.message,
    //       err.response?.data || {}
    //     );
    //   }

    const res = await axios.put(
      `${apiBaseUrl}/api/users/${userInfo._id}/watchPercent`,
      { watchPercent: watchedPercentage }
    );
    console.log(res);
    

  };

  const handleLessonComplete = (lessonIndex, chapterIndex) => {
    progress_data(lessonIndex, chapterIndex);
  };

  const handleLessonClick = (index) => {
    setActiveLesson(index === activeLesson ? null : index);
    setActiveAccordion(index === activeLesson ? null : index);
  };

  // Example: Call this function after a user completes a chapter
  handleLessonComplete(currentLessonIndex, currentVideoIndex);

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
        handleCurrentContent(nextLesson.lessons[0], currentLessonIndex + 1, 0);
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

    try {
      const videoAlreadyCompleted = completedUserData.includes(data.title);

      if (!videoAlreadyCompleted) {
        // const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

        await axios.put(`${apiBaseUrl}/api/complete/${fetchedID}`, {
          userId: userInfo._id,
          degreeId: userInfo.applyingFor,
          courseId: courseId,
          lessonTitle: data.title,
        });
        console.log("Content completion updated on the server:", data.title);
      }
    } catch (err) {
      console.error("Error updating content progress:", err);
    }
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
              onEnded={() => {
                handleMediaEnd(
                  { title: `${data?.title}` },
                  lessonIndex,
                  exerciseIndex
                );
              }}
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

  const handleMediaEnd = async () => {
    if (currentLessonIndex !== null && currentVideoIndex !== null) {
      const exerciseKey = `${currentLessonIndex}-${currentVideoIndex}`;
      setCompletedExercises((prev) => {
        const updatedSet = new Set(prev);
        updatedSet.add(exerciseKey);
        return updatedSet;
      });

      // Also update the watched video titles if necessary
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
            <button className="NextBtn" onClick={() => handleNext()}>
              Next
            </button>
          </div>
          <div className="courseContentProgressBar">
            <ProgressBar progress={calculateProgress()} />
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
                    !currentCourseData.file
                      ? "video"
                      : currentCourseData.fileType
                  )}
                {/* <img src={courseData.thumbnail} alt="" /> */}
              </div>
            </div>
            <div className="infoBox">
              <h1>{courseData.title}</h1>
              {courseData.chapters && courseData.chapters.length > 0 && (
                <div className="lessonDescriptionBox">
                  <h3 className="lessonDescriptionBoxTitle">
                    {!currentCourseData.title
                      ? courseData.chapters[0].title
                      : currentCourseData.title}
                  </h3>
                  <p className="lessonDescriptionBoxDescription">
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