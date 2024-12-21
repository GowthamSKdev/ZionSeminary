// import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc , query, where, arrayUnion} from 'firebase/firestore';
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { db, storage } from './firebase'; 
// import bcrypt from 'bcryptjs';

// export const addUser = async (data) => {
//     try {
//         // Check if username or email already exists
//         const usersRef = collection(db, 'users');
//         const q = query(usersRef, where('username', '==', data.username));
//         const usernameSnapshot = await getDocs(q);

//         const qEmail = query(usersRef, where('email', '==', data.email));
//         const emailSnapshot = await getDocs(qEmail);

//         if (!usernameSnapshot.empty) {
//             console.error('Username already exists!');
//             return { success: false, message: 'Username already exists!' };
//         }

//         if (!emailSnapshot.empty) {
//             console.error('Email already exists!');
//             return { success: false, message: 'Email already exists!' };
//         }

//         // Hash the password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(data.password, salt);

       
//         const signatureFile = data.signature[0];
//         const signatureRef = ref(storage, `signatures/${signatureFile.name}`);
//         await uploadBytes(signatureRef, signatureFile);
//         const signatureURL = await getDownloadURL(signatureRef);

        
//         const passportPhotoFile = data.passportSizePhoto[0];
//         const passportPhotoRef = ref(storage, `photos/${passportPhotoFile.name}`);
//         await uploadBytes(passportPhotoRef, passportPhotoFile);
//         const passportPhotoURL = await getDownloadURL(passportPhotoRef);

       
//         const educationCertFile = data.educationCertificate[0];
//         const educationCertRef = ref(storage, `certificates/${educationCertFile.name}`);
//         await uploadBytes(educationCertRef, educationCertFile);
//         const educationCertURL = await getDownloadURL(educationCertRef);

//         // Add user data to Firestore
//         await addDoc(usersRef, {
//             firstName: data.firstName,
//             lastName: data.lastName,
//             mobileNo: data.mobileNo,
//             email: data.email,
//             maritalStatus: data.maritalStatus,
//             dob: data.dob,
//             gender: data.gender,
//             applyingFor: data.applyingFor,
//             educationalQualification: data.educationalQualification,
//             theologicalQualification: data.theologicalQualification,
//             presentAddress: data.presentAddress,
//             ministryExperience: data.ministryExperience,
//             salvationExperience: data.salvationExperience,
//             signatureURL: signatureURL,
//             passportPhotoURL: passportPhotoURL,
//             educationCertURL: educationCertURL,
//             username: data.username,
//             password: hashedPassword,
//             purchasedDegrees: [],
//             role: data.role || 'client',
//             joinedDate: Date.now()
//         });

//         console.log('Data successfully saved to Firestore and files uploaded to Storage!');
//         return { success: true, message: 'User created successfully!' };

//     } catch (error) {
//         console.error('Error saving data or uploading files:', error);
//         return { success: false, message: 'Error saving data or uploading files' };
//     }
// };

// export const getAllUsers = async () => {
//     try {
//         const data = await getDocs(collection(db, 'users'));
//         const users = data?.docs?.map((doc) => { return { id: doc.id, ...doc.data() } });
//         return users;
//     } catch (error) {
//         console.log(error);
//     }
// };

// export const getUserById = async (id) => {
//     try {
//         if (!id) {
//             throw new Error('Invalid document ID');
//         }

//         const userDoc = doc(db, 'users', id);
//         const userSnapshot = await getDoc(userDoc);

//         if (userSnapshot.exists()) {
//             return { id: userSnapshot.id, ...userSnapshot.data() };
//         } else {
//             console.error('No such user exists!');
//             return null;
//         }
//     } catch (error) {
//         console.error('Error fetching user by ID:', error);
//         return null;
//     }
// };


// export const getUsersByPurchasedDegree = async (degreeId) => {
//     try {
//         if (!degreeId) {
//             throw new Error('Degree ID is required');
//         }
//         const usersRef = collection(db, 'users');
//         const q = query(usersRef, where('purchasedDegrees', 'array-contains', { degreeId }));
//         const querySnapshot = await getDocs(q);

//         const users = querySnapshot.docs.map(doc => ({
//             id: doc.id,
//             ...doc.data()
//         }));

//         console.log(`${users.length} users found with the purchased degree: ${degreeId}`);
//         return users;
//     } catch (error) {
//         console.error('Error fetching users by purchased degree:', error);
//         return [];
//     }
// };

// export const getUsersByRole = async (role) => {
//     try {
//         const usersRef = collection(db, 'users');
//         const q = query(usersRef, where('role', '==', role));
//         const querySnapshot = await getDocs(q);

//         const users = querySnapshot.docs.map(doc => ({
//             id: doc.id,
//             ...doc.data()
//         }));

//         console.log(`${users.length} users found with the role: ${role}`);
//         return users;
//     } catch (error) {
//         console.error('Error fetching users by role:', error);
//         return [];
//     }
// };



// export const editUser = async (id, data) => {
//     try {
//         let educationCertURL = data?.educationCertURL || '';
//         let signatureURL = data?.signatureURL || '';
//         let passportPhotoURL = data?.passportPhotoURL || '';

//         const signatureFile = data?.signature[0];
//         if (signatureFile) {
//             const signatureRef = ref(storage, `signatures/${signatureFile?.name}`);
//             await uploadBytes(signatureRef, signatureFile);
//             signatureURL = await getDownloadURL(signatureRef);
//         }

//         const passportPhotoFile = data.passportSizePhoto[0];
//         if (passportPhotoFile) {
//             const passportPhotoRef = ref(storage, `photos/${passportPhotoFile.name}`);
//             await uploadBytes(passportPhotoRef, passportPhotoFile);
//             passportPhotoURL = await getDownloadURL(passportPhotoRef);
//         }

//         const educationCertFile = data.educationCertificate[0];
//         if (educationCertFile) {
//             const educationCertRef = ref(storage, `certificates/${educationCertFile.name}`);
//             await uploadBytes(educationCertRef, educationCertFile);
//             educationCertURL = await getDownloadURL(educationCertRef);
//         }

//         const hashedPassword = data.password ? await bcrypt.hash(data.password, 10) : data.passwordHash;

//         await updateDoc(doc(db, 'users', id), {
//             firstName: data.firstName,
//             lastName: data.lastName,
//             mobileNo: data.mobileNo,
//             email: data.email,
//             maritalStatus: data.maritalStatus,
//             dob: data.dob,
//             gender: data.gender,
//             applyingFor: data.applyingFor,
//             educationalQualification: data.educationalQualification,
//             theologicalQualification: data.theologicalQualification,
//             presentAddress: data.presentAddress,
//             ministryExperience: data.ministryExperience,
//             salvationExperience: data.salvationExperience,
//             signatureURL: signatureURL,
//             passportPhotoURL: passportPhotoURL,
//             educationCertURL: educationCertURL,
//             username: data.username,
//             password: hashedPassword,
//             role: data.role || 'client' 
//         });

//         console.log('Data successfully updated in Firestore and files uploaded to Storage!');
//         return true;
//     } catch (error) {
//         console.error('Error updating data or uploading files:', error);
//     }
// };

// export const deleteUser = async (id) => {
//     try {
//         if (!id) {
//             throw new Error('Invalid document ID');
//         }
//         await deleteDoc(doc(db, 'users', id));
//         return true;
//     } catch (error) {
//         console.log('Error deleting user:', error);
//     }
// };

// export const addDegreeToUser = async (userId, degree) => {
//     try {
//         const userRef = doc(db, 'users', userId);
//         const userSnapshot = await getDoc(userRef);

//         if (!userSnapshot.exists()) {
//             console.error('No such user found!');
//             return { success: false, message: 'User not found' };
//         }

//         const userData = userSnapshot.data();
//         const purchasedDegrees = userData.purchasedDegrees || [];
//         const existingDegree = purchasedDegrees.find(d => d.degreeId === degree.degreeId);
//         if (existingDegree) {
//             console.log('Degree already purchased by user.');
//             return { success: false, message: 'Degree already purchased' };
//         }
//         const updatedDegrees = [
//             ...purchasedDegrees,
//             {
//                 degreeId: degree.degreeId,
//                 degreeName: degree.degreeName,
//                 progress: degree.progress || 0
//             }
//         ];

//         await updateDoc(userRef, { purchasedDegrees: updatedDegrees });

//         console.log('Degree successfully added to user!');
//         return { success: true, message: 'Degree added to user' };
//     } catch (error) {
//         console.error('Error adding degree to user:', error);
//         return { success: false, message: 'Error adding degree to user' };
//     }
// };


// // export const addCourseToUser = async (
// //   userId,
// //   courseId,
// //   degreeId,
// // //   degreeTitle,
// //   courseTitle
// // ) => {
// //   try {
// //     const userDocRef = doc(db, "users", userId);

// //     const purchasedCourse = {
// //       courseId: courseId,
// //       courseTitle: courseTitle,
// //       degreeId: degreeId,
// //     //   degreeTitle: degreeTitle,
// //       progress: 0,
// //       chapters: [],
// //     };

// //     await updateDoc(userDocRef, {
// //       purchasedCourses: arrayUnion(purchasedCourse),
// //     });

// //     console.log("Course added to purchased courses successfully!");
// //   } catch (error) {
// //     console.error("Error adding course to user:", error);
// //     throw new Error("Failed to add course to user");
// //   }
// // };

// export const addCourseToUser = async (userId, degreeId, courseId) => {
//   try {
//     const userDocRef = doc(db, "users", userId);
//     const degreeDocRef = doc(db, "degrees", degreeId); // Fetch the degree document

//     // Fetch the degree document
//     const degreeSnapshot = await getDoc(degreeDocRef);

//     if (!degreeSnapshot.exists()) {
//       console.error("Degree not found!");
//       throw new Error("Degree not found");
//     }

//     const degreeData = degreeSnapshot.data();

//     // Find the specific course in the courses array
//     const courseData = degreeData.courses.find(
//       (course) => course.courseId === courseId
//     );

//     if (!courseData) {
//       console.error("Course not found in the degree!");
//       throw new Error("Course not found in the degree");
//     }

//     // Construct the purchasedCourse object
//     const purchasedCourse = {
//       courseId: courseId,
//       degreeId: degreeId,
//       courseTitle: courseData.title, // Assuming `title` is a field in the course
//       description: courseData.description, // Assuming `description` is a field in the course
//       progress: 0,
//       chapters: courseData.chapters || [], // Assuming `chapters` is an array in the course
//     };

//     // Add the course to the user's purchasedCourses array
//     await updateDoc(userDocRef, {
//       purchasedCourses: arrayUnion(purchasedCourse),
//     });

//     console.log("Course added to purchased courses successfully!");
//     return { success: true, message: "Course added to user" };
//   } catch (error) {
//     console.error("Error adding course to user:", error);
//     return { success: false, message: "Failed to add course to user" };
//   }
// };


// // import { doc, updateDoc, arrayUnion } from "firebase/firestore";
// // import { db } from "./firebase"; // Your Firebase configuration file

// // export const addCourseToUser = async (userId, degreeId, courseId, courseDetails) => {
// //   try {
// //     const userDocRef = doc(db, "users", userId);

// //     // Create the course object
// //     const purchasedCourse = {
// //       courseId: courseId,
// //       degreeId: degreeId,
// //       courseTitle: courseDetails.title,
// //       degreeTitle: courseDetails.degreeTitle,
// //       description: courseDetails.description,
// //       progress: 0, // Initial progress
// //       chapters: courseDetails.chapters.map((chapter) => ({
// //         chapterId: chapter.id,
// //         title: chapter.title,
// //         completed: false,
// //       })),
// //     };

// //     // Add to Firestore
// //     await updateDoc(userDocRef, {
// //       purchasedCourses: arrayUnion(purchasedCourse),
// //     });

// //     console.log("Purchased course added successfully!");
// //   } catch (error) {
// //     console.error("Error adding purchased course:", error);
// //   }
// // };




import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  query,
  where,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "./firebase";
import bcrypt from "bcryptjs";
// import { getDegreeFromCourseId } from "./degreeApi";
import { getCourseById, getDegreeByCourseId } from "./degreeApi";

/**
 * Add a new user to Firestore with file uploads and password hashing.
 */
export const addUser = async (data) => {
  try {
    const usersRef = collection(db, "users");

    // Check if username or email already exists
    const [usernameSnapshot, emailSnapshot] = await Promise.all([
      getDocs(query(usersRef, where("username", "==", data.username))),
      getDocs(query(usersRef, where("email", "==", data.email))),
    ]);

    if (!usernameSnapshot.empty) {
      console.error("Username already exists!");
      return { success: false, message: "Username already exists!" };
    }

    if (!emailSnapshot.empty) {
      console.error("Email already exists!");
      return { success: false, message: "Email already exists!" };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // File uploads
    const uploadFile = async (file, folder) => {
      const fileRef = ref(storage, `${folder}/${file.name}`);
      await uploadBytes(fileRef, file);
      return getDownloadURL(fileRef);
    };

    const signatureURL = await uploadFile(data.signature[0], "signatures");
    const passportPhotoURL = await uploadFile(
      data.passportSizePhoto[0],
      "photos"
    );
    const educationCertURL = await uploadFile(
      data.educationCertificate[0],
      "certificates"
    );

    // Add user data to Firestore
    await addDoc(usersRef, {
      firstName: data.firstName,
      lastName: data.lastName,
      mobileNo: data.mobileNo,
      email: data.email,
      maritalStatus: data.maritalStatus,
      dob: data.dob,
      gender: data.gender,
      applyingFor: data.applyingFor,
      educationalQualification: data.educationalQualification,
      theologicalQualification: data.theologicalQualification,
      presentAddress: data.presentAddress,
      ministryExperience: data.ministryExperience,
      salvationExperience: data.salvationExperience,
      signatureURL,
      passportPhotoURL,
      educationCertURL,
      username: data.username,
      password: hashedPassword,
      purchasedDegrees: [],
      role: data.role || "client",
      joinedDate: Date.now(),
    });

    console.log("User created successfully!");
    return { success: true, message: "User created successfully!" };
  } catch (error) {
    console.error("Error adding user:", error);
    return { success: false, message: "Error adding user" };
  }
};

/**
 * Fetch all users from Firestore.
 */
export const getAllUsers = async () => {
  try {
    const usersSnapshot = await getDocs(collection(db, "users"));
    return usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

/**
 * Fetch a single user by their ID.
 */
export const getUserById = async (id) => {
  try {
    if (!id) throw new Error("Invalid document ID");
    const userDoc = doc(db, "users", id);
    const userSnapshot = await getDoc(userDoc);

    if (userSnapshot.exists()) {
      return { id: userSnapshot.id, ...userSnapshot.data() };
    } else {
      console.error("No such user exists!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
};

/**
 * Fetch users who purchased a specific degree.
 */
export const getUsersByPurchasedDegree = async (degreeId) => {
  try {
    if (!degreeId) throw new Error("Degree ID is required");
    const q = query(
      collection(db, "users"),
      where("purchasedDegrees", "array-contains", degreeId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching users by purchased degree:", error);
    return [];
  }
};

/**
 * Fetch users by their role.
 */
export const getUsersByRole = async (role) => {
  try {
    const q = query(collection(db, "users"), where("role", "==", role));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching users by role:", error);
    return [];
  }
};

/**
 * Edit user details and handle optional file uploads.
 */
export const editUser = async (id, data) => {
  try {
    const uploadFile = async (file, folder) => {
      const fileRef = ref(storage, `${folder}/${file.name}`);
      await uploadBytes(fileRef, file);
      return getDownloadURL(fileRef);
    };

    const updatedData = {
      ...data,
      signatureURL: data.signature
        ? await uploadFile(data.signature[0], "signatures")
        : data.signatureURL,
      passportPhotoURL: data.passportSizePhoto
        ? await uploadFile(data.passportSizePhoto[0], "photos")
        : data.passportPhotoURL,
      educationCertURL: data.educationCertificate
        ? await uploadFile(data.educationCertificate[0], "certificates")
        : data.educationCertURL,
      password: data.password
        ? await bcrypt.hash(data.password, 10)
        : data.passwordHash,
    };

    await updateDoc(doc(db, "users", id), updatedData);
    console.log("User updated successfully!");
    return { success: true, message: "User updated successfully!" };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, message: "Error updating user" };
  }
};

/**
 * Delete a user by their ID.
 */
export const deleteUser = async (id) => {
  try {
    if (!id) throw new Error("Invalid document ID");
    await deleteDoc(doc(db, "users", id));
    console.log("User deleted successfully!");
    return { success: true, message: "User deleted successfully!" };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, message: "Error deleting user" };
  }
};


// export const addCourseToUser = async (userId, courseId, courseTitle) => {
//   try {
//     const { degreeId, degreeTitle } = await getDegreeByCourseId(courseId);
//     // const {degreeId , degreeTitle} = await getDegreeFromCourseId(courseId)

//     const purchasedCourse = {
//       courseId,
//       courseTitle,
//       degreeId,
//       degreeTitle,
//       progress: 0,
//       chapters: [],
//     };

//     const userDocRef = doc(db, "users", userId);
//     await updateDoc(userDocRef, {
//       purchasedCourses: arrayUnion(purchasedCourse),
//     });

//     console.log("Course added to purchased courses successfully!");
//   } catch (error) {
//     console.error("Error adding course to user:", error);
//     throw new Error("Failed to add course to user");
//   }
// };

export const addCourseToUser=async(userId, courseId, courseTitle)=> {
  try {
    // Fetch the degree information
    // const { degreeId, degreeTitle } = await getDegreeByCourseId(courseId);
    const degrees = await getDegreeByCourseId(courseId);

       const degree = degrees[0];
       const degreeId = degree?.degreeId;
       const degreeTitle = degree?.degreeTitle;
    // Log the fetched data for debugging
    console.log(courseId, courseTitle, degreeId, degreeTitle,degree);

    // Validate the course and degree data
    if (!courseId || !courseTitle || !degreeId || !degreeTitle || !degree) {
      console.error("Invalid course or degree data:", {
        courseId,
        courseTitle,
        degreeId,
        degreeTitle,
        degree
      });
      return;
    }

    // Prepare the course data
    const purchasedCourse = {
      courseId,
      courseTitle,
      degreeId,
      degreeTitle,
      progress: 0,
      chapters: [],
    };

    // Get user document from Firestore
    const userRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userRef);

    if (userDocSnap.exists()) {
      // Ensure purchasedCourses is an array before updating
      const userData = userDocSnap.data();
      if (!Array.isArray(userData.purchasedCourses)) {
        console.error(
          "Purchased courses field is not an array:",
          userData.purchasedCourses
        );
        return;
      }

      // Update the user's purchased courses with the new course
      await updateDoc(userRef, {
        purchasedCourses: arrayUnion(purchasedCourse),
      });

      console.log("Course added successfully!");
    } else {
      console.error("User not found");
    }
  } catch (error) {
    console.error("Error adding course to user:", error);
  }
}





export const getEnrolledCourses = async (userId) => {
  try {
    // console.log("Starting to fetch enrolled courses for userId:", userId);

    // Reference to the user's document in Firestore
    const userDocRef = doc(db, "users", userId);

    // Fetch the user document
    // console.log("Fetching user document...");
    const userDocSnap = await getDoc(userDocRef);
    // console.log("User document fetched:", userDocSnap.exists());

    // Check if the document exists
    if (!userDocSnap.exists()) {
      throw new Error(`No user found with ID: ${userId}`);
    }

    // Get the data from the document
    const userData = userDocSnap.data();
    // console.log("User data:", userData);

    // Retrieve enrolled courses or return an empty array if not present
    const enrolledCourses = Array.isArray(userData.purchasedCourses)
      ? userData.purchasedCourses
      : [];
    // console.log("Enrolled courses:", enrolledCourses);

    // Enhance courses with default values for missing fields
    const enhancedCourses = enrolledCourses.map((course) => ({
      courseId: course.courseId || "",
      courseTitle: course.courseTitle || "Untitled Course",
      degreeId: course.degreeId || "",
      degreeTitle: course.degreeTitle || "Untitled Degree",
      description: course.description || "No description available.",
      progress: course.progress !== undefined ? course.progress : 0,
      chapters: Array.isArray(course.chapters) ? course.chapters : [],
    }));

    // console.log("Enhanced courses:", enhancedCourses);
    return enhancedCourses;
  } catch (error) {
    console.error("Error fetching enrolled courses for userId:", userId, error);
    throw new Error("Failed to fetch enrolled courses");
  }
};





