import React from "react";
import "./AdminDashboard.css";
import LeftBar from "../../components/global/sidebar/LeftBar";
import Admin_home from "./Admin_home/Admin_home";
const AdminDashboard = () => {
  return (
    <div className="courses-page">
      <LeftBar />
      <Admin_home />
    </div>
  );
};

export default AdminDashboard;
