import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Styles/PublishCourse.css";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
// import ModalPopup from "../Admin/ModalPopup";
import CourseDeleteModal from "./CourseDeleteModal";

import { FiEye } from "react-icons/fi";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

const AllCourses = () => {
  const [userCourses, setUserCourses] = useState([]);
  const [showPopUp, setShowPopUp] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState({
    state: false,
    courseId: null,
  });

  const navigate = useNavigate();
  useEffect(() => {
    try {
      // Retrieve the JWT token from localStorage
      const userId = localStorage.getItem("auth");
      //we can send only the userId
      if (userId) {
        axios
          .post("http://localhost:3001/api/fetch-user-data", {
            user_id: userId,
          })
          .then((res) => {
            setUserCourses(res.data.userData || []);
            console.log(res.data.userData);
          })
          .catch((error) => {
            console.error("Error fetching user courses:", error);
          });
      }
    } catch (error) {
      console.error("Error parsing JWT token:", error);
    }
  }, []); // Empty dependency array to trigger the effect once on mount

  // useEffect(()=>{
  //   document.addEventListener('click' , ()=>{
  //     console.log('clicked')
  //     setShowPopUp('');
  //   })

  //   return ()=>{
  //     document.removeEventListener('click',(e)=>{

  //       console.log("removed");
  //     })
  //   }
  // },[])
  // JSX rendering of the component
  function deleteCourse(courseId) {
    axios
      .delete("http://localhost:3001/api/delete-course", {
        data: {
          courseId: courseId,
        },
      })
      .then((response) => {
        if (response.data.status === "success") {
          setUserCourses((userCourses) => {
            const newUserCourses = userCourses.filter(
              (userCourse) => userCourse.course_id !== courseId
            );
            return newUserCourses;
          });
        }
      });
  }

  function handleDelete(courseId) {
    setShowDeleteModal({ state: true, courseId: courseId });
  }

  function handleCloseDeleteModal() {
    setShowDeleteModal({ state: false, courseId: null });
  }
  return (
    <>
      <CourseDeleteModal
        showDeleteModal={showDeleteModal}
        handleCloseDeleteModal={handleCloseDeleteModal}
        deleteCourse={deleteCourse}
      />
      <section className="section__padding">
        <div className="dashboard__header">
          <h2 className="heading-text">All Courses</h2>
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
                      placeholder="Search by subject"
                    />
                  </div>
                </div>
              </div>

              <Link to="/create-course">
                <button class="cta__button" style={{ width: "155px" }}>
                  <i class="bx bx-plus icon__text"></i>
                  <p class="button__text">Create Course</p>
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="dashboard__table">
          <div className="content__card-full-length cards"></div>

          <table>
            <thead>
              <tr className="table__headers">
                <th>S.No.</th>
                <th>Subject</th>
                <th>Course Name</th>
                <th>Total Chapters</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {userCourses.map((course, index) => (
                <tr
                  key={index}
                  className="table__columns"
                  onClick={(e) => {
                    console.log("course.course_id", course.course_id);
                    navigate(`/preview/${course.course_id}`);
                  }}
                >
                  <td>{index + 1}</td>
                  <td>{course.subject_name}</td>
                  <td>{course.course_name}</td>
                  <td>{course.total_chapters}</td>
                  <td>{course.status}</td>
                  <td
                    style={{ fontSize: "1.2rem", position: "relative" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowPopUp((showPopUp) => {
                        if (showPopUp) {
                          return "";
                        } else {
                          return course.course_id;
                        }
                      });
                    }}
                  >
                    <i className="bx bx-dots-horizontal-rounded" id="dot"></i>
                    <div
                      className={`${
                        showPopUp === course.course_id
                          ? "show-pop-up"
                          : "hide-pop-up"
                      }`}
                    >
                      {/* View button */}
                      <button
                        className="dropdown-item secondary--cta__button"
                        onClick={(e) => {
                          navigate(`/preview/${course.course_id}`);
                        }}
                      >
                        <FiEye class="bx bx-plus secondary--icon__text" />
                        <p class="secondary--button__text">View</p>
                      </button>

                      <button
                        className="dropdown-item secondary--cta__button"
                        onClick={(e) => {
                          navigate(`/course-builder/${course.course_id}`);
                        }}
                      >
                        <MdOutlineModeEdit class="bx bx-plus secondary--icon__text" />
                        <p class="secondary--button__text">Edit</p>
                      </button>

                      {/* Delete Button */}

                      <button
                        className="dropdown-item secondary--cta__button"
                        onClick={() => {
                          handleDelete(course.course_id);
                        }}
                      >
                        <MdDeleteOutline class="bx bx-plus secondary--icon__text" />
                        <p class="secondary--button__text">Delete</p>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default AllCourses;
