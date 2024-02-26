import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Styles/PublishCourse.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import ModelPopup from "./ModalPopup";
import toast, { Toaster } from "react-hot-toast";
import { FiEye } from "react-icons/fi";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

const AdminAllStudents = () => {
  const { schoolId } = useParams();
  const [studentsData, setStudentsData] = useState(null);
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(null);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  useEffect(() => {
    // Fetch students data for the specific school
    axios
      .get(`http://localhost:3001/api/fetch-students/${schoolId}`)
      .then((response) => {
        setStudentsData(response.data.studentsData);
      })
      .catch((error) => {
        console.error("Error fetching students data:", error);
      });
  }, [schoolId]);

  const onViewDetails = (userId) => {
    navigate(`/admin/allStudents/${schoolId}/${userId}`);
    setDropdownVisible(null);
  };

  const onEditStudent = (userId) => {
    navigate(`/admin/edit-student/${schoolId}/${userId}`);
    setDropdownVisible(null);
  };

  const onDeleteWithConfirmation = (schoolId) => {
    setStudentToDelete(schoolId);
    setShowDeleteConfirmation(true);
  };

  const onDeleteStudent = async (userId) => {
    try {
      const response = await axios.delete(
        "http://localhost:3001/api/delete-student",
        {
          data: { schoolId, userId: studentToDelete },
        }
      );

      console.log(response.data.message);
      setShowDeleteConfirmation(false);
      toast.success(" Information deleted successfully!");

      // Refresh the studentsData by fetching the updated data
      axios
        .get(`http://localhost:3001/api/fetch-students/${schoolId}`)
        .then((res) => setStudentsData(res.data.studentsData || []));

      setDropdownVisible(null);
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Error deleting student");
    }
  };

  // Cancel deletion
  const cancelDelete = () => {
    setStudentToDelete(null);
    setShowDeleteConfirmation(false);
  };

  // JSX rendering of the component
  return (
    <section className="section__padding">
      <div className="dashboard__header">
        <h2 className="heading-text">Students Information</h2>
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
                    placeholder="Search by school"
                  />
                </div>
              </div>
            </div>

            <Link to={`/admin/add-student/${schoolId}`}>
              <button class="cta__button">
                <i class="bx bx-plus icon__text"></i>
                <p class="button__text">Add Student</p>
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
              <th>S. No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact Info</th>
              <th>SAP ID</th>
              <th>Aadhar Card Number</th>
              <th>Mentors Assigned</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {studentsData &&
              studentsData.map((student, index) => (
                <tr
                  className="table__columns"
                  // onClick={() => handleRowClick(student.user_id)}
                  key={student.user_id}
                  style={{ cursor: "pointer" }}
                >
                  <td>{index + 1}</td>
                  <td>
                    {student.first_name} {student.last_name}
                  </td>
                  <td>{student.email}</td>
                  <td>{student.contact_number}</td>
                  <td>{student.sap_id}</td>
                  <td>{student.aadhar_card_number}</td>
                  <td>
                    {student.mentor_first_name} {student.mentor_last_name}
                  </td>
                  <td style={{ fontSize: "1.2rem", position: "relative" }}>
                    <div className="dropdown">
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
                          <div
                            className="dropdown-item secondary--cta__button"
                            onClick={() => onViewDetails(student.user_id)}
                          >
                            <FiEye class="bx bx-plus secondary--icon__text" />
                            <p class="secondary--button__text">View</p>
                          </div>

                          {/* Edit option */}
                          <div
                            className="dropdown-item secondary--cta__button"
                            onClick={() => onEditStudent(student.user_id)}
                          >
                            <MdOutlineModeEdit class="bx bx-plus secondary--icon__text" />
                            <p class="secondary--button__text">Edit</p>
                          </div>

                          {/* Delete option */}
                          <div
                            className="dropdown-item secondary--cta__button"
                            onClick={() =>
                              onDeleteWithConfirmation(student.user_id)
                            }
                          >
                             <MdDeleteOutline class="bx bx-plus secondary--icon__text" />
                            <p class="secondary--button__text">Delete</p>
                          </div>
                          {/* Confirmation modal */}
                          <ModelPopup
                            show={showDeleteConfirmation}
                            onConfirm={onDeleteStudent}
                            onCancel={cancelDelete}
                          />
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminAllStudents;
