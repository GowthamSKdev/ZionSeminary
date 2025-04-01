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
  const [currentSubLessonIndex, setCurrentSubLessonIndex] = useState(0);
  const [degreeProgress, setDegreeProgress] = useState([null]);
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [progressPercentage, setProgressPercentage] = useState();

  const courseDetails = location.state;
  console.log(courseDetails);
  const userInfo = JSON.parse(localStorage.getItem("userdata"));

  const [completedExercises, setCompletedExercises] = useState(new Set());
  const [completedSublessons, setCompletedSublessons] = useState(new Set());

  useEffect(() => {
    const fetchData = async () => {
      try {
        setCourseData(courseDetails);

        if (userInfo) {
          const userId = userInfo._id;
          setUserId(userId);
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

    const fetchvideo = async () => {
      try {
        const res = await axios.get(
          `${apiBaseUrl}/api/users/progress/${userInfo._id}/${userInfo.applyingFor}`
        );
        const data = res.data.degreeProgress;
        console.log(data);

        setDegreeProgress(data);

        const completed = new Set();
        let totalChapterProgress = 0; // Sum of chapter progress percentages
        let totalChapters = 0; // Count of all chapters

        data.courses.forEach((course) => {
          course.chapters.forEach((chapter) => {
            setProgressPercentage(course.progressPercentage);
            chapter.lessons.forEach((lesson) => {
              lesson.subLessons.forEach((subLesson) => {
                if (subLesson.isComplete) {
                  completed.add(
                    `${chapter.chapterId}-${lesson.lessonId}-${subLesson.subLessonId}`
                  );
                }
              });
            });
          });
        });

        const averageProgress =
          totalChapters > 0 ? totalChapterProgress / totalChapters : 0;
        // setProgressPercentage(averageProgress); // Set average progress percentage

        setCompletedExercises(completed);
        // setCompletedLessons(completed);
        console.log("Completed Lessons:", completed);
        console.log("Average Chapter Progress:", averageProgress);
      } catch (error) {
        console.error("Error fetching video progress:", error);
      }
    };

    fetchvideo();
  }, []);

  const handleCurrentContent = async (
    data,
    chapterId,
    lessonId,
    subLessonId
  ) => {
    console.log(data, chapterId, courseId, subLessonId);
    const modifiedData = {
      ...data,
      // exerciseNo: lessonId,
      // lessonNo: chapterId,
      exerciseNo: subLessonId,
      lessonNo: lessonId,
      chapterNo: chapterId,
      type: data.fileType,
      link: data.file,
      //  duration: data.duration,
    };
    setCurrentCourseData(modifiedData);
    setCurrentChapterIndex(chapterId);
    setCurrentLessonIndex(lessonId);
    setCurrentSubLessonIndex(subLessonId);
    setActiveAccordion(chapterId);
  };
  const renderContent = (
    link,
    typeManual,
    data,
    lessonIndex,
    exerciseIndex,
    chapterIndex
  ) => {
    if (typeManual === "video/mp4") {
      return (
        <>
          <div className="embed-responsive-item">
            {/* <video src={link} title={courseData.title || "Video Title"}> */}
            <video
              controls
              onEnded={() => {
                handleMediaEnd(data, lessonIndex, exerciseIndex, chapterIndex);
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
    } else if (typeManual === "application/pdf") {
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
    } else if (
      typeManual ===
      "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    ) {
      const officeEmbedUrl = `https://view.officeapps.live.com/op/view.aspx?src=${link}`;


      

      

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
          </div>
        </>
      );
    }
  };

  const handleMediaEnd = async () => {
    if (
      currentChapterIndex === null ||
      currentLessonIndex === null ||
      currentSubLessonIndex === null
    ) {
      console.error("Invalid indices for chapter or lesson.");
      return;
    }

    try {
      // Construct a unique key for tracking completion
      // const exerciseKey = `${currentChapterIndex}-${currentLessonIndex}`;
      const exerciseKey = `${currentChapterIndex}-${currentLessonIndex}-${currentSubLessonIndex}`;
      const currentChapter = courseData?.chapters?.find(
        (chapter) => chapter.chapterId === currentChapterIndex
      );
      const currentLesson = currentChapter?.lessons?.find(
        (lesson) => lesson.lessonId === currentLessonIndex
      );

      const currentSublesson = currentLesson?.subLessons?.find(
        (sublesson) => sublesson.subLessonId === currentSubLessonIndex
      );

      if (!currentChapter || !currentLesson || !currentSublesson) {
        console.error("Chapter or Lesson data not found:", {
          currentChapterIndex,
          currentLessonIndex,
          currentSubLessonIndex,
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
      console.log(`Marked lesson completed: ${currentSublesson.title}`);

      // Optional: If there's an API call to save progress
      await progress_data(
        currentLessonIndex,
        currentChapterIndex,
        currentSubLessonIndex
      );
    } catch (error) {
      console.error("Error in handleMediaEnd:", error);
    }
  };

  const progress_data = async (lessonIndex, chapterIndex, subLessonIndex) => {
    console.log(lessonIndex, chapterIndex, subLessonIndex);

    // Calculate total exercises and progress percentage
    const totalExercises = degreeProgress.courses?.reduce(
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
        lessonId: lessonIndex,
        subLessonId: subLessonIndex,
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

  
    const [completedTests, setCompletedTests] = useState(new Set());
  
    const markTestAsCompleted = (chapterId) => {
      setCompletedTests((prev) => new Set([...prev, chapterId]));
  };
  

  // new
  const handleNext = async () => {
    if (!courseData?.chapters || courseData.chapters.length === 0) {
      console.error("No chapters available.");
      return;
    }

    // Find the current chapter
    const currentChapter = courseData.chapters.find(
      (chapter) => chapter.chapterId === currentChapterIndex
    );

    if (!currentChapter) {
      console.error("Current chapter not found.");
      return;
    }

    // Find the current lesson
    const currentLesson = currentChapter.lessons.find(
      (lesson) => lesson.lessonId === currentLessonIndex
    );

    if (!currentLesson) {
      console.error("Current lesson not found.");
      return;
    }

    // Find the current sub-lesson
    const currentSubLesson = currentLesson.subLessons.find(
      (subLesson) => subLesson.subLessonId === currentSubLessonIndex
    );

    if (!currentSubLesson) {
      console.error("Current sub-lesson not found.");
      return;
    }

    // Check if there are more sub-lessons in the current lesson
    if (currentSubLessonIndex < currentLesson.subLessons.length - 1) {
      // Move to the next sub-lesson in the current lesson
      const nextSubLesson = currentLesson.subLessons[currentSubLessonIndex + 1];
      handleCurrentContent(
        nextSubLesson,
        currentChapterIndex,
        currentLessonIndex,
        currentSubLessonIndex + 1
      );
      setCurrentSubLessonIndex(currentSubLessonIndex + 1);
    } else if (currentLessonIndex < currentChapter.lessons.length - 1) {
      // Move to the first sub-lesson of the next lesson in the current chapter
      const nextLesson = currentChapter.lessons[currentLessonIndex + 1];
      const nextSubLesson = nextLesson.subLessons[0];
      handleCurrentContent(
        nextSubLesson,
        currentChapterIndex,
        currentLessonIndex + 1,
        0
      );
      setCurrentLessonIndex(currentLessonIndex + 1);
      setCurrentSubLessonIndex(0);
    } else if (currentChapterIndex < courseData.chapters.length - 1) {
      // Move to the first sub-lesson of the first lesson in the next chapter
      const nextChapter = courseData.chapters[currentChapterIndex + 1];
      const nextLesson = nextChapter.lessons[0];
      const nextSubLesson = nextLesson.subLessons[0];
      handleCurrentContent(nextSubLesson, currentChapterIndex + 1, 0, 0);
      setCurrentChapterIndex(currentChapterIndex + 1);
      setCurrentLessonIndex(0);
      setCurrentSubLessonIndex(0);
    } else {
      // No more content to navigate to
      console.log("You have reached the end of the course.");
    }
  };
  // new


  return (
    <div className="courseContentContainer min-vh-100">
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
            onClick={() => handleNext()}
            // onClick={() => navigate(+1)}
    

          >
            Next
          </button>
        </div>
        <div className="courseContentProgressBar">
          <ProgressBar progress={progressPercentage || 0} />
        </div>
      </div>
      <div className="row secondRow">
        <div className="col-md-8 pdy">
          <div className="videoBox">
            <div className="embed-responsive embed-responsive-16by9">
              {courseData?.chapters?.length > 0 &&
                renderContent(
                  !currentCourseData.link
                    ? "/test.mp4"
                    : currentCourseData.link,
                  !currentCourseData.link ? "/test.mp4" : currentCourseData.type
                )}
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
        <div className="col-md-4 CCaccordianBox h-100">
          

          <Accordion
            activeKey={activeAccordion}
            onSelect={(key) => setActiveAccordion(key)}
          >
            {courseData?.chapters &&
              courseData.chapters.map((chapter, index) => {
                const ChapterCompleted = chapter.lessons?.every((lesson) =>
                  lesson.subLessons?.every((subLesson) =>
                    completedExercises.has(
                      `${chapter.chapterId}-${lesson.lessonId}-${subLesson.subLessonId}`
                    )
                  )
                );

                return (
                  <Accordion.Item
                    key={chapter.chapterId}
                    eventKey={chapter.chapterId}
                  >
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
                        <span>Total Content: {chapter.lessons?.length}</span>
                      </div>
                    </Accordion.Header>

                    <Accordion.Body>
                      <Accordion>
                        {chapter.lessons.map((lesson) => {
                          const LessonCompleted = lesson.subLessons?.every(
                            (subLesson) =>
                              completedExercises.has(
                                `${chapter.chapterId}-${lesson.lessonId}-${subLesson.subLessonId}`
                              )
                          );

                          return (
                            <Accordion.Item
                              key={lesson.lessonId}
                              eventKey={`${chapter.chapterId}-${lesson.lessonId}`}
                            >
                              <Accordion.Header>
                                <div className="CClesson-meta">
                                  <div className="CClesson-title">
                                    <div>
                                      {index + 1}&nbsp;.&nbsp;{lesson.title}
                                    </div>
                                    {/* <span>{lesson.title}</span> */}
                                    {LessonCompleted && (
                                      <img
                                        className="content-watched"
                                        src={tick}
                                        alt="watched"
                                      />
                                    )}
                                  </div>
                                  <span>
                                    Total Content : {lesson.subLessons?.length}
                                  </span>
                                </div>
                              </Accordion.Header>

                              <Accordion.Body>
                                {lesson.subLessons &&
                                lesson.subLessons.length > 0 ? (
                                  <ul className="list-group d-flex ">
                                    {lesson.subLessons.map((subLesson) => {
                                      return (
                                        <>
                                          <li
                                            key={subLesson.subLessonId}
                                            className={`list-group-item ${
                                              completedExercises.has(
                                                `${chapter.chapterId}-${lesson.lessonId}-${subLesson.subLessonId}`
                                              )
                                                ? "completedLesson"
                                                : ""
                                            }`}
                                            onClick={() =>
                                              handleCurrentContent(
                                                subLesson,
                                                chapter.chapterId,
                                                lesson.lessonId,
                                                subLesson.subLessonId
                                              )
                                            }
                                          >
                                            <span className="video-number">
                                              <span>{subLesson.title}</span>

                                              {(completedExercises.has(
                                                `${chapter.chapterId}-${lesson.lessonId}-${subLesson.subLessonId}`
                                              ) ||
                                                completedSublessons.has(
                                                  `${chapter.chapterId}-${lesson.lessonId}-${subLesson.subLessonId}`
                                                )) && (
                                                <img
                                                  className="content-watched"
                                                  src={tick}
                                                  alt="watched"
                                                />
                                              )}
                                            </span>

                                            {subLesson.fileType ===
                                            "video/mp4" ? (
                                              <span className="lesson-duration">
                                                Duration:{" "}
                                                {subLesson.duration
                                                  ? convertToReadableDuration(
                                                      Math.floor(
                                                        lesson.duration / 1000
                                                      )
                                                    )
                                                  : "N/A"}
                                              </span>
                                            ) : (
                                              <span className="lesson-duration">
                                                Type:{" "}
                                                {truncateText(
                                                  subLesson?.fileType,
                                                  30
                                                )}
                                              </span>
                                            )}
                                          </li>
                                          {subLesson.test &&
                                          subLesson.test.length > 0 ? (
                                            <div className="testButtonBox">
                                              <div className="testButtonBox">
                                                <div className="testButtonInr">
                                                  <div className="testButtonTxt">
                                                    UnderStand Start
                                                  </div>
                                                  <button
                                                    className="testButton text-nowrap"
                                                    onClick={() =>{
                                                      subLesson.test[0].type ===
                                                      "MCQ"
                                                        ? navigate(
                                                            `/home/courseContent/${courseId}/assessmentTest`,
                                                            {
                                                              state: {
                                                                test: subLesson.test,
                                                              },
                                                            }
                                                          )
                                                        : subLesson.test[0]
                                                            .type ===
                                                          "paragraph"
                                                        ? navigate(
                                                            `/home/courseContent/${courseId}/writtenTest`,
                                                            {
                                                              state: {
                                                                test: subLesson.test,
                                                              },
                                                            }
                                                          )
                                                        : null,
                                                        handleMediaEnd(
                                                          subLesson,
                                                          chapter.chapterId,
                                                          lesson.lessonId,
                                                          subLesson.subLessonId
                                                        )
                                                    }
                                                      
                                                    }
                                                  >
                                                    Test
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          ) : null}
                                        </>
                                      );
                                    })}
                                  </ul>
                                ) : (
                                  <div>No Sub-Lessons Available</div>
                                )}
                              </Accordion.Body>
                            </Accordion.Item>
                          );
                        })}
                        {chapter.test && chapter.test.length > 0 ? (
                          <div className="testButtonBox">
                            <div className="testButtonInr">
                              <div className="testButtonTxt">
                                Take a Test to Confirm Your Understanding
                              </div>

<button
  className="testButton"
  onClick={() => {
    if (chapter.test[0].type === "MCQ") {
      navigate(`/home/courseContent/${courseId}/assessmentTest`, {
        state: { test: chapter.test },
      });
    } else if (chapter.test[0].type === "paragraph") {
      navigate(`/home/courseContent/${courseId}/writtenTest`, {
        state: { test: chapter.test, chapterId: chapter._id },
      });
    }
    // Mark test as completed
    markTestAsCompleted(chapter.chapterId);
  }}
>
  Take Test
  {completedTests.has(chapter.chapterId) && (
    <img className="content-watched" src={tick} alt="Completed" />
  )}
</button>
                            </div>
                          </div>
                        ) : null}
                      </Accordion>
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

