import React, { useEffect, useState } from "react";
import DegreeCard from "./DegreeCard";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./degrees.css";
import { useNavigate } from "react-router-dom";
import { getAllDegrees } from '../../firebase/degreeApi';
import axios from "axios";

const DegreeList = () => {
  const navigate = useNavigate();
  const [courses, SetCourses] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        if (courses === null) {
          // const QueryDocumentSnapshots = await getAllDegrees();
          // console.log(QueryDocumentSnapshots);
          const responseDegrees = await axios.get('/api/degree')
          SetCourses(responseDegrees.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCourses();
  }, [courses]);

  return (
    <div className="course-list-cnt">
      <div className="course-list-header d-flex justify-content-between align-items-center mb-3">
        <h2 className="h2-user-title">
          <i className="bi bi-journal"></i> All Degrees
        </h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate("degrees/new")}
        >
          <i className="bi bi-plus-circle"></i> Add Degree
        </button>
      </div>
      <div className="course-list row">
        {courses &&
          courses?.map((course, index) => (
            <div className="col-md-2 col-sm-6" key={index}>
              <DegreeCard data={course} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default DegreeList;
