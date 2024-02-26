import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Styles/PublishCourse.css";
import { Link, useNavigate } from "react-router-dom";
import ModelPopup from "./ModalPopup";
import toast, { Toaster } from "react-hot-toast";
import { FiEye } from "react-icons/fi";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

const AdminAllSchools = () => {
  const navigate = useNavigate();
  const [schoolData, setSchoolData] = useState([]);

  // State to manage dropdown visibility
  const [dropdownVisible, setDropdownVisible] = useState(null);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [schoolToDelete, setSchoolToDelete] = useState(null);

  useEffect(() => {
    // Fetch school data when component mounts
    axios
      .get("http://localhost:3001/api/fetch-school-data")
      .then((res) => {
        setSchoolData(res.data.schoolData || []);
      })
      .catch((error) => {
        console.error("Error fetching school data:", error);
      });
  }, []);

  // View school details
  const onViewDetails = (schoolId) => {
    navigate(`/admin/allSchools/${schoolId}`);
    setDropdownVisible(null);
  };

  // Edit school details
  const onEditSchool = (schoolId) => {
    navigate(`/admin/edit-school/${schoolId}`);
    console.log(`Editing school with ID: ${schoolId}`);
    setDropdownVisible(null);
  };

  const onDeleteWithConfirmation = (schoolId, totalTeachers, totalStudents) => {
    if (totalTeachers > 0 || totalStudents > 0) {
      // Display an error message
      toast.error(
        "Cannot delete the school. Delete all teachers and students first."
      );
    } else {
      setSchoolToDelete(schoolId);
      setShowDeleteConfirmation(true);
    }
  };

  const confirmDelete = async () => {
    try {
      const schoolToDeleteDetails = schoolData.find(
        (school) => school.school_id === schoolToDelete
      );

      if (
        schoolToDeleteDetails &&
        schoolToDeleteDetails.total_teachers !== null &&
        schoolToDeleteDetails.total_students !== null &&
        parseInt(schoolToDeleteDetails.total_teachers, 10) === 0 &&
        parseInt(schoolToDeleteDetails.total_students, 10) === 0
      ) {
        const response = await axios.delete(
          "http://localhost:3001/api/delete-school",
          {
            data: { schoolId: schoolToDelete },
          }
        );

        console.log(response.data.message);

        axios
          .get("http://localhost:3001/api/fetch-school-data")
          .then((res) => setSchoolData(res.data.schoolData || []));

        setDropdownVisible(null);
        setShowDeleteConfirmation(false);
        toast.success("Information deleted successfully!");
      } else {
        toast.error(
          "Cannot delete the school. Delete all teachers and students first."
        );
      }
    } catch (error) {
      console.error("Error deleting school:", error);
      toast.error("Error deleting school");
    }
  };

  // Cancel deletion
  const cancelDelete = () => {
    setSchoolToDelete(null);
    setShowDeleteConfirmation(false);
  };

  // JSX rendering of the component
  return (
    <section className="section__padding">
      <div className="dashboard__header">
        <h2 className="heading-text">Schools Information</h2>
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

            <Link to="/admin/add-school">
              <button class="cta__button">
                <i class="bx bx-plus icon__text"></i>
                <p class="button__text">Add School</p>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="dashboard__table">
        <div className="content__card-full-length cards">
          <table>
            <thead>
              <tr className="table__headers">
                <th>S.No.</th>
                <th>School Name</th>
                {/* <th>Principal Name</th> */}
                <th>Funds Deployed</th>
                <th>Contact Number</th>
                <th style={{ position: "relative" }}>Teachers Count</th>
                <th style={{ position: "relative" }}>Students Count</th>
                <th style={{ fontSize: "1.2rem", position: "relative" }}></th>
              </tr>
            </thead>
            <tbody>
              {schoolData.map((school, index) => (
                <tr key={index} className="table__columns">
                  <td>{index + 1}</td>
                  <td>{school.school_name}</td>
                  {/* <td>{school.principal_name}</td> */}
                  <td>{school.funds_deployed}</td>
                  <td>{school.contact_number}</td>
                  <td style={{ paddingLeft: "2rem" }}>
                    {school.total_teachers}
                  </td>
                  <td style={{ paddingLeft: "2rem" }}>
                    {school.total_students}
                  </td>
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
                            onClick={() => onViewDetails(school.school_id)}
                          >
                            <FiEye class="bx bx-plus secondary--icon__text" />
                            <p class="secondary--button__text">View</p>
                          </button>

                          {/* Edit option */}

                          <button
                            className="dropdown-item secondary--cta__button"
                            onClick={() => onEditSchool(school.school_id)}
                          >
                            <MdOutlineModeEdit class="bx bx-plus secondary--icon__text" />
                            <p class="secondary--button__text">Edit</p>
                          </button>
                          
                             
                          {/* Delete Button */}
                          <button
                            className="dropdown-item secondary--cta__button"
                            onClick={() =>
                              onDeleteWithConfirmation(school.school_id)
                            }
                          >
                            <MdDeleteOutline class="bx bx-plus secondary--icon__text" />
                            <p class="secondary--button__text">Delete</p>
                          </button>

                          {/* Confirmation modal */}
                          <ModelPopup
                            show={showDeleteConfirmation}
                            onConfirm={confirmDelete}
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
      </div>
    </section>
  );
};

export default AdminAllSchools;
