// AdminAllMentors.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Styles/PublishCourse.css";
import { Link, useNavigate } from "react-router-dom";

const AdminAllMentors = () => {
  // const navigate = useNavigate();
  const [mentorsData, setMentorsData] = useState([]);

  useEffect(() => {
    // Fetch mentors data when component mounts
    axios
      .get("http://localhost:3001/api/fetch-all-mentors-data")  
      .then((res) => {
        setMentorsData(res.data.mentorsData || []);
      })
      .catch((error) => {
        console.error("Error fetching mentors data:", error);
      });
  }, []);

  // JSX rendering of the component
  return (
    <section className="publish__course">
      <div className="publish__course-header">
        <h3 className="publish__course-heading h-text ">Mentors Information</h3>
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
              {/* Search icon path */}
            </svg>
          </div>
          <div className="icons">
            <div className="filter-icon">
              <i className="bx bx-filter-alt "></i>
            </div>
          </div>
          <Link to="/admin/addMentor">
            <button className="cta_button">Add Mentor</button>
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
                <th className="content__table-col-heading">Mentor Name</th>
                <th className="content__table-col-heading">Email</th>
                <th className="content__table-col-heading">Contact Number</th>
                <th className="content__table-col-heading">Aadhar Card</th>
                {/* Add more columns as needed */}
              </tr>
              {mentorsData.map((mentor, index) => (
                <tr
                  key={index}
                  className="content__table"
                  // onClick={() =>
                  //   navigate(`/admin/allMentors/${mentor.mentor_id}`)
                  // }
                >
                  <td className="content__table-data">{index + 1}</td>
                  <td className="content__table-data">{mentor.mentor_first_name} {mentor.mentor_last_name}</td>
                  <td className="content__table-data">{mentor.email}</td>
                  <td className="content__table-data">{mentor.contact_number}</td>
                  <td className="content__table-data">{mentor.aadhar_card}</td>
                  {/* Add more columns as needed */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminAllMentors;
