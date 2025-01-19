import React from "react";
import { useNavigate } from "react-router-dom";
import DemoImage from '../../assets/Images/imagenotxt2.png';
import { Edit3 } from "lucide-react";


const DegreeCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    // <div
    //   className="course-card"
    //   onClick={() => navigate("degree/edit", { state: data })}
    // >
    //   <img
    //     src={data?.thumbnail || DemoImage}
    //     alt={data?.name || "Default thumbnail"}
    //     className="course-img"
    //   />
    //   <h4 className="course-card-title">{data?.name}</h4>
    //   <p className="course-card-description">
    //     {data?.description?.slice(0, 80) || "No description available"}..
    //   </p>
    //   <div className="course-edit-btn">
    //     <p>Edit Degree</p>
    //   </div>
    // </div>
    <>
     
      <div className="zion-card">
        <div className="zion-course-card">
          <img src={data.thumbnail ? data.thumbnail : DemoImage} alt={data.title} />
          <div className="zion-course-content">
            <h3 className="zion-course-title">{data.title}</h3>
            <p className="zion-course-description">{data.description}</p>
            <div className="">
              <button
                className="btn btn-success"
                onClick={() => navigate("/admin/degrees/edit", { state: data })}
              >
                <Edit3 />
                Edit Degree
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DegreeCard;
