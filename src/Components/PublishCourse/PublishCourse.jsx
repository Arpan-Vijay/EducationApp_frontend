import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Styles/PublishCourse.css";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FiEye } from "react-icons/fi";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

const PublishCourse = () => {
  const [userCourses, setUserCourses] = useState([]);
  const navigate = useNavigate();

  // State to manage dropdown visibility
  const [dropdownVisible, setDropdownVisible] = useState(null);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [schoolToDelete, setSchoolToDelete] = useState(null);

  useEffect(() => {
    try {
      // Retrieve the JWT token from localStorage
      const userId = localStorage.getItem("auth");

      if (userId) {
        axios
          .post("http://localhost:3001/api/fetch-user-data", {
            user_id: userId,
          })
          .then((res) => {
            setUserCourses(res.data.userData || []);
          })
          .catch((error) => {
            console.error("Error fetching user courses:", error);
          });
      }
    } catch (error) {
      console.error("Error parsing JWT token:", error);
    }
  }, []); // Empty dependency array to trigger the effect once on mount

  // Tempropary functions : delete later

  // Function to generate a random number between min and max (inclusive)
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Function to generate dummy data for the "Students Enrolled" and "Completion Rate" columns
  // const generateDummyData = () => {
  //   return {
  //     studentsEnrolled: getRandomNumber(10, 100),
  //     completionRate: getRandomNumber(50, 100),
  //   };
  // };

  // Tempropary functions : delete later

  // JSX rendering of the component
  return (
    <section className="section__padding">
      <div className="dashboard__header">
        <h2 className="heading-text">Publish Courses</h2>
        <div>
          <div className="buttons">
            <div class="searchbar">
              <div class="searchbar-wrapper">
                <div class="searchbar-left">
                  <div class="search-icon-wrapper">
                    <span class="search-icon searchbar-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                      </svg>
                    </span>
                  </div>
                </div>

                <div class="searchbar-center">
                  <div class="searchbar-input-spacer"></div>

                  <input
                    type="text"
                    class="searchbar-input"
                    maxlength="2048"
                    name="q"
                    autocapitalize="off"
                    // autocomplete="off"
                    title="Search"
                    // role="combobox"
                    placeholder="Search by course name"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="dashboard__table">
        <div className="content__card-full-length cards">
          <table>
            <thead>
              <tr className="table__headers">
                <th>Subject</th>
                <th>Course Name</th>
                <th>Total Chapters</th>
                <th>Students Enrolled</th>
                <th>Completion Rate</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {userCourses.map((course, index) => (
                <tr key={index} className="table__columns">
                  <td>{course.subject_name}</td>
                  <td>{course.course_name}</td>
                  <td>{course.total_chapters}</td>
                  <td></td>
                  <td></td>

                  <td style={{ fontSize: "1.2rem", position: "relative" }}>
                    <div>
                      <i
                        className="bx bx-dots-horizontal-rounded"
                        id="dot"
                        onClick={() => setDropdownVisible(index)}
                      ></i>
                      {dropdownVisible === index && (
                        <div
                          className={`dropdown-content ${
                            dropdownVisible === index
                              ? "show-pop-up"
                              : "hide-pop-up"
                          }`}
                        >
                          {/* View option */}

                          <button
                            className="dropdown-item secondary--cta__button"
                            // onClick={() => onViewDetails(school.school_id)}
                          >
                            <FiEye class="bx bx-plus secondary--icon__text" />
                            <p class="secondary--button__text">View</p>
                          </button>

                          {/* Edit option */}

                          <button
                            className="dropdown-item secondary--cta__button"
                            // onClick={() => onEditSchool(school.school_id)}
                          >
                            <MdOutlineModeEdit class="bx bx-plus secondary--icon__text" />
                            <p class="secondary--button__text">Edit</p>
                          </button>

                          <button
                            className="dropdown-item secondary--cta__button"
                            // onClick={() =>
                            //   onDeleteWithConfirmation(school.school_id)
                            // }
                          >
                            <MdDeleteOutline class="bx bx-plus secondary--icon__text" />
                            <p class="secondary--button__text">Delete</p>
                          </button>

                          {/* Confirmation modal */}
                          {/* <ModelPopup
                            show={showDeleteConfirmation}
                            onConfirm={confirmDelete}
                            onCancel={cancelDelete}
                          /> */}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PublishCourse;

// <section className="publish__course">
//   <div className="publish__course-header">
//     <h3 className="publish__course-heading h-text ">Publish Course</h3>

//     <div className="buttons">
//       <div class="container-input">
//         <input type="text" placeholder="Search" name="text" class="search-input" />
//         <svg
//           fill="#000000"
//           width="20px"
//           height="20px"
//           viewBox="0 0 1920 1920"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z"
//             fill-rule="evenodd"
//           ></path>
//         </svg>
//       </div>
//       <div className="icons">
//         <div className="filter-icon">
//           <i class="bx bx-filter-alt "></i>
//         </div>
//         <div className="order-icon">
//           <i class="bx bx-objects-vertical-bottom"></i>
//         </div>
//       </div>
//       {/* <button className="cta_button">Create Course</button> */}
//     </div>
//   </div>

//   <div className="publish__course-details">
//     <div className="content__card-full-length"></div>
//     <div className="cards">
//       <table className="content__card-table">
//         <tbody>
//           <tr>
// <th className="content__table-col-heading">Subject</th>
// <th className="content__table-col-heading">Course Name</th>
// <th className="content__table-col-heading">Total Chapters</th>
// <th className="content__table-col-heading">
//   Students Enrolled
// </th>
// <th className="content__table-col-heading">Completion Rate</th>
// </tr>

//           {userCourses.map((course, index) => {
//             const dummyData = generateDummyData(); // Generate dummy data for each course

//             return (
//               <tr key={index} className="content__table">
// <td className="content__table-data">{course.subject_name}</td>
// <td className="content__table-data">{course.course_name}</td>
// <td className="content__table-data">{course.total_chapters}</td>
// <td className="content__table-data">{dummyData.studentsEnrolled}</td>
// <td className="content__table-data">{dummyData.completionRate}%</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   </div>
// </section>
