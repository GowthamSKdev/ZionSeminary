// import React, { useContext, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { Link, useNavigate } from 'react-router-dom';
// import './Register.css'; // Reuse the same CSS file
// // import { getAllUsers } from '../Admin/firebase/userApi';
// // import bcrypt from 'bcryptjs';
// import logo from "./assets/logo.png";
// import google from "./assets/google.png"; 
// import { toast } from 'react-toastify';
// import axios from 'axios';
// // import UserContext from '../context/UserContext';
//  const apiBaseUrl = process.env.REACT_APP_BASE_API;
// function Login() {

//   // const { setUserInfo } = useContext(UserContext);
//   // const { register, handleSubmit } = useForm();
//   // const navigate = useNavigate();
//   // const [userdata, setUserdata] = useState(null);

//   // const onSubmit = async (data) => {
//   //   try {
//   //     const res = await getAllUsers();
//   //     console.log(res); // Log to ensure you're getting the user data

//   //     let foundUser = null;
//   //     res.forEach(user => {
//   //       if (user.username === data.username) {
//   //         const isPasswordValid = bcrypt.compareSync(data.password, user.password);
//   //         if (isPasswordValid) {
//   //           foundUser = user;
//   //         }
//   //       }
//   //     });

//   //     // If user is found, log them in
//   //     if (foundUser) {
//   //       setUserdata(foundUser);
//   //       localStorage.setItem("userdata", JSON.stringify(foundUser));
//   //       toast.success("Login Successful");
//   //       localStorage.setItem("isloggedin",true);
//   //       navigate("/home");
//   //     } else {
//   //       alert('Invalid username or password');
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching users: ", error);
//   //     alert('An error occurred while logging in. Please try again.');
//   //   }
//   // };
  

//    const { register, handleSubmit } = useForm();
//    const navigate = useNavigate();
//   const [userdata, setUserdata] = useState(null);
  
//   // const onSubmit = async (data) => {
//   //   try {
//   //     // Fetch all users from the backend
//   //     const res = await axios.post('/api/users/login', data)
//   //     console.log(res);
      

//   //     // let foundUser = null;

//   //     // // Validate username and password
//   //     // res.forEach((user) => {
//   //     //   if (user.username === data.username) {
//   //     //     const isPasswordValid = bcrypt.compareSync(
//   //     //       data.password,
//   //     //       user.password
//   //     //     );
//   //     //     if (isPasswordValid) {
//   //     //       foundUser = user;
//   //     //     }
//   //     //   }
//   //     // });

//   //     if (res.data) {
//   //       setUserdata(res.data);
//   //       localStorage.setItem("userdata", JSON.stringify(userdata));
//   //       localStorage.setItem("isloggedin", true);
//   //       toast.success("Login Successful");

//   //       // Redirect based on user role
//   //       if (res.data.role === "admin") {
//   //         navigate("/admin");
//   //       } else if (res.data.role === "client") {
//   //         navigate("/home");
//   //       } else {
//   //         toast.error("Role not recognized");
//   //       }
//   //     } else {
//   //       toast.error("Invalid username or password");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching users: ", error);
//   //     toast.error("An error occurred while logging in. Please try again.");
//   //   }
//   // };

//   // const onSubmit = async (data) => {
//   //   try {
//   //     const res = await axios.post("/api/users/login", data);
//   //     const {user} = res.data
//   //     console.log(user);

//   //     if (user) {

//   //       setUserdata(user);
//   //       setUserInfo(user);
//   //       localStorage.setItem("userdata", JSON.stringify(user));
//   //       localStorage.setItem("isloggedin", true);
//   //       toast.success("Login Successful");

//   //       // Check if role exists and is valid
//   //       const userRole = user.role ? user.role.toLowerCase() : null; // Normalize the role (e.g., lowercase)

//   //       if (userRole === "admin") {
//   //         navigate("/admin");
//   //       } else if (userRole === "client") {
//   //         navigate("/elf");
//   //       } else {
//   //         toast.error("Role not recognized");
//   //       }
//   //     } else {
//   //       toast.error("Invalid username or password");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching users: ", error);
//   //     toast.error("An error occurred while logging in. Please try again.");
//   //   }
//   // };

//   const onSubmit = async (data) => {
//     try {
//       const res = await axios.post(`${apiBaseUrl}/api/users/login`, data);
//       const { user } = res.data;
//       const findUser = await axios.get(`${apiBaseUrl}/api/users/${user.id}`)
//       const findUserData = findUser.data
//       const CurrentUser = findUserData.user
//       console.log(CurrentUser);
      

//       console.log(user);

//       // if (CurrentUser) {
//       //   setUserdata(CurrentUser);
//       //   // setUserInfo(user);
//       //   localStorage.setItem("userdata", JSON.stringify(CurrentUser));
//       //   localStorage.setItem("isloggedin", true);
//       //   toast.success("Login Successful");

//       //   // Check if the user has the 'details' field and navigate accordingly
        
//       //   if (CurrentUser.details===true) {
//       //     // Navigate to '/home' or '/admin' based on the role
//       //     const userRole = CurrentUser.role ? CurrentUser.role.toLowerCase() : null;
//       //     if (userRole === "admin") {
//       //       navigate("/admin");
//       //     } else if (userRole === "client") {
//       //       navigate("/home");
//       //     } else {
//       //       toast.error("Role not recognized");
//       //     }
//       //   } else {
//       //     // Navigate to '/elf' if 'details' is false
//       //     navigate("/elf");
//       //   }
//       // } else {
//       //   toast.error("Invalid username or password");
//       // }

//       if (CurrentUser) {
//         setUserdata(CurrentUser);
//         localStorage.setItem("userdata", JSON.stringify(CurrentUser));
//         localStorage.setItem("isloggedin", true);
//         toast.success("Login Successful");

//         const userRole = CurrentUser.role
//           ? CurrentUser.role.toLowerCase()
//           : null;
//         const hasDetails = CurrentUser.details === true;

//         if (userRole === "admin") {
//           navigate("/admin");
//         } else if (userRole === "client") {
//           navigate(hasDetails ? "/home" : "/elf");
//         } else {
//           toast.error("Role not recognized");
//         }
//       } else {
//         toast.error("Invalid username or password");
//       }

//     } catch (error) {
//       console.error("Error fetching users: ", error);
//       toast.error("An error occurred while logging in. Please try again.");
//     }
//   };

// const handleGoogleLogin = async () => {
//   try {
//     // Call the Google login endpoint
//     const res = await axios.post("/api/google-login");

//     // Process the response
//     if (res.status === 200) {
//       const { user } = res.data;

//       if (user) {
//         // Save user data in local storage or context
//         localStorage.setItem("userdata", JSON.stringify(user));
//         localStorage.setItem("isloggedin", true);
//         toast.success("Google Login Successful");

//         // Redirect user based on their role
//         const userRole = user.role ? user.role.toLowerCase() : null;
//         if (userRole === "admin") {
//           navigate("/admin");
//         } else if (userRole === "client") {
//           navigate("/home");
//         } else {
//           toast.error("Role not recognized");
//         }
//       } else {
//         toast.error("Failed to retrieve user details.");
//       }
//     } else {
//       toast.error("Google Login Failed. Please try again.");
//     }
//   } catch (error) {
//     console.error("Error during Google login:", error);
//     toast.error("An error occurred during Google Login.");
//   }
// };


//   return (
//     <div
//       style={{ height: "100%", minHeight: "100dvh" }}
//       className="register"
//     >
//       {/* <form className="my-form" onSubmit={handleSubmit(onSubmit)}>
//         <h2 style={{ textAlign: 'center', marginBottom: "40px" }}>Login</h2>
//         <div className="form-group">
//           <label>Username</label>
//           <input
//             type="text"
//             placeholder="Enter Username"
//             {...register('username', { required: true })}
//           />
//         </div>
//         <div className="form-group">
//           <label>Password</label>
//           <input
//             type="password"
//             placeholder="Enter Password"
//             {...register('password', { required: true })}
//           />
//         </div>
//         <div className="form-group">
//           <input type="submit" className='submit-btn' value="Login" />
//         </div>
//       </form> */}
//       <div className="register-container d-flex justify-content-center align-items-center">
//         <div className="register-card d-flex flex-column flex-md-row shadow-lg rounded">
//           {/* Left Column (Form) */}
//           <div className="form-container d-flex flex-column w-100 w-md-50 px-5 py-4 bg-light">
//             <img
//               src={logo}
//               alt="Zion Seminary Portal"
//               style={{ width: "80px" }}
//               className="rounded mb-2"
//             />
//             <h4 className="text-left text-dark fw-bold mb-3">Sign In</h4>
//             <p className="text-muted">
//               Don't have an account?{" "}
//               {/* <a
//                 href="/"
//                 className="text-decoration-underline fw-semibold text-primary"
//               >
//                 Create now
//               </a> */}
//               <Link to={"/"}>
//                 <p className="text-decoration-underline fw-semibold text-primary"> Create Now</p>
//               </Link>
//             </p>

//             <form onSubmit={handleSubmit(onSubmit)}>
//               <div className="form-group mb-3">
//                 <label className="form-label fw-semibold">E-mail</label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   placeholder="Enter email Id"
//                   {...register("email", { required: true })}
//                 />
//               </div>

//               <div className="form-group mb-3">
//                 <label className="form-label fw-semibold">Password</label>
//                 <input
//                   type="password"
//                   className="form-control"
//                   placeholder="Enter Password"
//                   {...register("password", { required: true })}
//                 />
//               </div>

//               <div className="form-check d-flex justify-content-between mb-3">
//                 <div>
//                   <input
//                     type="checkbox"
//                     className="form-check-input"
//                     id="rememberMe"
//                   />
//                   <label className="form-check-label" htmlFor="rememberMe">
//                     Remember me
//                   </label>
//                 </div>
//                 <a className="text-decoration-underline" href="">
//                   Forgot Password?
//                 </a>
//               </div>

//               <button
//                 type="submit"
//                 className="btn btn-primary w-100 mb-3 rounded-pill"
//               >
//                 Sign In
//               </button>

//               {/* <div className="text-center mb-3">
//                 <div className="d-flex align-items-center mb-3">
//                   <hr className="flex-grow-1" />
//                   <span className="mx-2 fw-semibold">Or</span>
//                   <hr className="flex-grow-1" />
//                 </div>

//                 <button
//                   type="button"
//                   className="btn btn-white w-100 mb-3 rounded-pill border d-flex align-items-center"
//                   onClick={handleGoogleLogin}
//                 >
//                   <img
//                     src={google}
//                     alt="Google"
//                     style={{ width: "30px" }}
//                     className="rounded mb-0"
//                   />
//                   <span className="flex-grow-1 text-center">
//                     Sign in with Google
//                   </span>
//                 </button>
//               </div> */}
//             </form>
//           </div>

//           {/* Right Column (Content) */}
//           <div className="content-container w-100 w-md-50 p-4 bg-primary text-white d-flex flex-column justify-content-center">
//             <h2 className="fw-bold mb-4 text-center">
//               Welcome to Zion Seminary
//             </h2>
//             <p className="mb-4 text-center">
//               Zion Seminary's <strong>Education Management System (EMS)</strong>{" "}
//               offers:
//             </p>

//             <ul className="list-unstyled">
//               <li className="d-flex mb-1">
//                 <i
//                   className="bi bi-check-circle-fill me-3"
//                   style={{ fontSize: "1.5rem", color: "#ffd800" }}
//                 ></i>
//                 <span>
//                   Comprehensive tools for administrators to manage data
//                   efficiently.
//                 </span>
//               </li>
//               <li className="d-flex mb-1">
//                 <i
//                   className="bi bi-check-circle-fill me-3"
//                   style={{ fontSize: "1.5rem", color: "#ffd800" }}
//                 ></i>
//                 <span>
//                   Enhanced teaching tools for educators to simplify course
//                   management.
//                 </span>
//               </li>
//               <li className="d-flex mb-1">
//                 <i
//                   className="bi bi-check-circle-fill me-3"
//                   style={{ fontSize: "1.5rem", color: "#ffd800" }}
//                 ></i>
//                 <span>
//                   User-friendly interface for students to track their progress.
//                 </span>
//               </li>
//               <li className="d-flex mb-1">
//                 <i
//                   className="bi bi-check-circle-fill me-3"
//                   style={{ fontSize: "1.5rem", color: "#ffd800" }}
//                 ></i>
//                 <span>
//                   Seamless integration of academic and administrative workflows.
//                 </span>
//               </li>
//             </ul>

//             <p className="mt-4 text-center">
//               Join us today and transform your educational experience with Zion
//               Seminary!
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css"; // Reuse the same CSS file
// import { getAllUsers } from '../Admin/firebase/userApi';
// import bcrypt from 'bcryptjs';
import logo from "./assets/logo.png";
import google from "./assets/google.png";
import { toast } from "react-toastify";
import axios from "axios";
// import UserContext from '../context/UserContext';
const apiBaseUrl = process.env.REACT_APP_BASE_API;
function Login() {
  // const { setUserInfo } = useContext(UserContext);
  // const { register, handleSubmit } = useForm();
  // const navigate = useNavigate();
  // const [userdata, setUserdata] = useState(null);

  // const onSubmit = async (data) => {
  //   try {
  //     const res = await getAllUsers();
  //     console.log(res); // Log to ensure you're getting the user data

  //     let foundUser = null;
  //     res.forEach(user => {
  //       if (user.username === data.username) {
  //         const isPasswordValid = bcrypt.compareSync(data.password, user.password);
  //         if (isPasswordValid) {
  //           foundUser = user;
  //         }
  //       }
  //     });

  //     // If user is found, log them in
  //     if (foundUser) {
  //       setUserdata(foundUser);
  //       localStorage.setItem("userdata", JSON.stringify(foundUser));
  //       toast.success("Login Successful");
  //       localStorage.setItem("isloggedin",true);
  //       navigate("/home");
  //     } else {
  //       alert('Invalid username or password');
  //     }
  //   } catch (error) {
  //     console.error("Error fetching users: ", error);
  //     alert('An error occurred while logging in. Please try again.');
  //   }
  // };

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState(null);

  // const onSubmit = async (data) => {
  //   try {
  //     // Fetch all users from the backend
  //     const res = await axios.post('/api/users/login', data)
  //     console.log(res);

  //     // let foundUser = null;

  //     // // Validate username and password
  //     // res.forEach((user) => {
  //     //   if (user.username === data.username) {
  //     //     const isPasswordValid = bcrypt.compareSync(
  //     //       data.password,
  //     //       user.password
  //     //     );
  //     //     if (isPasswordValid) {
  //     //       foundUser = user;
  //     //     }
  //     //   }
  //     // });

  //     if (res.data) {
  //       setUserdata(res.data);
  //       localStorage.setItem("userdata", JSON.stringify(userdata));
  //       localStorage.setItem("isloggedin", true);
  //       toast.success("Login Successful");

  //       // Redirect based on user role
  //       if (res.data.role === "admin") {
  //         navigate("/admin");
  //       } else if (res.data.role === "client") {
  //         navigate("/home");
  //       } else {
  //         toast.error("Role not recognized");
  //       }
  //     } else {
  //       toast.error("Invalid username or password");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching users: ", error);
  //     toast.error("An error occurred while logging in. Please try again.");
  //   }
  // };

  // const onSubmit = async (data) => {
  //   try {
  //     const res = await axios.post("/api/users/login", data);
  //     const {user} = res.data
  //     console.log(user);

  //     if (user) {

  //       setUserdata(user);
  //       setUserInfo(user);
  //       localStorage.setItem("userdata", JSON.stringify(user));
  //       localStorage.setItem("isloggedin", true);
  //       toast.success("Login Successful");

  //       // Check if role exists and is valid
  //       const userRole = user.role ? user.role.toLowerCase() : null; // Normalize the role (e.g., lowercase)

  //       if (userRole === "admin") {
  //         navigate("/admin");
  //       } else if (userRole === "client") {
  //         navigate("/elf");
  //       } else {
  //         toast.error("Role not recognized");
  //       }
  //     } else {
  //       toast.error("Invalid username or password");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching users: ", error);
  //     toast.error("An error occurred while logging in. Please try again.");
  //   }
  // };

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${apiBaseUrl}/api/users/login`, data);
      const { user } = res.data;
      const findUser = await axios.get(`${apiBaseUrl}/api/users/${user.id}`);
      const findUserData = findUser.data;
      const CurrentUser = findUserData.user;
      console.log(CurrentUser);

      console.log(user);

      // if (CurrentUser) {
      //   setUserdata(CurrentUser);
      //   // setUserInfo(user);
      //   localStorage.setItem("userdata", JSON.stringify(CurrentUser));
      //   localStorage.setItem("isloggedin", true);
      //   toast.success("Login Successful");

      //   // Check if the user has the 'details' field and navigate accordingly

      //   if (CurrentUser.details===true) {
      //     // Navigate to '/home' or '/admin' based on the role
      //     const userRole = CurrentUser.role ? CurrentUser.role.toLowerCase() : null;
      //     if (userRole === "admin") {
      //       navigate("/admin");
      //     } else if (userRole === "client") {
      //       navigate("/home");
      //     } else {
      //       toast.error("Role not recognized");
      //     }
      //   } else {
      //     // Navigate to '/elf' if 'details' is false
      //     navigate("/elf");
      //   }
      // } else {
      //   toast.error("Invalid username or password");
      // }

      if (CurrentUser) {
        setUserdata(CurrentUser);
        localStorage.setItem("userdata", JSON.stringify(CurrentUser));
        localStorage.setItem("isloggedin", true);
        toast.success("Login Successful");

        const userRole = CurrentUser.role
          ? CurrentUser.role.toLowerCase()
          : null;
        const hasDetails = CurrentUser.details === true;

        if (userRole === "admin") {
          navigate("/admin");
        } else if (userRole === "client") {
          navigate(hasDetails ? "/home" : "/elf");
        } else {
          toast.error("Role not recognized");
        }
      } else {
        toast.error("Invalid username or password");
      }
    } catch (error) {
      console.error("Error fetching users: ", error);
      toast.error("An error occurred while logging in. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Call the Google login endpoint
      const res = await axios.post("/api/google-login");

      // Process the response
      if (res.status === 200) {
        const { user } = res.data;

        if (user) {
          // Save user data in local storage or context
          localStorage.setItem("userdata", JSON.stringify(user));
          localStorage.setItem("isloggedin", true);
          toast.success("Google Login Successful");

          // Redirect user based on their role
          const userRole = user.role ? user.role.toLowerCase() : null;
          if (userRole === "admin") {
            navigate("/admin");
          } else if (userRole === "client") {
            navigate("/home");
          } else {
            toast.error("Role not recognized");
          }
        } else {
          toast.error("Failed to retrieve user details.");
        }
      } else {
        toast.error("Google Login Failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      toast.error("An error occurred during Google Login.");
    }
  };

  return (
    <div style={{ height: "100%", minHeight: "100dvh" }} className="register">
      {/* <form className="my-form" onSubmit={handleSubmit(onSubmit)}>
        <h2 style={{ textAlign: 'center', marginBottom: "40px" }}>Login</h2>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter Username"
            {...register('username', { required: true })}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            {...register('password', { required: true })}
          />
        </div>
        <div className="form-group">
          <input type="submit" className='submit-btn' value="Login" />
        </div>
      </form> */}
      <div className="register-container d-flex justify-content-center align-items-center">
        <div className="register-card d-flex flex-column flex-md-row shadow-lg rounded">
          {/* Left Column (Form) */}
          <div className="form-container d-flex flex-column w-100 w-md-50 px-5 py-4 bg-light">
            <img
              src={logo}
              alt="Zion Seminary Portal"
              style={{ width: "80px" }}
              className="rounded mb-2"
            />
            <h4 className="text-left text-dark fw-bold mb-3">Sign In</h4>
            <p className="text-muted">
              Don't have an account?{" "}
              {/* <a
                href="/"
                className="text-decoration-underline fw-semibold text-primary"
              >
                Create now
              </a> */}
              <Link to={"/"}>
                <p className="text-decoration-underline fw-semibold text-primary">
                  {" "}
                  Create Now
                </p>
              </Link>
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group mb-3">
                <label className="form-label fw-semibold">E-mail</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email Id"
                  {...register("email", { required: true })}
                />
              </div>

              <div className="form-group mb-3">
                <label className="form-label fw-semibold">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  {...register("password", { required: true })}
                />
              </div>

              <div className="form-check d-flex justify-content-between mb-3">
                <div>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>
                <a className="text-decoration-underline" href="">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 mb-3 rounded-pill"
              >
                Sign In
              </button>

              {/* <div className="text-center mb-3">
                <div className="d-flex align-items-center mb-3">
                  <hr className="flex-grow-1" />
                  <span className="mx-2 fw-semibold">Or</span>
                  <hr className="flex-grow-1" />
                </div>

                <button
                  type="button"
                  className="btn btn-white w-100 mb-3 rounded-pill border d-flex align-items-center"
                  onClick={handleGoogleLogin}
                >
                  <img
                    src={google}
                    alt="Google"
                    style={{ width: "30px" }}
                    className="rounded mb-0"
                  />
                  <span className="flex-grow-1 text-center">
                    Sign in with Google
                  </span>
                </button>
              </div> */}
            </form>
          </div>

          {/* Right Column (Content) */}
          <div className="content-container w-100 w-md-50 p-4 bg-primary text-white d-flex flex-column justify-content-center">
            <h2 className="fw-bold mb-4 text-center">
              Welcome to Zion Seminary
            </h2>
            <p className="mb-4 text-center">
              Zion Seminary's <strong>Education Management System (EMS)</strong>{" "}
              offers:
            </p>

            <ul className="list-unstyled">
              <li className="d-flex mb-1">
                <i
                  className="bi bi-check-circle-fill me-3"
                  style={{ fontSize: "1.5rem", color: "#ffd800" }}
                ></i>
                <span>
                  Comprehensive tools for administrators to manage data
                  efficiently.
                </span>
              </li>
              <li className="d-flex mb-1">
                <i
                  className="bi bi-check-circle-fill me-3"
                  style={{ fontSize: "1.5rem", color: "#ffd800" }}
                ></i>
                <span>
                  Enhanced teaching tools for educators to simplify course
                  management.
                </span>
              </li>
              <li className="d-flex mb-1">
                <i
                  className="bi bi-check-circle-fill me-3"
                  style={{ fontSize: "1.5rem", color: "#ffd800" }}
                ></i>
                <span>
                  User-friendly interface for students to track their progress.
                </span>
              </li>
              <li className="d-flex mb-1">
                <i
                  className="bi bi-check-circle-fill me-3"
                  style={{ fontSize: "1.5rem", color: "#ffd800" }}
                ></i>
                <span>
                  Seamless integration of academic and administrative workflows.
                </span>
              </li>
            </ul>

            <p className="mt-4 text-center">
              Join us today and transform your educational experience with Zion
              Seminary!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;