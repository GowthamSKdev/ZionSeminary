import React from "react";
import LeftBar from "../../components/global/sidebar/LeftBar";
import MainEvent from "./MainEvent";

const EventPage = () => {
  return (
    <div className="users-page-dashboard">
      <LeftBar />
      <MainEvent />
    </div>
  );
};

export default EventPage;
