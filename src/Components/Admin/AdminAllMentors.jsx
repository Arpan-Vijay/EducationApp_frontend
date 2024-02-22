import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ModelPopup from "./ModalPopup";
import toast, { Toaster } from "react-hot-toast";


const AdminAllMentors = () => {
  const navigate = useNavigate();
  const [mentorsData, setMentorsData] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(null);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [mentorToDelete, setMentorToDelete] = useState(null);

  useEffect(() => {
    // Fetch mentors data when component mounts
    axios
      .get("http://localhost:3001/api/fetch-all-mentors-data")
      .then((res) => {
        setMentorsData(res.data.mentorsData || []);
        // console.log('RESPONSE:', res)
      })
      .catch((error) => {
        console.error("Error fetching mentors data:", error);
      });
  }, []);

  // View mentor details
  const onViewDetails = (userId) => {
    navigate(`/admin/allMentors/${userId}`);
    setDropdownVisible(null);
  };

  // Edit mentor details
  const onEditMentor = (userId) => {
    navigate(`/admin/edit-mentor/${userId}`);
    console.log(`Editing mentor with ID: ${userId}`);
    setDropdownVisible(null);
  };

  const onDeleteWithConfirmation = (userId) => {
    setMentorToDelete(userId);
    setShowDeleteConfirmation(true);
  };

  // Delete mentor
  const onDeleteMentor = async (userId) => {
    try {
      // Send a request to delete the mentor
      const response = await axios.delete(
        "http://localhost:3001/api/delete-mentor",
        {
          data: { userId: mentorToDelete }, // Send userId in the request body
        }
      );

      console.log(response.data.message);

      // Refresh the mentorsData by fetching the updated data
      axios
        .get("http://localhost:3001/api/fetch-all-mentors-data")
        .then((res) => setMentorsData(res.data.mentorsData || []));

      setDropdownVisible(null);
      setShowDeleteConfirmation(false); 
      toast.success(" Information deleted successfully!")
    } catch (error) {
      console.error("Error deleting mentor:", error);
      toast.error("Error deleting mentor");

    }
  };

    // Cancel deletion
    const cancelDelete = () => {
      setMentorToDelete(null);
      setShowDeleteConfirmation(false);
    };

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
          <Link to="/admin/addMentor">
            <button className="cta_button">Add Mentor</button>
          </Link>
        </div>
      </div>
      <div className="publish__course-details">
        {/* ... Same as before ... */}
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
                <th className="content__table-col-heading"></th>
              </tr>
              {mentorsData.map((mentor, index) => (
                <tr key={index} className="content__table">
                  <td className="content__table-data">{index + 1}</td>
                  <td className="content__table-data">
                    {mentor.mentor_first_name} {mentor.mentor_last_name}
                  </td>
                  <td className="content__table-data">{mentor.email}</td>
                  <td className="content__table-data">
                    {mentor.contact_number}
                  </td>
                  <td className="content__table-data">{mentor.aadhar_card}</td>
                  <td
                    className="content__table-data"
                    style={{ fontSize: "1.2rem", position: "relative" }}
                  >
                    <div className="dropdown">
                      <i
                        className="bx bx-dots-vertical-rounded"
                        onClick={() => setDropdownVisible(index)}
                      ></i>
                      {dropdownVisible === index && (
                        <div
                          className={`dropdown-content ${
                            dropdownVisible === index
                              ? "show-pop-up"
                              : "hide-pop-up"
                          }`}
                        >
                          <div
                            className="dropdown-item"
                            onClick={() => onViewDetails(mentor.user_id)}
                          >
                            View
                          </div>
                          <div
                            className="dropdown-item"
                            onClick={() => onEditMentor(mentor.user_id)}
                          >
                            Edit
                          </div>
                          <div
                            className="dropdown-item"
                            onClick={() => onDeleteWithConfirmation(mentor.user_id)}
                          >
                            Delete
                          </div>
                          {/* Confirmation modal */}
                          <ModelPopup
                            show={showDeleteConfirmation}
                            onConfirm={onDeleteMentor}
                            onCancel={cancelDelete}
                          />
                        
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

export default AdminAllMentors;
