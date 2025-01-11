import React from "react";
import "./Admin_home.css";
import Admin_table from "../Admin_table/Admin_table";
import Header from "../../../../Components/Header/Header";
import Admin_counter from "../Admin_counter/Admin_counter";

const Admin_home = () => {
  return (
    <div className="admin-home">
      <div className="box box1">
        <Header />
      </div>
      {/* <div className="box box2">
        <Admin_counter />
      </div> */}
      <div className="box box3">
        <Admin_table />
      </div>
    </div>
  );
};

export default Admin_home;
