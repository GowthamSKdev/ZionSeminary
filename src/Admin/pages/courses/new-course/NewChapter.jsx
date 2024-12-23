import React, { useState } from "react";

const NewChapter = ({ addChapter }) => {
  const [chapterDetails, setChapterDetails] = useState({
    title: "",
    lessons: [], // To store lesson data
  });

  const [lesson, setLesson] = useState({
    title: "",
    file: null,
    fileType: "",
    test: null, // Optional field for lesson test
  });

  const handleAddLesson = () => {
    setChapterDetails((prev) => ({
      ...prev,
      lessons: [...prev.lessons, lesson],
    }));
    setLesson({
      title: "",
      file: null,
      fileType: "",
      test: null,
    });
  };

  const handleSubmitChapter = () => {
    addChapter(chapterDetails);
    setChapterDetails({
      title: "",
      lessons: [],
    });
  };

    return (
      <div className="lesson-popup-page">
            
    <div style={{backgroundColor: "white", padding: "20px"}}>
      <h2>Create New Chapter</h2>
      <input
        type="text"
        placeholder="Chapter Title"
        value={chapterDetails.title}
        onChange={(e) =>
            setChapterDetails((prev) => ({ ...prev, title: e.target.value }))
        }
        />

      <h3>Add Lesson</h3>
      <input
        type="text"
        placeholder="Lesson Title"
        value={lesson.title}
        onChange={(e) =>
            setLesson((prev) => ({ ...prev, title: e.target.value }))
        }
        />
      <input
        type="file"
        onChange={(e) =>
            setLesson((prev) => ({
            ...prev,
            file: URL.createObjectURL(e.target.files[0]),
            fileType: e.target.files[0].type,
        }))
    }
    />
      <textarea
        placeholder="Test Details (optional)"
        onChange={(e) =>
            setLesson((prev) => ({ ...prev, test: e.target.value }))
        }
        />
      <button onClick={handleAddLesson}>Add Lesson</button>

      <button onClick={handleSubmitChapter}>Add Chapter</button>
    </div>
        </div>
  );
};

export default NewChapter;
