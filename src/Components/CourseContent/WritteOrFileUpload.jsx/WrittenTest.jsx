import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./WrittenTest.css";
export default function WrittenTest() {
  const location = useLocation();
  const navigate = useNavigate()
  const { test } = location.state;

  const [testData, setTestData] = useState(test[0]);

  return (
    <div className="writtenTest p-4 h-100 min-vh-100">
      <div className="d-flex align-items-center gap-2">
        <button className="btn btn-danger" onClick={()=>navigate(-1)}>Back</button>
        <h3 className="m-0">Written Test</h3>
      </div>
      <div
        className="written-test-container container-fluid h-100 p-4 d-flex flex-column gap-2
      "
      >
        <h6>Question</h6>
        <p className="written-question"> 1. Lorem ipsum dolor sit amet ?</p>
        <textarea
          name=""
          id=""
          className="form-control h-75"
          placeholder="Write the Answer ...."
        ></textarea>
        <span className="text-center w-100 d-flex justify-content-between">
          <hr /> Or <hr />{" "}
        </span>
        <input type="file" name="" id="" className="form-control" />
        <div className="d-flex align-items-end justify-content-end gap-4 mt-5">
          <button className="btn btn-secondary">Cancel</button>
          <button className="btn btn-primary">Submit</button>
        </div>
      </div>
    </div>
  );
}
