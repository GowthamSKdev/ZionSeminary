import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
const apiBaeApi = process.env.REACT_APP_BASE_API;

const AddEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resEvent = await axios.post(`${apiBaeApi}/api/admin-event`, {
      title: title,
      description: description,
      startDate: startDate,
      endDate: endDate,
    });
    console.log(resEvent);
     window.location.reload();
  };

  return (
    <div className="Add-event">
      <h3>Add Event</h3>
      <form className="d-grid event-form gap-3" onSubmit={handleSubmit}>
        <div className="">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="">
          <label>Description</label>
          <textarea
            name=""
            id=""
            className="form-control"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="">
          <label>Start Date</label>
          <input
            type="date"
            className="form-control"
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="">
          <label className="">End Date</label>
          <input
            type="date"
            className="form-control"
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <Button className="btn" type="submit">
          Add Event
        </Button>
      </form>
    </div>
  );
};

export default AddEvent;