import React, { useState } from "react";

const AddDegreePage = () => {
  const [degreeData, setDegreeData] = useState({
    title: "",
    description: "",
    price: "",
    degreeThumbnail: null,
    courses: [],
  });

  const handleDegreeChange = (field, value) => {
    setDegreeData({ ...degreeData, [field]: value });
  };

  const handleFileChange = (e) => {
    setDegreeData({ ...degreeData, degreeThumbnail: e.target.files[0] });
  };

  const handleAddCourse = () => {
    setDegreeData({
      ...degreeData,
      courses: [
        ...degreeData.courses,
        { title: "", description: "", courseThumbnail: null, chapters: [] },
      ],
    });
  };

  const handleCourseChange = (index, field, value) => {
    const updatedCourses = [...degreeData.courses];
    updatedCourses[index][field] = value;
    setDegreeData({ ...degreeData, courses: updatedCourses });
  };

  const handleAddChapter = (courseIndex) => {
    const updatedCourses = [...degreeData.courses];
    updatedCourses[courseIndex].chapters.push({ title: "", lessons: [] });
    setDegreeData({ ...degreeData, courses: updatedCourses });
  };

  const handleChapterChange = (courseIndex, chapterIndex, field, value) => {
    const updatedCourses = [...degreeData.courses];
    updatedCourses[courseIndex].chapters[chapterIndex][field] = value;
    setDegreeData({ ...degreeData, courses: updatedCourses });
  };

  const handleAddLesson = (courseIndex, chapterIndex) => {
    const updatedCourses = [...degreeData.courses];
    updatedCourses[courseIndex].chapters[chapterIndex].lessons.push({
      title: "",
      file: null,
      subLessons: [],
    });
    setDegreeData({ ...degreeData, courses: updatedCourses });
  };

  const handleLessonChange = (
    courseIndex,
    chapterIndex,
    lessonIndex,
    field,
    value
  ) => {
    const updatedCourses = [...degreeData.courses];
    updatedCourses[courseIndex].chapters[chapterIndex].lessons[lessonIndex][
      field
    ] = value;
    setDegreeData({ ...degreeData, courses: updatedCourses });
  };

  const handleAddSubLesson = (courseIndex, chapterIndex, lessonIndex) => {
    const updatedCourses = [...degreeData.courses];
    updatedCourses[courseIndex].chapters[chapterIndex].lessons[
      lessonIndex
    ].subLessons.push({
      title: "",
      file: null,
    });
    setDegreeData({ ...degreeData, courses: updatedCourses });
  };

  const handleSubLessonChange = (
    courseIndex,
    chapterIndex,
    lessonIndex,
    subLessonIndex,
    field,
    value
  ) => {
    const updatedCourses = [...degreeData.courses];
    updatedCourses[courseIndex].chapters[chapterIndex].lessons[
      lessonIndex
    ].subLessons[subLessonIndex][field] = value;
    setDegreeData({ ...degreeData, courses: updatedCourses });
  };

  const handleSubmit = async () => {
    // Validation logic here (unchanged)
    const formData = new FormData();
    formData.append("title", degreeData.title);
    formData.append("description", degreeData.description);
    formData.append("price", degreeData.price);
    formData.append("degreeThumbnail", degreeData.degreeThumbnail);

    degreeData.courses.forEach((course, courseIndex) => {
      formData.append("courseThumbnails", course.courseThumbnail);
      course.chapters.forEach((chapter) => {
        chapter.lessons.forEach((lesson) => {
          formData.append("lessonFiles", lesson.file);
          lesson.subLessons.forEach((subLesson) => {
            formData.append("subLessonFiles", subLesson.file);
          });
        });
      });
    });

    formData.append("courses", JSON.stringify(degreeData.courses));

    const response = await fetch(
      "https://z-backend-2xag.onrender.com/api/degrees",
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();
    console.log("Degree uploaded:", result);
  };

  return (
    <div>
      <h2>Add Degree</h2>
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => handleDegreeChange("title", e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        onChange={(e) => handleDegreeChange("description", e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        onChange={(e) => handleDegreeChange("price", e.target.value)}
      />
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleAddCourse}>Add Course</button>
      {degreeData.courses.map((course, courseIndex) => (
        <div key={courseIndex}>
          <h3>Course {courseIndex + 1}</h3>
          <input
            type="text"
            placeholder="Course Title"
            onChange={(e) =>
              handleCourseChange(courseIndex, "title", e.target.value)
            }
          />
          <input
            type="text"
            placeholder="Course Description"
            onChange={(e) =>
              handleCourseChange(courseIndex, "description", e.target.value)
            }
          />
          <input
            type="file"
            onChange={(e) =>
              handleCourseChange(
                courseIndex,
                "courseThumbnail",
                e.target.files[0]
              )
            }
          />
          <button onClick={() => handleAddChapter(courseIndex)}>
            Add Chapter
          </button>
          {course.chapters.map((chapter, chapterIndex) => (
            <div key={chapterIndex}>
              <h4>Chapter {chapterIndex + 1}</h4>
              <input
                type="text"
                placeholder="Chapter Title"
                onChange={(e) =>
                  handleChapterChange(
                    courseIndex,
                    chapterIndex,
                    "title",
                    e.target.value
                  )
                }
              />
              <button
                onClick={() => handleAddLesson(courseIndex, chapterIndex)}
              >
                Add Lesson
              </button>
              {chapter.lessons.map((lesson, lessonIndex) => (
                <div key={lessonIndex}>
                  <h5>Lesson {lessonIndex + 1}</h5>
                  <input
                    type="text"
                    placeholder="Lesson Title"
                    onChange={(e) =>
                      handleLessonChange(
                        courseIndex,
                        chapterIndex,
                        lessonIndex,
                        "title",
                        e.target.value
                      )
                    }
                  />
                  <input
                    type="file"
                    onChange={(e) =>
                      handleLessonChange(
                        courseIndex,
                        chapterIndex,
                        lessonIndex,
                        "file",
                        e.target.files[0]
                      )
                    }
                  />
                  <button
                    onClick={() =>
                      handleAddSubLesson(courseIndex, chapterIndex, lessonIndex)
                    }
                  >
                    Add SubLesson
                  </button>
                  {lesson.subLessons.map((subLesson, subLessonIndex) => (
                    <div key={subLessonIndex}>
                      <h6>SubLesson {subLessonIndex + 1}</h6>
                      <input
                        type="text"
                        placeholder="SubLesson Title"
                        onChange={(e) =>
                          handleSubLessonChange(
                            courseIndex,
                            chapterIndex,
                            lessonIndex,
                            subLessonIndex,
                            "title",
                            e.target.value
                          )
                        }
                      />
                      <input
                        type="file"
                        onChange={(e) =>
                          handleSubLessonChange(
                            courseIndex,
                            chapterIndex,
                            lessonIndex,
                            subLessonIndex,
                            "file",
                            e.target.files[0]
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit Degree</button>
    </div>
  );
};

export default AddDegreePage;
