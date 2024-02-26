import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "../../Styles/UserProfile.css";
import { useParams, useNavigate } from "react-router-dom";
import avatar from "../../assets/avatar_2.png";
import toast, { Toaster } from "react-hot-toast";
import { MdOutlineModeEdit } from "react-icons/md";

const AdminDetails = () => {
    const { userId } = useParams();
  const [decodedToken, setDecodedToken] = useState(null);
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(null);

  function checkImageExists(imageUrl) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve();
      image.onerror = () => reject();
      image.src = imageUrl;
    });
  }

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

  useEffect(() => {
    // Fetch and decode the token when the component mounts
    const token = localStorage.getItem("auth");
    if (token) {
      const decoded = jwtDecode(token);
      setDecodedToken(decoded);
    }
  }, []);

  const data = [
    // { columnName: 'School Id', columnKey: 'School_ID' },
    { columnName: "SAP ID", columnKey: "sap_id" },
    { columnName: "School Name", columnKey: "school_name" },
    { columnName: "First Name", columnKey: "first_name" },
    { columnName: "Last Name", columnKey: "last_name" },
    { columnName: "Birthday", columnKey: "birthday" },
    { columnName: "Father Name", columnKey: "father_name" },
    { columnName: "Mother Name", columnKey: "mother_name" },
    { columnName: "Aadhar Card", columnKey: "aadhar_card" },
    { columnName: "PAN Card", columnKey: "pan_card" },
    { columnName: "Mobile Number", columnKey: "contact_number" },
    { columnName: "Email", columnKey: "email" },
    { columnName: "City", columnKey: "city" },
    { columnName: "State", columnKey: "state" },
    {
      columnName: "Alternative Mobile Number",
      columnKey: "alternative_number",
    },
    { columnName: "Permanent Address", columnKey: "permanent_address" },
    { columnName: "City", columnKey: "city" },
    { columnName: "State", columnKey: "state" },
  ];

  const replacePlaceholders = (string, dataObject) => {
    return string.replace(
      /{(\w+)}/g,
      (match, key) => (dataObject && dataObject[key]) || "N/A"
    );
  };
  const onEditMentor = (userId) => {
    navigate(`/admin/edit-mentor/${userId}`);
  };

  return (
    <>
      {decodedToken ? (
        <div className="section__padding">
          <div className="dashboard__header">
            <h2 className="heading-text">My Profile</h2>
            <div></div>
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

              <div className="user__information" style={{ width: "20%" }}>
                <h5>
                  {replacePlaceholders("{first_name}", decodedToken)}{" "}
                  {replacePlaceholders("{last_name}", decodedToken)}
                </h5>
                <h5>Role - Admin</h5>
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
                        {replacePlaceholders(
                          "{first_name}",
                          decodedToken
                        )}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex__row">
                      <h5 className="column-heading">Middle Name</h5>
                      <span className="column-detail">
                        {replacePlaceholders(
                          "{middle_name}",
                          decodedToken
                        )}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex__row">
                      <h5 className="column-heading">Last Name</h5>
                      <span className="column-detail">
                        {replacePlaceholders(
                          "{last_name}",
                          decodedToken
                        )}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex__row">
                      <h5 className="column-heading">Gender</h5>
                      <span className="column-detail">
                        {replacePlaceholders("{gender}", decodedToken)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex__row">
                      <h5 className="column-heading">Birthdate</h5>
                      <span className="column-detail">
                        {replacePlaceholders("{birthdate}", decodedToken)}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex__row">
                      <h5 className="column-heading">Aadhar Card</h5>
                      <span className="column-detail">
                        {replacePlaceholders("{aadhar_card}", decodedToken)}
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
                  <div className="dashboard__left--column"></div>
                  <div>
                    <div className="flex__row">
                      <h5 className="column-heading">Permanent Address</h5>
                      <span className="column-detail">
                        {replacePlaceholders(
                          "{permanent_address}",
                          decodedToken
                        )}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex__row">
                      <h5 className="column-heading">City</h5>
                      <span className="column-detail">
                        {replacePlaceholders("{city}", decodedToken)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex__row">
                      <h5 className="column-heading">State</h5>
                      <span className="column-detail">
                        {replacePlaceholders("{state}", decodedToken)}
                      </span>
                    </div>
                  </div>
                  <div></div>

                  <div>
                    <div className="flex__row">
                      <h5 className="column-heading">Email</h5>
                      <span className="column-detail">
                        {replacePlaceholders("{email}", decodedToken)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex__row">
                      <h5 className="column-heading">Contact Number</h5>
                      <span className="column-detail">
                        {replacePlaceholders("{contact_number}", decodedToken)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex__row">
                      <h5 className="column-heading">Alternative Number</h5>
                      <span className="column-detail">
                        {replacePlaceholders(
                          "{alternative_contact_number}",
                          decodedToken
                        )}
                      </span>
                    </div>
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

export default AdminDetails;
