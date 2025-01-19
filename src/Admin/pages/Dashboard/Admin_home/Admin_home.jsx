import React from "react";
import "./Admin_home.css";
import Admin_table from "../Admin_table/Admin_table";
import Header from "../../../../Components/Header/Header";
import Admin_counter from "../Admin_counter/Admin_counter";

const Admin_home = () => {
  return (
    <div className="d-flex flex-column gap-2 w-100">
      <div className="h-[150px] padding-2">
        <Header />
      </div>
        <Admin_counter />
        <Admin_table />
      {/* <div className="box box1">
      </div>
      <div className="box box2">
      </div>
      <div className="box box3">
      </div> */}
    </div>
  );
};

export default Admin_home;
