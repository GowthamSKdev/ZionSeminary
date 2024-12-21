import React from "react";
import { useNavigate } from "react-router-dom";
import DemoImage from "../../assets/Images/imagenotxt2.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./degrees.css";

const DegreeCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="course-card shadow-sm border rounded p-3">
      {/* Thumbnail Image */}
      <img
        src={data?.thumbnail || DemoImage}
        alt={data?.name || "Default thumbnail"}
        className="course-img img-fluid rounded mb-3"
      />

      {/* Degree Title */}
      <h4 className="course-card-title text-primary mb-2 d-flex align-items-center">
        <i className="bi bi-bookmark-star-fill me-2"></i>
        {data?.name || "No Title Available"}
      </h4>

      {/* Description */}
      <p className="course-card-description text-muted">
        <i className="bi bi-file-text-fill me-2"></i>
        {data?.description?.slice(0, 80) || "No description available"}...
      </p>

      {/* Edit Button */}
      <button
        className="btn btn-primary w-100 mt-3 d-flex align-items-center justify-content-center"
        onClick={() => navigate("degree/edit", { state: data })}
      >
        <i className="bi bi-pencil-square me-2"></i>
        Edit Degree
      </button>
    </div>
  );
};

export default DegreeCard;
