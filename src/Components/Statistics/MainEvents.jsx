import { useEffect, useState } from "react";
import "./Events.css";
import { Calendar } from "lucide-react";
import axios from "axios";
// const apiBaeApi = process.env.REACT_APP_API_BASE_URL;
const apiBaseUrl = process.env.BASE_API;
const MainEvents = () => {
      const [events, setEvents] = useState([]);
    useEffect(() => {
      const getEvent = async () => {
        const resEvents = await axios.get(`${apiBaseUrl}/api/admin-event`);
        console.log(resEvents);
        const { events } = resEvents.data;
        
        setEvents(events);
      };
      getEvent();
    }, []);
  return (
    <>
      <div className="Events">
        <h3>Events</h3>
        <div className="event-container">
          <ul>
            {events.map((event) => {
              const formattedStartDate = new Date(event.startDate)
                .toISOString()
                .split("T")[0];
              const formattedEndedDate = new Date(event.endDate)
                .toISOString()
                .split("T")[0];
              return (
                <li className="event-card" key={event._id}>
                  <Calendar />
                  <div className="event-content">
                    <h6 className="event-title">{event.title} </h6>
                    <p className="event-description">{event.description}</p>
                    <div className="event-dates">
                    <p className="event-date">{formattedStartDate}</p>
                    <p className="event-date">{formattedEndedDate}</p>
                    </ div>
                  </div>
                </li>
              );
            })}
          </ul>
          {/* <ul>
            <li className="event-card">
              <div className="event-content">
                <h6 className="event-title">Event 1 </h6>
                <p className="event-description">New Course Launch on 17-12-2024</p>
                <div className="event-dates">
                  <p className="event-date">17-12-2024</p>
                  <p className="event-date">24-12-2024</p>
                </div>
              </div>
            </li>
          </ul> */}
        </div>
      </div>
    </>
  );
};

export default MainEvents;
