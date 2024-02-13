import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import avatar from "../../assets/avatar_2.png";
// import "../../Styles/AdminTeacherDetails.css";

const AdminTeacherDetails = () => {
  const { schoolId, userId } = useParams();
  const [teacherDetails, setTeacherDetails] = useState(null);
  const [file,setFile] = useState("")
  const [newImage, setNewImage] = useState(null);


  useEffect(() => {
    // Fetch teacher details for the specific school and user
    axios
      .get(
        `http://localhost:3001/api/fetch-teacher-details/${schoolId}/${userId}`
      )
      .then((response) => {
        setTeacherDetails(response.data.teacherDetails);
      })
      .catch((error) => {
        console.error("Error fetching teacher details:", error);
      });
  }, [schoolId, userId]);
  
  useEffect(() => {
    // Fetch teacher image
    axios
      .get(`http://localhost:3001/api/retrieve-profile-image/${userId}`)
      .then((response) => {
        if (response.data.dataUrl) {
          setFile(response.data.dataUrl);
        } else {
          // Set file to an empty string when the image data is empty
          setFile("");
        }
      })
      .catch((error) => {
        console.error("Error fetching teacher image:", error);
        // Set file to an empty string when an error occurs
        setFile("");
      });
  }, [schoolId, userId]);
  
  

  const replacePlaceholders = (string, dataObject) => {
    return string.replace(/{(\w+)}/g, (match, key) => dataObject[key] || "N/A");
  };


  const handleFileChange = (event) => {
    // Update state with the selected file
    setNewImage(event.target.files[0]);
  };

  const handleSaveImage = async () => {
    if (newImage) {
      // Prepare form data
      const formData = new FormData();
      formData.append("image", newImage);

      try {
        // Call update-profile-image API
        const response = await axios.put(
          `http://localhost:3001/api/update-profile-image/${userId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Log success message or handle as needed
        console.log("Image updated successfully:", response.data);

        // Refresh page or update state if necessary
        window.location.reload();
      } catch (error) {
        console.error("Error updating image:", error);
        // Handle error as needed
      }
    }
  };

  const handleDeleteImage = () => {
    // Send request to delete profile image
    axios
      .delete(`http://localhost:3001/api/delete-profile-image/${userId}`)
      .then((response) => {
        console.log("Image deleted successfully:", response.data.message);
        // Set file to an empty string after successful deletion
        setFile("");
      })
      .catch((error) => {
        console.error("Error deleting image:", error);
      });
  };

  return (
    <>
      {teacherDetails ? (
        <div className="user__info">
          <div className="user__info-container">
            <div className="user__info-card-one">
              <div className="user__profile-img">
                <img src = { file || avatar} alt="" className="image" />
                {/* {renderProfileImage()} */}
              </div>
              <button className="primary_cta_button" style={{width:'8%', height:'10%'}}  onClick={() => document.getElementById("fileInput").click()}>
                  Edit
                </button>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <button className="primary_cta_button" style={{width:'8%', height:'10%'}} onClick={handleSaveImage}>Save</button>
                <button className="primary_cta_button" style={{width:'8%', height:'10%'}} onClick={handleDeleteImage}>Delete</button>

              <div className="user__details">
              
                <div className="user__name">
                  <h2 className="h-text">
                    {replacePlaceholders("{first_name}", teacherDetails)}{" "}
                    {replacePlaceholders("{last_name}", teacherDetails)}
                  </h2>
                  <div className="location">
                    <i class="bx bx-map-pin location_pin"></i>
                    <span className="city_detail">
                      {replacePlaceholders("{city}", teacherDetails)}
                      {" , "}
                      {replacePlaceholders("{state}", teacherDetails)}
                    </span>
                  </div>
                </div>

                <div className="user__desc">
                  <p className="p-text">
                    {replacePlaceholders(
                      "School Name - {school_name}",
                      teacherDetails
                    )}
                    <span className="vertical_bar">|</span>
                  </p>

                  <p className="p-text">
                    {replacePlaceholders("SAP ID - {sap_id}", teacherDetails)}
                  </p>
                </div>
                <div className="user__desc">
                  <p className="p-text role">
                    Role : Teacher
                  </p>
                </div>
              </div>
            </div>

            <div className="user__info-card-two">
            <div className="card">
                <div className="card__heading">
                  <h3>General Information</h3>
                </div>
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Name</h3>
                    <p className="column-detail">
                    {replacePlaceholders("{first_name}", teacherDetails)}{" "}
                    {replacePlaceholders("{last_name}", teacherDetails)}
                    </p>
                  </div>
                </div>
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Father Name</h3>
                    <p className="column-detail">
                    {replacePlaceholders("{father_name}", teacherDetails)}
                    </p>
                  </div>
                </div>
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Mother Name</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{mother_name}", teacherDetails)}
                    </p>
                  </div>
                </div>
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Birthdate</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{birthday}", teacherDetails)}
                    </p>
                  </div>
                </div>
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Gender</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{gender}", teacherDetails)}
                    </p>
                  </div>
                </div>
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Aadhar Card Number</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{aadhar_card_number}", teacherDetails)}
                    </p>
                  </div>
                </div>
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Pancard Number</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{pan_card}", teacherDetails)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card__heading">
                  <h3>Contact Information</h3>
                </div>
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Email</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{email}", teacherDetails)}
                    </p>
                  </div>
                </div>
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Contact Number</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{contact_number}", teacherDetails)}
                    </p>
                  </div>
                </div>
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Alternative Contact Number</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{alternative_number}", teacherDetails)}
                    </p>
                  </div>
                </div>
                
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Permanent Address</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{permanent_address}", teacherDetails)}
                    </p>
                  </div>
                </div>
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">City</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{city}", teacherDetails)}
                    </p>
                  </div>
                </div>
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">State</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{state}", teacherDetails)}
                    </p>
                  </div>
                </div>
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Emergency Contact Name</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{emergency_contact_name}", teacherDetails)}
                    </p>
                  </div>
                </div>
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Emergency Contact Number</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{emergency_contact_number}", teacherDetails)}
                    </p>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default AdminTeacherDetails;
