import React, { useEffect, useState } from "react";
import "./Admin_table.css";
import axios from "axios";
import defaultUserImg from "../../../assets/Images/defaultPorfileSVG.svg";
import { Edit, EyeIcon, Trash } from "lucide-react";
import UserDetails from "./UserDetails/UserDetails";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const apiBaseUrl = process.env.REACT_APP_BASE_API;

const AdminTable = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewDetails, setViewDetails] = useState(false);
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${apiBaseUrl}/api/users`);
      const { users } = res.data;

      // Fetch degrees for all users
      const usersWithDegrees = await Promise.all(
        users.map(async (user) => {
          if (user.applyingFor) {
            try {
              const degreeRes = await axios.get(
                `${apiBaseUrl}/api/degrees/${user.applyingFor}`
              );
              console.log(degreeRes);
              return { ...user, degreeName: degreeRes.data.degree.title };
            } catch {
              return { ...user, degreeName: "Unknown Degree" };
            }
          }
          return { ...user, degreeName: "N/A" };
        })
      );

      setUserList(usersWithDegrees);
    } catch (err) {
      setError("Failed to fetch users.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuth = async (userId) => {
    try {
      const res = await axios.put(
        `${apiBaseUrl}/api/users/adminAuth/${userId}`
      );
      setUserList((prev) =>
        prev.map((user) =>
          user._id === userId
            ? { ...user, adminAuth: res.data.adminAuth }
            : user
        )
      );
      fetchUsers();
    } catch (err) {
      console.error("Failed to update admin authentication:", err);
    }
  };

  const deleteAction = async (userId) => {
    const res = await axios.delete(`${apiBaseUrl}/api/users/${userId}`);
    toast.success("User Deleted successfully");
    fetchUsers();
    console.log(res);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container-fluid mt-10 position-relative admin-table">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">No</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Phone No</th>
              <th scope="col">Access</th>
              <th scope="col">Degree</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody className="Admin-table-body">
            {userList.length > 0 ? (
              userList.map((user, index) => {
                return (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={user.passportPhotoFile || defaultUserImg}
                        alt={user.username}
                        height={30}
                        width={30}
                      />
                    </td>
                    <td>{user.username}</td>
                    <td>{user.mobileNo}</td>
                    <td className="">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={user.adminAuth}
                          onChange={() => handleAuth(user._id)}
                        />
                      </div>
                    </td>
                    <td>{user.degreeName || "No degree Assigned"}</td>
                    <td className="d-flex">
                      <button
                        className="btn btn-light btn-sm me-2"
                        onClick={() =>
                          navigate("/admin/userDetails", { state: { user } })
                        }>
                        <Edit />
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteAction(user._id)}>
                        <Trash />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No users available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      {error && <div className="alert alert-danger">{error}</div>}
      {viewDetails && <UserDetails />}
    </div>
  );
};

export default AdminTable;
