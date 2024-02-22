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
      className="home__school-container"
      key={index}
      onClick={() => onViewSchoolDetails(school.school_id)}
    >
      <div className="info-box">
        <p className="p-text">School Name</p>
        <span className="text">{school.school_name}</span>
      </div>
      <div className="info-box">
        <p className="p-text">Principal Name</p>
        <span className="text">{school.principal_name}</span>
      </div>
      <div className="info-box">
        <p className="p-text">Funds Deployed</p>
        <span className="text">{school.funds_deployed}</span>
      </div>
      <div className="info-box">
        <p className="p-text">Total Students</p>
        <span className="text">{school.total_students}</span>
      </div>
    </div>
  );

  return (
    <section className="admin__home">
      
      <div className="flexcontainer">
        {/* Map through schoolData and render the school information */}
        {schoolData.map((school, index) => renderSchoolInfo(school, index))}
      </div>

      {/* <div className="button flex_right" style={{marginRight:'1rem'}}>
        <Link to="/admin/add-school">
          <button className="cta_button" style={{width:'max-content'}}>Add School</button>
        </Link>
      </div> */}
    </section>
  );
};

export default AdminHome;
