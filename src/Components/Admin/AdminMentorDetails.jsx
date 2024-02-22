import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import avatar from "../../assets/avatar_2.png";
// import "../../Styles/AdminMentorDetails.css"; // You can add or customize styles as needed

const AdminMentorDetails = () => {
  const { userId } = useParams();
  const [mentorDetails, setMentorDetails] = useState(null);

  useEffect(() => {
    // Fetch mentor details for the specific mentor
    axios
      .get(
        `http://localhost:3001/api/fetch-mentor-details/${userId}`
      )
      .then((response) => {
        setMentorDetails(response.data.mentorDetails);
      })
      .catch((error) => {
        console.error("Error fetching mentor details:", error);
      });
  }, [userId]);

  const replacePlaceholders = (string, dataObject) => {
    return string.replace(/{(\w+)}/g, (match, key) => dataObject[key] || "N/A");
  };

  return (
    <>
      {mentorDetails ? (
        <div className="user__info">
          <div className="user__info-container">
            <div className="user__info-card-one">
              <div className="user__profile-img">
                <img src={avatar} alt="" className="image" />
              </div>

              <div className="user__details">
                <div className="user__name">
                  <h2 className="h-text">
                    {replacePlaceholders("{mentor_first_name}", mentorDetails)}{" "}
                    {replacePlaceholders("{mentor_last_name}", mentorDetails)}
                  </h2>
                  <div className="location">
                    {/* Assuming mentors_info has city and state fields */}
                    <i class="bx bx-map-pin location_pin"></i>
                    <span className="city_detail">
                      {replacePlaceholders("{city}", mentorDetails)}
                      {" , "}
                      {replacePlaceholders("{state}", mentorDetails)}
                    </span>
                  </div>
                </div>

                <div className="user__desc">
                  <p className="p-text">
                    {replacePlaceholders(
                      "School Name - {school_name}",
                      mentorDetails
                    )}
                    <span className="vertical_bar">|</span>
                  </p>

                  <p className="p-text">
                    {replacePlaceholders("SAP ID - {sap_id}", mentorDetails)}
                  </p>
                </div>
                <div className="user__desc">
                  <p className="p-text role">
                    Role : Mentor
                  </p>
                </div>
              </div>
            </div>

            <div className="user__info-card-two">
              {/* Add cards and details for mentor's general and contact information */}
              {/* Similar to AdminTeacherDetails.jsx */}
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default AdminMentorDetails;
