import React, { useEffect, useState } from "react";
import { convertToUTC } from "../../../hooks/newCourseFunctions";
import ToggleBtn from "../../../components/Test/ToggleBtn";
import { addNewTest, getTestById, updateTest } from "../../../firebase/testApi";

const AddTest = ({ testId, closeTest, addTest }) => {
  const initialMCQState = {
    question: "",
    correctAnswer: null,
    options: [],
    questionNumber: null,
    updateIndex: null,
    type: "MCQ",
  };

  const initialParagraphState = {
    question: "",
    questionNumber: null,
    updateIndex: null,
    type: "Paragraph",
  };

  const [currentTest, setCurrentTest] = useState({
    title: "Testing Exam",
    timeLimit: 11,
    questions: [],
    target: "course",
  });

  const [currentQuestion, setCurrentQuestion] = useState(initialMCQState);
  const [dropDown, setDropDown] = useState(false);
  const [duration, setDuration] = useState({ hours: 0, minutes: 0 });

  useEffect(() => {
    const getTest = async () => {
      if (testId?.length > 1) {
        const data = await getTestById(testId);
        setCurrentTest(data);
        const time = convertToUTC(data?.test?.timeLimit);
        setDuration(time);
      }
    };
    getTest();
  }, [testId]);

  const handleChoiceSelect = (index) => {
    setDropDown(false);
    setCurrentQuestion({
      ...currentQuestion,
      correctAnswer: currentQuestion?.options[index],
    });
  };

  const handleChoiceInput = (index, value) => {
    const newChoices = [...currentQuestion.options];
    newChoices[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: newChoices });
  };

  const handleNext = () => {
    const updatedTest = [...currentTest.questions];
    if (currentQuestion.updateIndex === null) {
      updatedTest.push(currentQuestion);
    } else {
      updatedTest[currentQuestion.updateIndex] = currentQuestion;
    }
    setCurrentTest({ ...currentTest, questions: updatedTest });
    setCurrentQuestion(initialMCQState);
  };

  const handleAddTest = async () => {
    try {
      const data =
        testId?.length > 5
          ? await updateTest(currentTest)
          : await addNewTest(currentTest);
      addTest(data);
      closeTest();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container p-4 border rounded">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>
          <i className="bi bi-pencil-square me-2"></i> Add/Edit Test
        </h4>
        <button className="btn btn-danger" onClick={() => closeTest()}>
          <i className="bi bi-x-circle"></i> Cancel
        </button>
      </div>

      {/* Test Title */}
      <div className="mb-3">
        <label htmlFor="testTitle" className="form-label fw-bold">
          Chapter Title
        </label>
        <input
          id="testTitle"
          type="text"
          className="form-control"
          value={currentTest?.title}
          onChange={(e) =>
            setCurrentTest({ ...currentTest, title: e.target.value })
          }
        />
      </div>

      {/* Duration */}
      <div className="mb-4 row">
        <label className="form-label fw-bold">Set Duration</label>
        <div className="col-6">
          <input
            type="number"
            className="form-control"
            placeholder="Hours"
            value={duration?.hours}
            onChange={(e) => setDuration({ ...duration, hours: e.target.value })}
          />
        </div>
        <div className="col-6">
          <input
            type="number"
            className="form-control"
            placeholder="Minutes"
            value={duration?.minutes}
            onChange={(e) =>
              setDuration({ ...duration, minutes: e.target.value })
            }
          />
        </div>
      </div>

      {/* Questions Section */}
      <div className="mb-4">
        <label className="fw-bold">Question</label>
        <textarea
          className="form-control"
          rows="3"
          value={currentQuestion?.question}
          onChange={(e) =>
            setCurrentQuestion({ ...currentQuestion, question: e.target.value })
          }
        ></textarea>
      </div>

      {/* Options */}
      {currentQuestion?.type === "MCQ" && (
        <div>
          <label className="fw-bold">Choices</label>
          {["Choice one", "Choice two", "Choice three", "Choice four"].map(
            (label, index) => (
              <div className="input-group mb-2" key={index}>
                <span className="input-group-text">
                  <i className="bi bi-check-circle"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder={label}
                  value={currentQuestion?.options[index] || ""}
                  onChange={(e) => handleChoiceInput(index, e.target.value)}
                />
              </div>
            )
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="d-flex justify-content-end gap-2">
        <button
          className="btn btn-secondary"
          onClick={handleNext}
          disabled={!currentQuestion?.question?.length > 5}
        >
          <i className="bi bi-arrow-right-circle"></i> Save & Next
        </button>
        <button className="btn btn-success" onClick={handleAddTest}>
          <i className="bi bi-folder-plus"></i> Add to Chapter
        </button>
      </div>
    </div>
  );
};

export default AddTest;
