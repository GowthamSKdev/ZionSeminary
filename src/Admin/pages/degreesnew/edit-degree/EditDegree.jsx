import React, { useEffect, useState } from "react";
import Edit from "./Edit";
import { useLocation } from "react-router-dom";
import LeftBar from "../../../components/global/sidebar/LeftBar";
import { getDegreeById } from "../../../firebase/degreeApi";

const EditDegree = () => {
  const [currentDegree, setCurrentDegree] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const data = useLocation().state;

  useEffect(() => {
    const getDegreeData = async () => {
      try {
        const res = await getDegreeById(data.id);
        setCurrentDegree(res);
      } catch (error) {
        console.error("Error fetching degree data:", error);
      } finally {
        setLoading(false);
      }
    };
    getDegreeData();
  }, [data]);

  return (
    <div className="courses-page d-flex">
      {/* Sidebar */}
      <LeftBar />

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <div className="d-flex align-items-center mb-4">
          <h2 className="me-3">
            <i className="bi bi-pencil-square text-primary me-2"></i>
            Edit Degree
          </h2>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : currentDegree ? (
          <Edit courseDetails={currentDegree} />
        ) : (
          <div className="alert alert-danger" role="alert">
            <i className="bi bi-exclamation-triangle me-2"></i>
            Error: Degree data could not be loaded.
          </div>
        )}
      </div>
    </div>
  );
};

export default EditDegree;
