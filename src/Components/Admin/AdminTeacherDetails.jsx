import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import avatar from "../../assets/avatar_2.png";
import toast, { Toaster } from "react-hot-toast";
import { MdOutlineModeEdit } from "react-icons/md";
// import "../../Styles/AdminteacherDetails.css";

// import "../../Styles/AdminTeacherDetails.css";

const AdminTeacherDetails = () => {
  const { schoolId, userId } = useParams();
  const navigate = useNavigate();
  const [teacherDetails, setTeacherDetails] = useState({});
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
    return string.replace(
      /{(\w+)}/g,
      (match, key) => (dataObject && dataObject[key]) || "N/A"
    );
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

  const onEditTeacher = (userId) => {
    navigate(`/admin/edit-teacher/${schoolId}/${userId}`);
  };

  return (
    <div className="section__padding">
      <div className="dashboard__header">
        <h2 className="heading-text">Teacher Information</h2>
        <div>
          <div className="buttons">
            <button
              class="cta__button"
              onClick={() => onEditTeacher(userId)}
              style={{ width: "150px" }}
            >
              <MdOutlineModeEdit className="icon__text" />
              <p class="button__text">Edit Teacher</p>
            </button>
          </div>
        </div>
      </div>
      <div className="dashboard__table">
        <div className="profile__container">
          <div className="image__container">
            <img src={file || avatar} className="image" />
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

          <div className="user__information">
            <h5>
              {replacePlaceholders("{first_name}", teacherDetails)}{" "}
              {replacePlaceholders("{last_name}", teacherDetails)}
            </h5>
            <h5>
              {" "}
              {replacePlaceholders(
                "School Name - {school_name}",
                teacherDetails
              )}
            </h5>
            <h5>{replacePlaceholders("SAP ID - {sap_id}", teacherDetails)}</h5>
            <h5>Role - Teacher</h5>
          </div>
        </div>

        <div className="user__information--container">
          <div className="user__information--container__card">
            <div className="container__heading">
              <h3 className="heading">Personal Infomation</h3>
            </div>

            <div id="dashboard__left">
              <div className="dashboard__left--column">
                <div className="flex__row">
                  <h5 className="column-heading">First Name</h5>
                  <span className="column-detail">
                    {replacePlaceholders("{first_name}", teacherDetails)}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex__row">
                  <h5 className="column-heading">Middle Name</h5>
                  <span className="column-detail">
                    {replacePlaceholders("{middle_name}", teacherDetails)}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex__row">
                  <h5 className="column-heading">Last Name</h5>
                  <span className="column-detail">
                    {replacePlaceholders("{last_name}", teacherDetails)}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex__row">
                  <h5 className="column-heading">Gender</h5>
                  <span className="column-detail">
                    {replacePlaceholders("{gender}", teacherDetails)}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex__row">
                  <h5 className="column-heading">Birthdate</h5>
                  <span className="column-detail">
                    {replacePlaceholders("{birthdate}", teacherDetails)}
                  </span>
                </div>
              </div>
              
              <div>
                <div className="flex__row">
                  <h5 className="column-heading">Aadhar Card</h5>
                  <span className="column-detail">
                    {replacePlaceholders(
                      "{aadhar_card_number}",
                      teacherDetails
                    )}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex__row">
                  <h5 className="column-heading">Pancard</h5>
                  <span className="column-detail">
                    {replacePlaceholders("{pan_card}", teacherDetails)}
                  </span>
                </div>
              </div>

              
            </div>
          </div>
          <div className="user__information--container__card">
            <div className="container__heading">
              <h3 className="heading">Address Details</h3>
            </div>

            <div id="dashboard__left">
              <div className="dashboard__left--column">
              </div>
              <div>
                <div className="flex__row">
                  <h5 className="column-heading">Permanent Address</h5>
                  <span className="column-detail">
                    {replacePlaceholders("{permanent_address}", teacherDetails)}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex__row">
                  <h5 className="column-heading">City</h5>
                  <span className="column-detail">
                    {replacePlaceholders("{city}", teacherDetails)}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex__row">
                  <h5 className="column-heading">State</h5>
                  <span className="column-detail">
                    {replacePlaceholders("{state}", teacherDetails)}
                  </span>
                </div>
              </div>
              <div>
              
              </div>
              
              <div>
                <div className="flex__row">
                  <h5 className="column-heading">Email</h5>
                  <span className="column-detail">
                    {replacePlaceholders("{email}", teacherDetails)}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex__row">
                  <h5 className="column-heading">Contact Number</h5>
                  <span className="column-detail">
                    {replacePlaceholders("{contact_number}", teacherDetails)}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex__row">
                  <h5 className="column-heading">Alternative Number</h5>
                  <span className="column-detail">
                    {replacePlaceholders(
                      "{alternative_contact_number}",
                      teacherDetails
                    )}
                  </span>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTeacherDetails;

{
}
