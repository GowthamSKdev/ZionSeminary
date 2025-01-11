import axios from "axios";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const apiBaseUrl = process.env.REACT_APP_BASE_API;
const WaitingAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = location.state;
  const userInfo = JSON.parse(localStorage.getItem('userdata'))

  console.log(userId);

  useEffect(() => {
    const permissonAuth = async () => {
      const res = await axios.get(`${apiBaseUrl}/api/users/${userId || userInfo._id}`);
      const { user } = res.data;
      console.log(user);
      if (user.adminAuth || userInfo.adminAuth === true) {
        navigate(`/home`);
      }
    };
    permissonAuth();
  }, [userId]);

  return (
    <div className="bg-black">
      <div className="loading-spinner-overlay d-flex flex-column gap-5 p-5">
        <div className="spinner"></div>
        <p className="text-center text-white">
          Please wait... <br /> தயவுசெய்து காத்திருங்கள்... <br /> Your Account
          has been Activating... <br /> உங்கள் கணக்கில் உள்ளது செயல்படுத்தி
          வருகிறது...
        </p>
      </div>
    </div>
  );
};

export default WaitingAuth;
