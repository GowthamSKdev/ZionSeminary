import React from "react";
import "./CourseContent.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import tick from "../Assets/SVG/tick.svg";
import ProgressBar from "../ProgressBar/ProgressBar";
import { useState } from "react";
import { useEffect } from "react";
import { Accordion } from "react-bootstrap";
import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_BASE_API;

const CourseContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState({});
  const [userId, setUserId] = useState("");
  const [fetchError, setFetchError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCourseData, setCurrentCourseData] = useState({});
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(-1);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [degreeProgress, setDegreeProgress] = useState([null]);
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [progressPercentage, setProgressPercentage] = useState();

  const courseDetails = location.state;
  console.log(courseDetails);
  const userInfo = JSON.parse(localStorage.getItem('userdata'))

  const [completedExercises, setCompletedExercises] = useState(new Set());

  useEffect(() => {
    const fetchData = async () => {
      try {
        setCourseData(courseDetails)

        if (userInfo) {
          const userId = userInfo._id
          setUserId(userId)
        } else {
          setFetchError(true);
        }
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching course details:", error);
        setIsLoading(false)
        setFetchError(true)
      }
    }
    fetchData()

    const fetchvideo = async () => {
      try {
        const res = await axios.get(
          `${apiBaseUrl}/api/users/progress/${userInfo._id}/${userInfo.applyingFor}`
        );
        const data = res.data.degreeProgress;
        setDegreeProgress(data)
    
        const completed = new Set();
        let totalChapterProgress = 0; // Sum of chapter progress percentages
        let totalChapters = 0; // Count of all chapters
    
        data.courses.forEach((course) => {
          course.chapters.forEach((chapter) => {
            totalChapterProgress += chapter.progressPercentage || 0; // Add chapter progress
            totalChapters += 1; // Count each chapter
    
            chapter.lessons.forEach((lesson) => {
              if (lesson.isComplete) {
                completed.add(`${chapter.chapterId}-${lesson.lessonId}`);
              }
            });
          });
        });
    
        const averageProgress = totalChapters > 0 ? totalChapterProgress / totalChapters : 0;
        setProgressPercentage(averageProgress); // Set average progress percentage
    
        setCompletedLessons(completed);
        console.log("Completed Lessons:", completed);
        console.log("Average Chapter Progress:", averageProgress);
      } catch (error) {
        console.error("Error fetching video progress:", error);
      }
    };
    
    fetchvideo()
  }, [])

  const handleCurrentContent = async (data, chapterId, lessonId) => {
    console.log(data, chapterId, courseId);
    const modifiedData = {
      ...data,
      exerciseNo: lessonId,
      lessonNo: chapterId,
      type: data.fileType,
      link: data.file,
      //  duration: data.duration,
    };
    setCurrentCourseData(modifiedData);
    setCurrentChapterIndex(chapterId);
    setCurrentLessonIndex(lessonId);
    setActiveAccordion(chapterId)
  }
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
    }else if (typeManual === "application/pdf") {
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
                  // {title: `${data?.title} `},
                  data,
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
    }else if (typeManual === "application/vnd.openxmlformats-officedocument.presentationml.presentation") {
      const officeEmbedUrl = `https://view.officeapps.live.com/op/view.aspx?src=${
        link
      }`;
      
      return (
        <>
          <div className="embed-responsive-item">
            <iframe
              title="PPT Viewer"
              src={officeEmbedUrl}
              style={{ width: "100%", height: "500px", border: "none" }}
              allow="autoplay; encrypted-media"
              onError={(e) => {
                e.target.src = officeEmbedUrl;
              }}
            />
            <div className="MarkAsCompleted">
              <button className="NextBtn"
              onClick={() =>
                handleMediaEnd(
                  // {title: `${data?.title} `},
                  data,
                  lessonIndex,
                  exerciseIndex
                )
              }
              > Mark as Completed</button>
            </div>
          </div>
        </>
      );
    }
  };

  const handleMediaEnd = async () => {
    if (currentChapterIndex === null || currentLessonIndex === null) {
      console.error("Invalid indices for chapter or lesson.");
      return;
    }

    try {
      // Construct a unique key for tracking completion
      const exerciseKey = `${currentChapterIndex}-${currentLessonIndex}`;
      const currentChapter = courseData?.chapters?.find(
        (chapter) => chapter.chapterId === currentChapterIndex
      );
      const currentLesson = currentChapter?.lessons?.find(
        (lesson) => lesson.lessonId === currentLessonIndex
      );

      if (!currentChapter || !currentLesson) {
        console.error("Chapter or Lesson data not found:", {
          currentChapterIndex,
          currentLessonIndex,
        });
        return;
      }

      // Update the set of completed exercises
      setCompletedExercises((prev) => {
        const updatedSet = new Set(prev);
        updatedSet.add(exerciseKey);
        return updatedSet;
      });

      // Optional: Log progress or handle additional actions
      console.log(`Marked lesson completed: ${currentLesson.title}`);

      // Optional: If there's an API call to save progress
      await progress_data(currentLessonIndex, currentChapterIndex);
    } catch (error) {
      console.error("Error in handleMediaEnd:", error);
    }
  };



  const progress_data = async (lessonIndex, chapterIndex) => {
    console.log(lessonIndex, chapterIndex);

    // Calculate total exercises and progress percentage
    const totalExercises = degreeProgress.chapters?.reduce(
      (total, chapter) => total + chapter.lessons?.length,
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

    try {
      // Endpoint URL
      const endpoint = `${apiBaseUrl}/api/users/progress`;

      // API request payload
      const payload = {
        userId,
        degreeId: userInfo.applyingFor,
        // courseId,
        // watchedPercentage,
        // lessonIndex,
        // chapterIndex,
        lessonId: lessonIndex
      };

      // API request
      const response = await axios.post(endpoint, payload);

      console.log("Progress updated successfully:", response.data);
    } catch (err) {
      console.error(
        "Error updating progress:",
        err.message,
        err.response?.data || {}
      );
    }
  };


const calculateProgress = () => {
  console.log(courseData.chapters);
  
  const totalExercises = courseData.chapters?.reduce(
    (total, chapter) =>{
      console.log( chapter.lessons?.length);
      total + chapter.lessons?.length,
      0
    }
  );

  const lessonProgress = progressPercentage > 0 ? (completedExercises.size / progressPercentage) * 100 : 0;

  // Combine lesson progress and chapter progress
  const overallProgress = (lessonProgress) ;

  localStorage.setItem(`courseProgress-${courseId}`, overallProgress);

  return overallProgress;
};


  const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };
  function convertToReadableDuration(duration) {
    if (!duration || duration === "0") {
      return "3mins+";
    }

    const [minutes, seconds] = duration.split(":");
    return `${parseInt(minutes, 10)}m ${parseInt(seconds, 10)}s`;
  }
  return (
    <div className="courseContentContainer">
      <div className="row firstRow g-0">
        <div className="courseContentHeader">
          <button className="BackBtn" onClick={() => navigate(-1)}>
            Back
          </button>
          <div className="courseHeading">
            {truncateText(courseData.title, 45)}
          </div>
          <button
            className="NextBtn"
          // onClick={() => handleNext()}
          >
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
            <div className="embed-responsive embed-responsive-16by9">
              {courseData?.chapters?.length > 0 &&
                renderContent(
                  !currentCourseData.link
                    ? '/test.mp4'
                    : currentCourseData.link,
                  !currentCourseData.link ? "video" : currentCourseData.type
                )
              }
            </div>
            <div>
              <div className="infoBox">
                <h1>{courseData.title}</h1>
                {courseData.chapters && courseData.chapters.length > 0 && (
                  <div className="lessonDescriptionBox">
                    <h3 className="lessonDescriptionBoxTitle">
                      {/* {!currentCourseData.title
                        ? ""
                        : `${currentCourseData.lessonNo}.${currentCourseData.excerciseNo}`} */}
                      {!currentCourseData.title
                        ? courseData.chapters.title
                        : currentCourseData.title}
                    </h3>
                    <p className="lessonDescriptionBoxDescription">
                      {!currentCourseData.notes
                        ? courseData.chapters.description
                        : currentCourseData.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 CCaccordianBox">
          <Accordion
          // activeKey={activeAccordion}
          // onSelect={ }
          >
            {courseData?.chapters &&
              courseData.chapters?.map((chapter, index) => {
                const ChapterCompleted = chapter.lessons?.every((lesson) =>
                  completedExercises.has(`${chapter.chapterId}-${lesson.lessonId}`)
                );
                return (
                  <Accordion.Item key={chapter.chapterId} eventKey={chapter.chapterId}>
                    <Accordion.Header>
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
                        {/* <span className="lesson-duration">

                      </span> */}
                        <span>Total Content : {chapter.lessons?.length}</span>
                      </div>
                    </Accordion.Header>

                    <Accordion.Body>
                      <div className="">
                        <ul className="list-group">
                          {chapter.lessons.map((lesson) => {
                            return (
                              <li
                                key={lesson.lessonId}
                                className={`list-group-item
                                  ${currentCourseData.title === lesson.title
                                    ? "list-group-item-active"
                                    : ""
                                  }
                                  ${completedExercises.has(`${chapter.chapterId}-${lesson.lessonId}`)
                                    ? "completedLesson"
                                    : ""
                                  }`}
                                onClick={() =>
                                  handleCurrentContent(
                                    lesson,
                                    chapter.chapterId,
                                    lesson.lessonId
                                  )
                                }>
                                <span className="video-number">
                                  <div>{lesson.title}</div>
                                  {(completedExercises.has(`${chapter.chapterId}-${lesson.lessonId}`) || completedLessons.has(`${chapter.chapterId}-${lesson.lessonId}`)) && (
                                    <img className="content-watched" src={tick} alt="watched" />
                                  )}

                                </span>
                                {lesson.fileType === "video/mp4" ? (
                                  <span className="lesson-duration">
                                    Duration: {lesson.duration ? convertToReadableDuration(Math.floor(lesson.duration / 1000)) : "N/A"}
                                  </span>
                                ) : (
                                  <span className="lesson-duration">
                                    Type: {truncateText(lesson?.fileType, 30)}
                                  </span>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                        {chapter.testId && (
                          <div className="testButtonBox">
                            <div className="testButtonInr">
                              <div className="testButtonTxt">
                                Take a Test to Confirm Your Understanding
                              </div>

                              <button
                                className="testButton"
                                onClick={() =>
                                  navigate(
                                    `/home/tests/${lesson.testId}/user/${userId}`
                                  )
                                }>
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
  );
};

export default CourseContent;
