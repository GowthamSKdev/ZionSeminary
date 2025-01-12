import React, { useEffect, useState } from "react";
import EventList from "./EventList";
import AddEvent from "./AddEvent";
import "./Event.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const apiBaeApi = process.env.REACT_APP_BASE_API;

const MainEvent = () => {
  const navigate = useNavigate();
  const [ eventlist, setEventlist ] = useState([]);
const [degreeId, setDegreeId] = useState("");
  const [DegreeList, setDegreeList] = useState([]);

  const fetchDegree = async () => {
    const response = await axios.get(`${apiBaeApi}/api/degrees`);
    const { degrees } = await response.data;
    setDegreeList(degrees);
  };
  
  useEffect(() => {
    const getEvent = async () => {
      const resEvents = await axios.get(`${apiBaeApi}/api/admin-event/${degreeId}`);
      const { events } = resEvents.data;
      //   console.log(events);
      setEventlist(events);
    };
    getEvent();
    fetchDegree();
  }, [degreeId]);

  return (
    <div className="user-page ">
      <Button className="btn-danger" onClick={() => navigate(-1)}>
        back
      </Button>
      <div className="main-event-section">
        <AddEvent />
        <EventList events={eventlist} degreeId={degreeId} setDegreeId={setDegreeId} DegreeList={DegreeList} />
      </div>
    </div>
  );
};

export default MainEvent;
