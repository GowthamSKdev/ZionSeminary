import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";

const auth = getAuth()
const provider = new GoogleAuthProvider();


// Force account selection
provider.setCustomParameters({
  prompt: "select_account", // Ensures the Google account chooser is always shown
});

const googlePopup = async (navigate, Courseid) => {
  try {
    // Trigger Google sign-in popup
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check if email is verified
    if (!user.emailVerified) {
      toast.error("Please verify your email address before logging in.");
      await user.sendEmailVerification();
      toast.info("Verification email sent. Please check your inbox.");
      return; // Stop further execution
    }

    // Check if the user is registered or needs to be registered
    const loc = await handleUserCheck(user);

    // Navigate to the appropriate location based on user status
    handleNavigation(navigate, loc, Courseid);
  } catch (error) {
    console.error("Google login error:", error);
    toast.error("Google login failed. Please try again.");
  }
};

// Helper to check user registration
const handleUserCheck = async (user) => {
  try {
    const checkResponse = await check({ email: user.email });
    if (checkResponse.status === 200) {
      toast.success("User already registered. Logging in...");
      return login(checkResponse.data);
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      toast.info("User not found. Registering...");
      return await handleUserRegistration(user);
    } else {
      console.error("Error during user check:", error);
      toast.error("Error verifying user. Please try again later.");
      throw error;
    }
  }
};

// Helper to register a new user
const handleUserRegistration = async (user) => {
  const data = {
    name: user.displayName,
    email: user.email,
    linkedin: null,
    password: null,
  };
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  try {
    const signupResponse = await signupCheck(data, config);
    toast.success("Registration successful. Logging in...");
    return login(signupResponse.data);
  } catch (error) {
    console.error("Signup error:", error);
    toast.error("Signup failed. Please try again.");
    throw error;
  }
};

// Helper to log in the user
const login = (data) => {
  toast.success("Login successful!");
  localStorage.setItem("userdata", JSON.stringify(data));
  localStorage.setItem("isloggedin", true);
//   localStorage.setItem("userid", data._id);
//   localStorage.setItem("name", data.name);
//   localStorage.setItem("email", data.email);
//   localStorage.setItem("linkedin", data.linkedin);
//   localStorage.setItem("elacomplete", data.elaComplete);

  return data.elaComplete ? "home" : "quick-assessment";
};

// Helper to navigate based on user status
// const handleNavigation = (navigate, loc, Courseid) => {
//   if (loc === "home") {
//     navigate(Courseid ? `../home/courseDetails/${Courseid}` : "../home");
//   } else if (loc === "quick-assessment") {
//     navigate("../quick-assessment");
//   }
// };

export default googlePopup;
