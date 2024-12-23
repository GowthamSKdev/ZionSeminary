import React, { useEffect, useState } from "react";
import searchIcon from "../../assets/Images/search.png";
import addIcon from "../../assets/Images/plus.png";
import UsersList from "./UsersList";
import axios from "axios";
  const apiBaseUrl = process.env.REACT_APP_BASE_API;
const Users = ({ openNewUser, openEditUser }) => {
   const [userList, setUserList] = useState(null);
  useEffect(() => {

    const getUsers = async () => {
      console.log("strict");
      try {
        // const usersSnapshot = await getAllUsers();
        // setUserList(usersSnapshot);
        const responseUsers = await axios.get(`${apiBaseUrl}/api/users`);
        const { users } = responseUsers.data;
        setUserList(users);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [])
  
  return (
    <div className="user-page">
      <>
        {/* <h2 className="users-page-title">User Management</h2> */}
      </>
      <div className="users-list-header">
        <h2 className="h2-user-title">
          All users
          <span> {userList?.length}</span>
        </h2>
        <div className="users-header-actions-cnt">
          <div className="search-user-cnt">
            <img src={searchIcon} alt="search-icon" className="search-icon" />
            <input type="text" className="search-input" placeholder="Search" />
          </div>
          <div className="add-new-btn" onClick={() => openNewUser()}>
            <img
              src={addIcon}
              alt="add-icon"
              className="search-icon add-icon"
            />
            <p> Add user</p>
          </div>
        </div>
      </div>
      <UsersList editAction={openEditUser} />
    </div>
  );
};

export default Users;
