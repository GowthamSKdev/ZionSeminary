import React, { useEffect, useState } from "react";
import Edit from "./Edit";
import { useLocation } from "react-router-dom";
import LeftBar from "../../../components/global/sidebar/LeftBar";
import { getDegreeById } from "../../../firebase/degreeApi";
import axios from "axios";
const apiBaseUrl = process.env.REACT_APP_BASE_API;
const EditDegree = () => {
  const [currentDegree, setCurrentDegree] = useState(null)
  const data = useLocation().state;
  // console.log(data);
  

  useEffect(() => {
    const getDegreeData = async () => {
      // const res = await getDegreeById(data.id)
      const res = await axios.get(`${apiBaseUrl}/api/degrees/${data._id}`);
      console.log(res.data.degree);
      setCurrentDegree(res.data.degree)
    }
    getDegreeData()
  }, [data])

  return (
    <div className="courses-page">
      <LeftBar />
      <Edit courseDetails={currentDegree} />
    </div>
  );
};

export default EditDegree;
