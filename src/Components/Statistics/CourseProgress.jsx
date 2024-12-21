import React from "react";
import "./courseProgress.css";
import { ProgressBar } from "react-bootstrap";
const CourseProgress = () => {
  return (
    <>
      <div className="progress-container">
        {/*  */}
        <div className="progress-card">
          <img src="/logoShort.png" alt="" className="progress-card-image" />
          <div className="progress-wrapper">
            <p className="progress-card-title">Course Title</p>
            <div className="progress-card-bar">
              <p>Current Progress : 20%</p>
              <ProgressBar animated striped variant="info" now={20} />
            </div>
          </div>
          {/*  */}
        </div>
        <div className="progress-card">
          <img src="/logoShort.png" alt="" className="progress-card-image" />
          <div className="progress-wrapper">
            <p className="progress-card-title">Course Title</p>
            <div className="progress-card-bar">
              <p>Current Progress : 50%</p>
              <ProgressBar animated striped variant="info" now={50} />
            </div>
          </div>
        </div>
        {/*  */}
        <div className="progress-card">
          <img src="/logoShort.png" alt="" className="progress-card-image" />
          <div className="progress-wrapper">
            <p className="progress-card-title">Course Title</p>
            <div className="progress-card-bar">
              <p>Current Progress : 80%</p>
              <ProgressBar animated striped variant="info" now={80} />
            </div>
          </div>
        </div>
        {/*  */}
      </div>
    </>
  );
};

export default CourseProgress;
