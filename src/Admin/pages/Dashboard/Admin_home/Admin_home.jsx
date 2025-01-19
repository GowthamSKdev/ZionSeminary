import React, { useEffect, useState } from "react";
import "./Admin_home.css";
import Admin_table from "../Admin_table/Admin_table";
import Header from "../../../../Components/Header/Header";
import Admin_counter from "../Admin_counter/Admin_counter";
import axios from "axios";
const apiBaseUrl = process.env.REACT_APP_BASE_API;
const Admin_home = () => {
  const [users, setUsers] = useState([]);
  const [degrees, setDegrees] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`${apiBaseUrl}/api/users`);
      const { users } = res.data;
      setUsers(users);
    };
    const fetchDegrees = async () => {
      const res = await axios.get(`${apiBaseUrl}/api/degrees`);
      const { degrees } = res.data
      setDegrees(degrees)
    }

    fetchUsers();
    fetchDegrees()
  }, []);

  return (
    <div className="d-flex flex-column gap-2 w-100">
      <div className="admin-header">
        <Header />
      </div>
      <Admin_counter users={users} degrees={degrees} />
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
