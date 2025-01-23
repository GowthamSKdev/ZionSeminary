import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";
import TopBar from "../TopBar/TopBar";
import Header from "../Header/Header.jsx";
import CustomCalendar from "../Calendar/Calendar.jsx";
import Statistics from "../Statistics/Statistics.jsx";
import LoadingPage from "../LoadingPage/LoadingPage";
import CourseRecommendation from "../CourseRecomend/CourseRecommendation";
import ErrorDataFetchOverlay from "../Error/ErrorDataFetchOverlay";
// import Table from "../Clienttable/Table.jsx";
import MainEvents from "../Statistics/MainEvents.jsx";
import BigCalendar from "../Calendar/BigCalendar/BigCalendar.jsx";
import { Col, Container, Row, Table, Toast } from "react-bootstrap";
import Calendar from "react-calendar/dist/cjs/Calendar.js";

import { format, formatDate } from "date-fns";
import { toast } from "react-toastify";
import ProgressBar from "../ProgressBar/ProgressBar.jsx";
function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [recommendedCourses, setRecommendedCourses] = useState([]);

  //  useEffect(() => {
  //    const gettingUserData = async () => {
  //      try {
  //        const res = await axios.get("/api/users");
  //        const { users } = res.data;
  //        const Loginres = JSON.parse(localStorage.getItem("loginUserData"));

  //        if (Loginres && Loginres.id) {
  //          // Find the user that matches the LoginUser id
  //          const matchedUser = users.find((user) => user.id === Loginres.id);

  //          if (matchedUser) {
  //            // Save the matched user data to localStorage
  //            localStorage.setItem("userdata", JSON.stringify(matchedUser));
  //            console.log("User data saved:", matchedUser);
  //          } else {
  //            console.log("No user found with the given id");
  //          }
  //        } else {
  //          console.log("No login data found in localStorage");
  //        }
  //      } catch (error) {
  //        console.error("Error fetching user data:", error);
  //      }
  //    };

  //    gettingUserData();
  //  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  //       const response = await axios.get(`${apiBaseUrl}/courseDetail`);
  //       const courses = response.data;

  //       //
  //       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  //       if (userInfo) {
  //         const { coursePurchased } = userInfo;

  //         // Checking course vangiyacha ?
  //         // if (coursePurchased.length === 0) {
  //         //   setHasPurchasedCourses(false);
  //         // }

  //         // Filtering
  //         // const filteredCourses = courses.filter((course) =>
  //         //   coursePurchased.includes(course._id)
  //         // );
  //         const filteredCourses = courses.filter(
  //           (course) => !coursePurchased.includes(course._id)
  //         );
  //         setRecommendedCourses(filteredCourses);
  //       } else {
  //         setFetchError(true);
  //         alert("User not logged in, Go to Profile page");
  //         console.log("No user info found in localStorage");
  //       }
  //       // setRecommendedCourses(courses);
  //       setIsLoading(false);
  //     } catch (err) {
  //       console.error("Error fetching course details:", err);
  //       setFetchError(true);
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // Shuffle recommended courses
  const shuffledCourses = [...recommendedCourses].sort(
    () => 0.5 - Math.random()
  );

  // if (isLoading) {
  //   return <LoadingPage />;
  // }

  if (fetchError) {
    return <ErrorDataFetchOverlay />;
  }

  const userInfo = JSON.parse(localStorage.getItem("userdata"));
  const [userDetails, setUserDetails] = useState({});
  const apiBaseUrl = process.env.REACT_APP_BASE_API;
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/api/users/${userInfo._id}`);
        const { user } = res.data;
        setUserDetails(user);
        console.log(userDetails);

        toast.success("User data fetched successfully");
      } catch (error) {
        toast.error("Error fetching user data");
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <div className="mainContent">
      <div className="rounded-3">
        <TopBar />
      </div>
      {/* <div className="headerPart">
        <div className="h">
          <Header />
        </div>
        <div className="m">
          <MainEvents />
        </div>
      </div>
      <div className="headerPart">
          <Statistics />
      </div> */}
      {/* <div className="mainContent"> */}
      {/* <TopBar /> */}
      {/* <div className="headerPart">
      <Header />
         
    </div>
    <Statistics />  */}
      {/* <div className="home-courseBox">
        <h3>Recommended Courses</h3>
         <div className="home-course">
           {shuffledCourses.slice(0, 7).map((course, index) => (
             <CourseRecommendation
               key={index}
               title={course.title}
               courseId={course._id}
               imgName={course.image}
             />
           ))}
         </div>
       </div> */}

      {/* <div className="main p-3 w-100">
        <div className="d-flex flex-column flex-lg-row gap-3">
          <div className="home-header border rounded-3">
            <Row>
              <Col>
                <div className="jumbotron">
                  <h1>Welcome to Your LMS Dashboard</h1>
                  <p>
                    This is your one-stop solution to manage your courses and
                    academic progress.
                  </p>
                </div>
              </Col>
            </Row>
          </div>

          <div className="w-lg-25 border p-3 rounded-3 lead text-body text-body-secondary">
            <h2>Course Completion and Marks</h2>{" "}
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th> <th>Course Name</th> <th>Completion</th>{" "}
                  <th>Marks</th>{" "}
                </tr>{" "}
              </thead>{" "}
              <tbody>
                <tr>
                  <td>1</td> <td>Mathematics</td> <td>80%</td> <td>85</td>{" "}
                </tr>{" "}
                <tr>
                  <td>2</td> <td>Science</td> <td>75%</td> <td>78</td>{" "}
                </tr>{" "}
              </tbody>{" "}
            </Table>{" "}
          </div>
        </div>

        <div className="">
          <h2>Reminder Calendar</h2> <Calendar />
        </div>
        <div className="">
          <Table striped bordered hover responsive>
            {" "}
            <thead>
              {" "}
              <tr>
                {" "}
                <th>#</th> <th>Payment Description</th> <th>Amount</th>{" "}
                <th>Status</th>{" "}
              </tr>{" "}
            </thead>{" "}
            <tbody>
              {" "}
              <tr>
                {" "}
                <td>1</td> <td>Tuition Fee</td> <td>$1000</td> <td>Paid</td>{" "}
              </tr>{" "}
              <tr>
                {" "}
                <td>2</td> <td>Library Fee</td> <td>$100</td> <td>Pending</td>{" "}
              </tr>{" "}
            </tbody>{" "}
          </Table>
        </div>
      </div> */}

      {/* <div className="w-100 mt-3 d-flex flex-column gap-3">
        <div className="w-100 border p-3 bg-info rounded-3">
          <div className="d-flex flex-column align-items-start justify-content-between flex-lg-row">
            <h3>Welcome Back, User 👋.</h3>
            <p className="p-2 bg-body  rounded-3">
              {format(Date(), "yyyy-MM-dd HH:mm:ss")}
            </p>
          </div>
          <p className="lead" style={{ fontSize: "16px" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quam
            dolorum at eius vero quisquam perferendis est blanditiis saepe!
            Quisquam, laborum recusandae voluptatum delectus error magni
            molestias quia. Quis, asperiores.
          </p>
        </div>

        <div className="d-flex flex-column flex-lg-row gap-3 w-100">
          <div className="w-100 rounded-3 border">
            <Table hover responsive>
              <thead>
                <tr>
                  <th>no</th>
                  <th>Name</th>
                  <th>Mark</th>
                  <th>progress</th>
                </tr>
              </thead>
              <tbody>
                {userDetails.degrees?.courses?.map(
                  (course, index) => (
                    <tr key={course._id}>
                      <td>{index + 1}</td>
                      <td>{course.title}</td>
                      <td>{course.progressPercentage}</td>
                      <td>
                        <div className="bg-info rounded-2 text-white py-1">
                          {course.progressPercentage === 100
                            ? "completed"
                            : "In Progress"}
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          </div>

          <div className="w-100 border rounded-3">
            <Table className="rounded-3" hover responsive>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Initial Payment</td>
                  <td>1200</td>
                  <td>
                    <div className="btn-sm bg-info py-1">Download</div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div> */}

      <div className="container mt-4">
        {/* Welcome Section */}
        <div className="card shadow-sm bg-primary text-white rounded-3">
          <div className="card-body d-flex flex-column flex-md-row align-items-md-center justify-content-between">
            <div>
              <h3 className="fw-bold">Welcome Back, User 👋</h3>
              <p className="mb-0">We're glad to have you here!</p>
            </div>
            <div className="bg-body text-dark rounded-3 px-3 py-2 mt-3 mt-md-0">
              <strong>{new Date().toLocaleString()}</strong>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="row mt-4 g-4">
          {/* Courses Table */}
          <div className="col-lg-6">
            <div className="card shadow-sm rounded-3 border">
              <div className="card-header fw-bold">
                
                <h5 className="mb-0">Your Courses</h5>
              </div>
              <div className="card-body p-0">
                <Table hover responsive className="mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th>No</th>
                      <th>Name</th>
                      <th>Mark</th>
                      <th>Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userDetails?.degrees?.[0]?.courses?.length > 0 ? (
                      userDetails.degrees[0].courses.map((course, index) => (
                        <tr key={course._id}>
                          <td>{index + 1}</td>
                          <td>{course.title}</td>
                          <td>{course.progressPercentage}%</td>
                          <td>
                          <ProgressBar
                      progress={
                        course.completionPercentage
                        ||
                        0
                      }
                    />
                            {/* <span
                              className={`badge ${
                                course.progressPercentage === 100
                                  ? "bg-success"
                                  : "bg-warning"
                              }`}
                            >
                              {course.progressPercentage === 100
                                ? "Completed"
                                : "In Progress"}
                            </span> */}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center text-muted">
                          No courses available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
              <div className="card-footer d-flex align-items-center g-4">
              <div className="w-100 mt-5">
                  <h5 className="d-flex justify-content-between">
                    Degree:
                    <span>{userDetails?.degrees?.[0]?.title || "N/A"}</span>
                  </h5>
                  <div className="w-100">
                    <ProgressBar
                      progress={
                        userDetails?.degreeProgress?.[0]?.progressPercentage ||
                        0
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payments Table */}
          <div className="col-lg-6">
            <div className="card shadow-sm rounded-3 border">
              <div className="card-header fw-bold">
                <h5 className="mb-0">Payment Details</h5>
              </div>
              <div className="card-body p-0">
                <Table hover responsive className="mb-0">
                  <thead className="table-bordered table-dark">
                    <tr>
                      <th>No</th>
                      <th>Name</th>
                      <th>Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Initial Payment</td>
                      <td>$1200</td>
                      <td>
                        <button className="btn btn-sm btn-primary">
                          Download
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* Courses Calender */}
          <div className="col-lg-6 rounded-3 p-3">
            <div className="card shadow-sm rounded-3 p-2">
              <BigCalendar />
            </div>
          </div>
          {/* Courses Events */}
          <div className="col-lg-6 rounded-3 p-3">
            <div className="card shadow-sm rounded-3 h-100 p-2">
              <MainEvents />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
