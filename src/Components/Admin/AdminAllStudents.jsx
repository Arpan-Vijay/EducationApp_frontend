
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Styles/PublishCourse.css";
import { Link, useParams, useNavigate } from "react-router-dom";

const AdminAllStudents = () => {
  const { schoolId } = useParams();
  const [studentsData, setStudentsData] = useState(null);
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(null);

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

  const onDeleteStudent = async (userId) => {
    try {
      const response = await axios.delete(
        "http://localhost:3001/api/delete-student",
        {
          data: { schoolId, userId },
        }
      );

      console.log(response.data.message);

      // Refresh the studentsData by fetching the updated data
      axios
        .get(`http://localhost:3001/api/fetch-students/${schoolId}`)
        .then((res) => setStudentsData(res.data.studentsData || []));

      setDropdownVisible(null);
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  // JSX rendering of the component
  return (
    <section className="publish__course">
      <div className="publish__course-header">
        <h3 className="publish__course-heading h-text ">
          Students Information
        </h3>

        <div className="buttons">
          <div class="container-input">
            <input
              type="text"
              placeholder="Search"
              name="text"
              class="search-input"
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
                fill-rule="evenodd"
              ></path>
            </svg>
          </div>
          <div className="icons">
            <div className="filter-icon">
              <i class="bx bx-filter-alt "></i>
            </div>
            <div className="order-icon">
              <i class="bx bx-objects-vertical-bottom"></i>
            </div>
          </div>

          <Link to={`/admin/add-student/${schoolId}`}>
            {" "}
            <button className="cta_button">Add Student</button>
          </Link>
        </div>
      </div>

      <div className="publish__course-details">
        <div className="content__card-full-length"></div>
        <div className="cards">
          <table className="content__card-table">
            <tbody>
              <tr>
                <th className="content__table-col-heading">S. No.</th>
                <th className="content__table-col-heading">Name</th>
                <th className="content__table-col-heading">Email</th>
                <th className="content__table-col-heading">Contact Info</th>
                <th className="content__table-col-heading">SAP ID</th>
                <th className="content__table-col-heading">Aadhar Card Number</th>
                <th className="content__table-col-heading">Mentors Assigned</th>
                <th className="content__table-col-heading"></th>

              </tr>
              {studentsData &&
                studentsData.map((student,index) => (
                  <tr
                    className="content__table"
                    // onClick={() => handleRowClick(student.user_id)}
                    key={student.user_id}
                    style={{ cursor: "pointer" }}
                  >
                    <td className="content__table-data">{index + 1}</td>
                    <td className="content__table-data">
                      {student.first_name} {student.last_name}
                    </td>
                    <td className="content__table-data">
                      {student.email}
                    </td>
                    <td className="content__table-data">
                      {student.contact_number}
                    </td>
                    <td className="content__table-data">{student.sap_id}</td>
                    <td className="content__table-data">{student.aadhar_card_number}</td>
                    <td className="content__table-data">{student.mentor_first_name} {student.mentor_last_name}</td>
                    <td
                      className="content__table-data"
                      style={{ fontSize: "1.2rem" , position:'relative'}}
                    >
                      <div className="dropdown">
                        <i
                          className="bx bx-dots-vertical-rounded"
                          onClick={() => setDropdownVisible(index)}
                        ></i>
                        {dropdownVisible === index && (
                          <div className={`dropdown-content ${dropdownVisible === index ? 'show-pop-up' : 'hide-pop-up'}`}>
                            {/* View option */}
                            <div
                              className="dropdown-item"
                              onClick={() => onViewDetails(student.user_id)}
                            >
                              View
                            </div>

                            {/* Edit option */}
                            <div
                              className="dropdown-item"
                              onClick={() => onEditStudent(student.user_id)}
                            >
                              Edit
                            </div>

                            {/* Delete option */}
                            <div
                              className="dropdown-item"
                              onClick={() => onDeleteStudent(student.user_id)}
                            >
                              Delete
                            </div>
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

export default AdminAllStudents;
