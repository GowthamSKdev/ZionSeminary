// src/components/Statistics.js
import BigCalendar from "../Calendar/BigCalendar/BigCalendar";
import Chart from "./Chart";
import CourseProgress from "./courseProgress";
import MainEvents from "./MainEvents";
import "./Statistics.css";

const Statistics = () => {
  
  // const timeSpentData = {
  //   Sunday: 5,
  //   Monday: 10,
  //   Tuesday: 7,
  //   Wednesday: 12,
  //   Thursday: 6,
  //   Friday: 8,
  //   Saturday: 14,
  // };

  return (
    <div className="statistics">
      <div className="time-spent">
        {/* <h3>Time Spent</h3> */}
        {/* <div className="chart-container">
          <div className="chart-title">Weekly Time Distribution</div>
          <Chart data={timeSpentData} />
          <br />
          <div className="chart-legend">
            <div>
              <span className="legend-sunday"></span>Sunday
            </div>
            <div>
              <span className="legend-monday"></span>Monday
            </div>
            <div>
              <span className="legend-tuesday"></span>Tuesday
            </div>
            <div>
              <span className="legend-wednesday"></span>Wednesday
            </div>
            <div>
              <span className="legend-thursday"></span>Thursday
            </div>
            <div>
              <span className="legend-friday"></span>Friday
            </div>
            <div>
              <span className="legend-saturday"></span>Saturday
            </div>
          </div>
        </div> */}
        <MainEvents />
      </div>
      <div className="completion">
        <h3>Completion</h3>
        {/* <Chart data={{ completed: 25, inProgress: 12, notStarted: 17 }} /> */}
        <CourseProgress/>
      </div>
      <div className="completion">
        <BigCalendar/>
      </div>
    </div>
  );
};

export default Statistics;
