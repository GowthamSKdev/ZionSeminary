import React, { useEffect, useState } from "react";
import DegreeCard from "./DegreeCard";
import "./degrees.css";
import axios from "axios";

// import courseList from "../Assets/Data/courseList.json";
import { useNavigate } from "react-router-dom";
// import Assignment from "../../components/Assignment/Assignment";
// import Payment from "../../components/Payment/Payment";
// import { getDegrees } from "../../firebase/degreeApi";
// import { getAllDegrees } from '../../firebase/degreeApi'

const apiBaseUrl = process.env.REACT_APP_BASE_API;
const DegreeList = () => {
  const navigate = useNavigate();
  const [courses, SetCourses] = useState(null);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        if (courses === null) {
          // const QueryDocumentSnapshots = await getAllDegrees();
          // console.log(QueryDocumentSnapshots)
          // SetCourses(QueryDocumentSnapshots);
          const responseDegrees = await axios.get(`${apiBaseUrl}/api/degrees`);
          const { degrees } = responseDegrees.data;

          console.log(degrees);
             SetCourses(degrees);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCourses()
  }, [])
  


  return (
    <div className="course-list-cnt">
       {/* <div>
              <Assignment/>
      </div>
      <div>
        <Payment/>
      </div> */}
      <div className="course-list-header">
        <h2 className="h2-user-title">All Degrees</h2>
        <div className="admin-add-course-btn" onClick={() => navigate("/admin/degrees/new")}>
          <h3 className="top-btn-text">Add Degree</h3>
        </div>
      </div>
      <div className="course-list">
        {courses && courses?.map((course, index) => (
          <div className="" key={index}>
            <DegreeCard data={course } />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DegreeList;
