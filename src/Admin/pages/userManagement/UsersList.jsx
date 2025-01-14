import React, { useEffect, useRef, useState } from "react";
import moreIcon from "../../assets/Images/more.png";
import EditUser from "./EditUser";
import { getAllUsers } from "../../firebase/userApi";
import defaultUserImg from "../../assets/Images/defaultPorfileSVG.svg";
import axios from "axios";
// import { allUsers } from "../../api/baseApi";
  const apiBaseUrl = process.env.REACT_APP_BASE_API;
const UsersList = ({ editAction }) => {
  const [editUser, setEditUser] = useState({ open: false, data: null });
  const [userList, setUserList] = useState(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setEditUser(false);
      }
    }

    if (editUser) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editUser]);

  useEffect(() => {
    const getUsers = async () => {
      console.log("strict");
      try {
        // const usersSnapshot = await getAllUsers();
        // setUserList(usersSnapshot);
        const responseUsers = await axios.get(`${apiBaseUrl}/api/users`);
        const { users } = responseUsers.data
        setUserList(users);
        
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [editAction]);

  return (
    <div className="users-list-cnt">
      <div className="users-details-header">
        <p className="user-name-cnt ">username</p>
        <p className="user-name-cnt">Mobile</p>
        <p className="user-name-cnt">Date of birth</p>
        <p className="user-date-cnt">Joined date</p>
        <p style={{ width: ".5rem" }}></p>
      </div>

      {userList &&
        userList?.map((user, index) => (
          <div className="user-details-cnt" key={user._id}>
            <div className="user-name-cnt">
              <img
                src={user.passportPhotoFile?user.passportPhotoFile:defaultUserImg}
                alt="profile-icon"
                className="profile-img"
              />
              <div className="name-cnt">
                <h3>
                  {user?.firstName} {user.lastName}
                </h3>
                <p>{user?.email}</p>
              </div>
            </div>
            <p className="user-name-cnt details-text">{user?.mobileNo}</p>
            <p className="details-text user-name-cnt">{user?.dob}</p>
            <p className="details-text user-date-cnt">{user?.joinedDate}</p>
            <img
              src={moreIcon}
              alt="more"
              className="more-icon"
              onClick={() => setEditUser({ open: true, data: user })}
            />
          </div>
        ))}
      <div ref={wrapperRef}>
        <EditUser open={editUser} openEdit={editAction} data={editUser.data} />
      </div>
    </div>
  );
};

export default UsersList;
