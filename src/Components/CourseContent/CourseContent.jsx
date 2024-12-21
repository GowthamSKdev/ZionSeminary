import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./CourseContent.css";
import tick from "../Assets/SVG/tick.svg";
import ErrorDataFetchOverlay from "../Error/ErrorDataFetchOverlay";
import LoadingPage from "../LoadingPage/LoadingPage";
import ProgressBar from "../ProgressBar/ProgressBar";
import { Accordion, AccordionItem } from "react-bootstrap";
import {
  getCompletionDetails,
  markLessonAsCompleted,
} from "../../Admin/firebase/completionApi";

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
  const [currentVideoIndex, setCurrentVideoIndex] = useState(-1);
  const [activeAccordion, setActiveAccordion] = useState(null);

  const [currentSlide, setCurrentSlide] = useState(1);
  const [totalSlides, setTotalSlides] = useState(0);

  // progress
  const [completedExercises, setCompletedExercises] = useState(new Set());
  const [watchedVideoTitles, setWatchedVideoTitles] = useState([]);

  // api data
  const [completedUserData, setCompletedUserData] = useState([]);

  // const apiBaseUrl = process.env

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const res =
        setCourseData(courseDetails);
        // console.log(courseData);
        const userInfo = JSON.parse(localStorage.getItem("userdata"));
        // console.log(userInfo);
        if (userInfo) {
          const userID = userInfo.id;
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
        const response = await getCompletionDetails(userId, courseId);
        console.log(response);
        const data = response;

        if (data.length > 0) {
          const firstItem = data[0];
          const completedTitles = firstItem.completedVideos;

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
              await markLessonAsCompleted({
                userId,
                courseId,
                completedVideos: [],
              });
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
  }, [userId, courseId]);

  const progress_data = async () => {
    // Calculate total exercises and progress percentage
    const totalExercises = courseData.chapters?.reduce(
      (total, chapter) => total + chapter.lesson?.length,
      0
    );

    const progress_percentage =
      totalExercises > 0 ? (completedExercises.size / totalExercises) * 100 : 0;

    const watchedPercentage = progress_percentage;
    // Ensure required data is available
    if (!userId || !courseId || watchedPercentage == null) {
      console.error("Missing required data for API request.");
      return;
    }
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

  const handleCurrentContent = async (data, lessonIndex, exerciseIndex) => {
    console.log("Selected Content Data:", data);

    // Prepare modified data for the current course content
    const modifiedData = {
      ...data,
      exerciseNo: exerciseIndex + 1,
      lessonNo: lessonIndex + 1,
      type: data.type,
      link: data.link,
      duration: data.duration,
    };

    // Update the current course data and UI state
    setCurrentCourseData(modifiedData);
    setCurrentLessonIndex(lessonIndex);
    setCurrentVideoIndex(exerciseIndex);
    setActiveAccordion(lessonIndex);

    // console.log("Current content set:", modifiedData);

    // Optional: Send progress update to the backend
    // try {
    //   const videoAlreadyCompleted = completedUserData.includes(data.title);

    //   if (!videoAlreadyCompleted) {
    //     const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    //     await axios.put(
    //       `${apiBaseUrl}/completevideo/${fetchedID}/updatelesson`,
    //       { lesson: data.title }
    //     );
    //     console.log("Content completion updated on the server:", data.title);
    //   }
    // } catch (err) {
    //   console.error("Error updating content progress:", err);
    // }
  };

  const renderContent = (
    link,
    typeManual,
    data,
    lessonIndex,
    exerciseIndex
  ) => {
    if (typeManual === "video") {
      return (
        <>
          <div className="embed-responsive-item">
            {/* <video src={link} title={courseData.title || "Video Title"}> */}
            <video
              controls
              onEnded={() => {
                // handleMediaEnd(data, lessonIndex, exerciseIndex);
              }}
              style={{ maxWidth: "100%", width: "100%", borderRadius: "1em" }}
            >
              {/* <source src={link} type="video/mp4" /> */}
              {/* <source src={link} type="video/mkv" /> */}
              <source src="/test.mp4" type="video/mp4" />
            </video>
          </div>
        </>
      );
    } else if (typeManual === "Audio") {
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
                handleMediaEnd(
                  { title: `${data?.title}` },
                  lessonIndex,
                  exerciseIndex
                )
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
  //       courseData.lessons[currentLessonIndex]?.chapter[currentVideoIndex];
  //     setWatchedVideoTitles((prevTitles) => {
  //       const updatedTitles = new Set(prevTitles);
  //       updatedTitles.add(currentVideo.title);
  //       return Array.from(updatedTitles);
  //     });

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
        courseData.chapters[currentLessonIndex]?.lesson[currentVideoIndex];
      setWatchedVideoTitles((prevTitles) => {
        const updatedTitles = new Set(prevTitles);
        updatedTitles.add(currentVideo.title);
        return Array.from(updatedTitles);
      });

      // Check if the chapter is completed
      const isChapterCompleted = courseData.chapters[
        currentLessonIndex
      ]?.lesson.every(
        (_, vidIndex) =>
          completedExercises.has(`${currentLessonIndex}-${vidIndex}`) ||
          `${currentLessonIndex}-${vidIndex}` === exerciseKey
      );

      if (isChapterCompleted) {
        console.log(`Chapter ${currentLessonIndex + 1} completed!`);
      }

      progress_data(currentLessonIndex, currentVideoIndex);
    }
  };

  const calculateProgress = () => {
    const totalExercises = courseData.lessons?.reduce(
      (total, lesson) => total + lesson.chapter?.length,
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
              // onClick={() => handleNext()}
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
                {courseData?.chapters?.length > 0 &&
                  renderContent(
                    !currentCourseData.link
                      ? courseData.videoUrl
                      : currentCourseData.link,
                    !currentCourseData.link ? "video" : currentCourseData.type
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
                                    Type : {video?.type}
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
