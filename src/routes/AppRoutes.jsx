import { Route, Routes } from "react-router-dom";
import Profile from "../Components/Profile/Profile";
import Dashboard from "../Components/Dashboard";
import Marks from "../Components/Marks/Marks";
// import Courses from "../Components/courses/Courses";
import Enrolled from "../Components/Enrolled/Enrolled";
import Home from "../Components/Home/Home";
import AddnewDegree from "../Admin/pages/degrees/new-degree/AddnewDegree";
import AllDegrees from "../Admin/pages/degrees/AllDegrees";
import UserMarks from "../Admin/pages/UserMarks/UserMarks";

// import AddnewChapter from "../Admin/pages/degrees/new-degree/AddnewChapter";
import AddnewChapter from "../Admin/pages/chapter/AddNewChapter";
import Register from "../Authentication/Register1";
import Allusers from "../Admin/pages/userManagement/Allusers";

import EditDegree from "../Admin/pages/degrees/edit-degree/EditDegree";
import Login from "../Authentication/Login1";
import CourseDetails from "../Components/CourseDetails/CourseDetails";
import AllTests from "../Admin/pages/tests/AllTests";
import TestDetails from "../Admin/pages/tests/TestDetails";
import Degrees from "../Components/Degrees/Degrees";
import CoursePage from "../Components/Courses/CoursePage";
import CourseContent from "../Components/CourseContent/CourseContent";
import EntryLevelFrom from "../Authentication/EntryLevelFrom";
import Rough from "../Components/test";
import EventPage from "../Admin/pages/Events/EventPage";
import AdminDashboard from "../Admin/pages/Dashboard/AdminDashboard";
import WaitingAuth from "../Authentication/WaitingAuth";
import UserDetails from "../Admin/pages/Dashboard/Admin_table/UserDetails/UserDetails";
import AssessmentTest from "../Components/CourseContent/AssessmentTest/AssessmentTest";
import ForgotPassword from "../Authentication/ForgotPassword";
import ResetPassword from "../Authentication/ResetPassword";
import WrittenTest from "../Components/CourseContent/WritteOrFileUpload.jsx/WrittenTest";

const AppRoutes = () => {
  return (
    <main>
      <Routes>
        {/* <Route path="/" index element={<Dashboard />} /> */}
        <Route index element={<Register />}></Route>
        <Route path="rough" element={<Rough />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="forgotPassword" element={<ForgotPassword />}></Route>
        <Route path="reset-password/:token" element={<ResetPassword />}></Route>
        <Route path="elf" element={<EntryLevelFrom />}></Route>
        <Route path="waitAuth" element={<WaitingAuth />} />
        <Route path="home" element={<Dashboard />}>
          <Route index element={<Home />}></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="marks" element={<Marks />}></Route>
          {/* <Route path="courses" element={<Courses />} ></Route> */}
          <Route path="degrees" element={<Degrees />} />
          <Route path="degrees/:degreeid" element={<CoursePage />} />
          <Route
            path="degrees/courseDetails/:courseId"
            element={<CourseDetails />}
          />
          <Route path="enrolled" element={<Enrolled />}></Route>
          <Route
            path="courseContent/:courseId"
            element={<CourseContent />}
          ></Route>
          <Route
            path="courseContent/:courseId/assessmentTest"
            element={<AssessmentTest />}
          />
          <Route
            path="courseContent/:courseId/writtenTest"
            element={<WrittenTest />}
          />
        </Route>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/userDetails" element={<UserDetails />} />
        <Route path="/admin/degrees" element={<AllDegrees />} />
        <Route path="/admin/degrees/new" element={<AddnewDegree />} />
        <Route path="/admin/degrees/edit" element={<EditDegree />} />
        <Route path="/admin/chapter" element={<AddnewChapter />} />
        <Route path="/admin/events" element={<EventPage />} />
        <Route path="/admin/users" element={<Allusers />} />
        <Route path="/admin/tests" element={<AllTests />} />
        <Route path="/admin/usermarks" element={<UserMarks />} />

        <Route path="/admin/tests/details" element={<TestDetails />} />
      </Routes>
    </main>
  );
};

export default AppRoutes;

// protect after add

// const PrivateRoute = ({ element, allowedRoles }) => {
//   const userdata = JSON.parse(localStorage.getItem("userdata"));
//   const userRole = userdata?.role;

//   return allowedRoles.includes(userRole) ? (
//     element
//   ) : (
//     <Navigate to="/unauthorized" />
//   );
// };

{
  /* <Route
  path="/admin-dashboard"
  element={
    <PrivateRoute element={<AdminDashboard />} allowedRoles={["admin"]} />
  }
/>; */
}