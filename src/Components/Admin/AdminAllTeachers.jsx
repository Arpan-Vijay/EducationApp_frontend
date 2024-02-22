import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Styles/PublishCourse.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import ModelPopup from "./ModalPopup";
import toast, { Toaster } from "react-hot-toast";

const AdminAllTeachers = ({ match }) => {
  const { schoolId } = useParams();
  const [teachersData, setTeachersData] = useState(null);
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(null);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState(null);

  useEffect(() => {
    // Fetch teachers data for the specific school
    axios
      .get(`http://localhost:3001/api/fetch-teachers/${schoolId}`)
      .then((response) => {
        setTeachersData(response.data.teachersData);
      })
      .catch((error) => {
        console.error("Error fetching teachers data:", error);
      });
  }, [schoolId]);

  const onViewDetails = (userId) => {
    navigate(`/admin/allTeachers/${schoolId}/${userId}`);
    setDropdownVisible(null);
  };

  const onEditTeacher = (userId) => {
    navigate(`/admin/edit-teacher/${schoolId}/${userId}`);
    setDropdownVisible(null);
  };

  const onDeleteWithConfirmation = (schoolId) => {
    setTeacherToDelete(schoolId);
    setShowDeleteConfirmation(true);
  };

  const onDeleteTeacher = async (userId) => {
    try {
      const response = await axios.delete(
        "http://localhost:3001/api/delete-teacher",
        {
          data: { schoolId, userId: teacherToDelete },
        }
      );

      console.log(response.data.message);
      setShowDeleteConfirmation(false);
      toast.success(" Information deleted successfully!");
      // Refresh the teachersData by fetching the updated data
      axios
        .get(`http://localhost:3001/api/fetch-teachers/${schoolId}`)
        .then((res) => setTeachersData(res.data.teachersData || []));

      setDropdownVisible(null);
    } catch (error) {
      console.error("Error deleting teacher:", error);
      toast.error("Error deleting student");
    }
  };

  // Cancel deletion
  const cancelDelete = () => {
    setTeacherToDelete(null);
    setShowDeleteConfirmation(false);
  };

  // JSX rendering of the component
  return (
    <section className="publish__course">
      <div className="publish__course-header">
        <h3 className="publish__course-heading h-text ">
          Teachers Information
        </h3>

        <div className="buttons">
          <div className="container-input">
            <input
              type="text"
              placeholder="Search"
              name="text"
              className="search-input"
            />
            <svg
              fill="#000000"
              width="20px"
              height="20px"
              viewBox="0 0 1920 1920"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z"
                fillRule="evenodd"
              ></path>
            </svg>
          </div>
          <div className="icons">
            <div className="filter-icon">
              <i class="bx bx-trash"></i>
            </div>
          </div>

          <Link to={`/admin/add-teacher/${schoolId}`}>
            {" "}
            <button className="cta_button">Add Teacher</button>
          </Link>
        </div>
      </div>

      <div className="publish__course-details">
        <div className="content__card-full-length"></div>
        <div className="cards">
          <table className="content__card-table">
            <tbody>
              <tr>
                <th className="content__table-col-heading">S.No.</th>
                <th className="content__table-col-heading">Name</th>
                <th className="content__table-col-heading">Email</th>
                <th className="content__table-col-heading">Birthdate</th>
                {/* <th className="content__table-col-heading">Classes</th>
                <th className="content__table-col-heading">Subjects</th> */}
                <th className="content__table-col-heading">Contact info</th>
                <th className="content__table-col-heading">SAP ID</th>
                <th className="content__table-col-heading"></th>
              </tr>

              {teachersData &&
                teachersData.map((teacher, index) => (
                  <tr
                    key={teacher.user_id}
                    className="content__table"
                    // onClick={() => handleRowClick(teacher.user_id)}
                    style={{ cursor: "pointer" }} // Add this style to show the pointer cursor
                  >
                    <td className="content__table-data">{index + 1}</td>
                    <td className="content__table-data">
                      {teacher.first_name} {teacher.last_name}
                    </td>
                    {/* <td
                      className="content__table-data"
                      style={{ letterSpacing: "0.6rem" }}
                    >
                      {teacher.classes_taught}
                    </td>
                    <td 
                      className="content__table-data"
                      // style={{ letterSpacing: "0.6rem" }}
                    >
                      {teacher.subjects_taught}
                    </td> */}
                    <td className="content__table-data">{teacher.email}</td>
                    <td className="content__table-data">{teacher.birthday}</td>
                    <td className="content__table-data">
                      {teacher.contact_number}
                    </td>
                    <td className="content__table-data">{teacher.sap_id}</td>
                    <td
                      className="content__table-data"
                      style={{ fontSize: "1.2rem", position: "relative" }}
                    >
                      <div className="dropdown">
                        <i
                          className="bx bx-dots-vertical-rounded"
                          // class='bx bx-checkbox'
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
                              className="dropdown-item"
                              onClick={() => onViewDetails(teacher.user_id)}
                            >
                              View
                            </div>

                            {/* Edit option */}
                            <div
                              className="dropdown-item"
                              onClick={() => onEditTeacher(teacher.user_id)}
                            >
                              Edit
                            </div>

                            {/* Delete option */}
                            <div
                              className="dropdown-item"
                              onClick={() =>
                                onDeleteWithConfirmation(teacher.user_id)
                              }
                            >
                              Delete
                            </div>
                            {/* Confirmation modal */}
                            <ModelPopup
                              show={showDeleteConfirmation}
                              onConfirm={onDeleteTeacher}
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

export default AdminAllTeachers;
