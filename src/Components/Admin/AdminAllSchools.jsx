import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Styles/PublishCourse.css";
import { Link, useNavigate } from "react-router-dom";

const AdminAllSchools = () => {
  const navigate = useNavigate();
  const [schoolData, setSchoolData] = useState([]);

  // State to manage dropdown visibility
  const [dropdownVisible, setDropdownVisible] = useState(null);

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

  // Delete school
  const onDeleteSchool = async (schoolId) => {
    try {
      // Send a request to delete the school
      const response = await axios.delete(
        "http://localhost:3001/api/delete-school",
        {
          data: { schoolId }, // Send schoolId in the request body
        }
      );

      console.log(response.data.message);

      // Refresh the schoolData by fetching the updated data
      axios
        .get("http://localhost:3001/api/fetch-school-data")
        .then((res) => setSchoolData(res.data.schoolData || []));

      setDropdownVisible(null);
    } catch (error) {
      console.error("Error deleting school:", error);
    }
  };

  // JSX rendering of the component
  return (
    <section className="publish__course">
      <div className="publish__course-header">
        <h3 className="publish__course-heading h-text ">Schools Information</h3>
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
              <i className="bx bx-filter-alt "></i>
            </div>
          </div>
          <Link to="/admin/add-school">
            <button className="cta_button">Add School</button>
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
                <th className="content__table-col-heading">School Name</th>
                <th className="content__table-col-heading">Principal Name</th>
                <th className="content__table-col-heading">Contact Number</th>
                <th className="content__table-col-heading">Teachers Count</th>
                <th className="content__table-col-heading">Students Count</th>
                <th
                  className="content__table-col-heading"
                  style={{ position: "relative" }}
                ></th>
              </tr>
              {schoolData.map((school, index) => (
                <tr
                  key={index}
                  className="content__table"
                  // onClick={() =>
                  //   navigate(`/admin/allSchools/${school.school_id}`)
                  // }
                >
                  <td className="content__table-data">{school.school_id}</td>
                  <td className="content__table-data">{school.school_name}</td>
                  <td className="content__table-data">{school.principal_name}</td>
                  <td className="content__table-data">{school.contact_number}</td>
                  <td
                    className="content__table-data"
                    style={{ paddingLeft: "2rem" }}
                  >
                    {school.total_teachers}
                  </td>
                  <td
                    className="content__table-data"
                    style={{ paddingLeft: "2rem" }}
                  >
                    {school.total_students}
                  </td>
                  <td
                    className="content__table-data"
                    style={{ fontSize: "1.2rem", position:'relative' }}
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
                            onClick={() => onViewDetails(school.school_id)}
                          >
                            View
                          </div>

                          {/* Edit option */}
                          <div
                            className="dropdown-item"
                            onClick={() => onEditSchool(school.school_id)}
                          >
                            Edit
                          </div>

                          {/* Delete option */}
                          <div
                            className="dropdown-item"
                            onClick={() => onDeleteSchool(school.school_id)}
                            // style={{position:'absolute', border:'1px solid black', zIndex: '100'}}
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

export default AdminAllSchools;
