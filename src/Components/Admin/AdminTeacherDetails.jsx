import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import avatar from "../../assets/avatar_2.png";
import toast, { Toaster } from "react-hot-toast";

// import "../../Styles/AdminTeacherDetails.css";

const AdminTeacherDetails = () => {
  const { schoolId, userId } = useParams();
  const [teacherDetails, setTeacherDetails] = useState(null);
  const [file, setFile] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(null);

  const dropdownRef = useRef(null);

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

  function checkImageExists(imageUrl) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve();
      image.onerror = () => reject();
      image.src = imageUrl;
    });
  }

  useEffect(() => {
    // Fetch teacher image
    axios
      .get(`http://localhost:3001/api/retrieve-profile-image/${userId}`)
      .then(async (response) => {
        const imageUrl = response.data.dataUrl;

        try {
          // Check if the image exists in the S3 bucket
          await checkImageExists(imageUrl);

          // If the image exists, set the file state
          setFile(imageUrl);
        } catch (error) {
          // If the image doesn't exist, set the file state to the default image
          setFile(avatar);
        }
      })
      .catch((error) => {
        console.error("Error fetching teacher image:", error);
        // Set file to an empty string when an error occurs
        setFile("");
      });

    // Add a global click event listener to close the dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      // Cleanup the event listener when the component unmounts
      window.removeEventListener("click", handleClickOutside);
    };
  }, [schoolId, userId]);

  const replacePlaceholders = (string, dataObject) => {
    return string.replace(/{(\w+)}/g, (match, key) => dataObject[key] || "N/A");
  };

  const handleEditClick = () => {
    // Trigger file input click when the "edit" is clicked
    document.getElementById("fileInput").click();
  };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];

    // Check if the selected file is larger than 5 MB
    if (selectedFile.size > 5 * 1024 * 1024) {      
      toast.error("File too large, limit is 5 MB");
      return;
    }

    // Update state with the selected file
    setNewImage(selectedFile);

    // Prepare form data
    const formData = new FormData();
    formData.append("image", selectedFile);

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

      // Set file to the new image URL after a successful update
      setFile(response.data.dataUrl);
      
      // Close the dropdown or perform any other necessary UI update
      setDropdownVisible(false);
      
      window.location.reload();
 

    } catch (error) {
      console.error("Error updating image:", error);
      toast.error("Oops! Something went wrong");
      // Handle error as needed
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

        // toast.success('Image deleted successfully');
        window.location.reload();

      })
      .catch((error) => {
        console.error("Error deleting image:", error);
        toast.error("Oops! Something went wrong");
      });
  };

  return (
    <>
      {teacherDetails ? (
        <div className="user__info">
          <div className="user__info-container">
            <div className="user__info-card-one">
              <div className="user__profile-img">
                <img src={file} className="image" />
                <div className="dropdown">
                  <div
                    className="edit"
                    onClick={() => setDropdownVisible(!dropdownVisible)}
                  >
                    <i className="bx bx-edit" id="text"></i>
                    {/* <span className="text">edit</span> */}
                  </div>
                  {dropdownVisible && (
                    <div
                      className={`dropdown-content ${
                        dropdownVisible ? "showup" : "hide-pop-up"
                      }`}
                    >
                      {/* Edit option */}
                      <div
                        className="dropdown-item"
                        onClick={() => handleEditClick()}
                      >
                        Edit
                        <input
                          type="file"
                          id="fileInput"
                          style={{ display: "none" }}
                          onChange={handleFileChange}
                        />
                      </div>

                      {/* Delete option */}
                      <div
                        className="dropdown-item"
                        onClick={() => handleDeleteImage()}
                      >
                        Delete
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* <button
                className="primary_cta_button"
                style={{ width: "8%", height: "10%" }}
                onClick={handleSaveImage}
              >
                Save
              </button>
              <button
                className="primary_cta_button"
                style={{ width: "8%", height: "10%" }}
                onClick={handleDeleteImage}
              >
                Delete
              </button> */}

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
                  <p className="p-text role">Role : Teacher</p>
                </div>
              </div>
            </div>

            <div className="user__info-card-two">
              <div id="card">
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
                {/* <div className="card__information">
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
                </div> */}
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
                      {replacePlaceholders(
                        "{aadhar_card_number}",
                        teacherDetails
                      )}
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
              <div id="card">
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
                    <h3 className="column-heading">
                      Alternative Contact Number
                    </h3>
                    <p className="column-detail">
                      {replacePlaceholders(
                        "{alternative_number}",
                        teacherDetails
                      )}
                    </p>
                  </div>
                </div>

                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Permanent Address</h3>
                    <p className="column-detail">
                      {replacePlaceholders(
                        "{permanent_address}",
                        teacherDetails
                      )}
                    </p>
                  </div>
                </div>

                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Emergency Contact Name</h3>
                    <p className="column-detail">
                      {replacePlaceholders(
                        "{emergency_contact_name}",
                        teacherDetails
                      )}
                    </p>
                  </div>
                </div>
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Emergency Contact Number</h3>
                    <p className="column-detail">
                      {replacePlaceholders(
                        "{emergency_contact_number}",
                        teacherDetails
                      )}
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
