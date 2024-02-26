import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Styles/AdminHome.css";
import { useNavigate, Link } from "react-router-dom";

const AdminHome = () => {
  const [schoolData, setSchoolData] = useState([]);
  const navigate = useNavigate();

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

  const onViewSchoolDetails = (schoolId) => {
    navigate(`/admin/allSchools/${schoolId}`);
  };

  // Function to render a single school's information
  const renderSchoolInfo = (school, index) => (
    <div
    className="dashboard__container"
    // style={{border:'1px solid black'}} 
    key={index} 
    onClick={() => onViewSchoolDetails(school.school_id)}>
      <div >
        <div className="flex__row">
          <h5 className="column-heading">School Name</h5>
          <span className="column-detail">{school.school_name}</span>
        </div>
      </div>

      <div>
        <div className="flex__row">
          <h5 className="column-heading">Principal Name</h5>
          <span className="column-detail">{school.principal_name}</span>
        </div>
      </div>

      <div>
        <div className="flex__row">
          <h5 className="column-heading">Funds Deployed</h5>
          <span className="column-detail">{school.funds_deployed}</span>
        </div>
      </div>
      <div>
        <div className="flex__row">
          <h5 className="column-heading">Total Students</h5>
          <span className="column-detail">{school.total_students}</span>
        </div>
      </div>
    </div>
  );

  return (
    <section className="section__padding">
      <div className="dashboard__header">
        <h2 className="heading-text">Dashboard</h2>
        <div>
          <div className="buttons">
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
        <div className="dashboard__containers">
          {schoolData.map((school, index) => renderSchoolInfo(school, index))}
        </div>
      </div>
    </section>
  );
};

export default AdminHome;
