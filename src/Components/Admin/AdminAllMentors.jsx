import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ModelPopup from "./ModalPopup";
import toast, { Toaster } from "react-hot-toast";
import { FiEye } from "react-icons/fi";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";


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
    <section className="section__padding">
      <div className="dashboard__header">
        <h2 className="heading-text">Mentors Information</h2>
        <div>
          <div className="buttons">
            <div class="searchbar">
              <div class="searchbar-wrapper">
                <div class="searchbar-left">
                  <div class="search-icon-wrapper">
                    <span class="search-icon searchbar-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                      </svg>
                    </span>
                  </div>
                </div>

                <div class="searchbar-center">
                  <div class="searchbar-input-spacer"></div>

                  <input
                    type="text"
                    class="searchbar-input"
                    maxlength="2048"
                    name="q"
                    autocapitalize="off"
                    // autocomplete="off"
                    title="Search"
                    // role="combobox"
                    placeholder="Search by school"
                  />
                </div>
              </div>
            </div>

            <Link to={`/admin/addMentor`}>
              <button class="cta__button">
                <i class="bx bx-plus icon__text"></i>
                <p class="button__text">Add Mentor</p>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="dashboard__table">
        {/* ... Same as before ... */}
        <div className="content__card-full-length cards"></div>
        
          <table>
            <thead>

              <tr className="table__headers"> 
                <th>S.No.</th>
                <th>Mentor Name</th>
                <th>Email</th>
                <th>Birthdate</th>
                <th>Contact Number</th>
                <th>Aadhar Card</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {mentorsData.map((mentor, index) => (
                <tr key={index} className="table__columns">
                  <td>{index + 1}</td>
                  <td>
                    {mentor.mentor_first_name} {mentor.mentor_last_name}
                  </td>
                  <td>{mentor.email}</td>
                  <td>{mentor.birthdate}</td>
                  <td>
                    {mentor.contact_number}
                  </td>
                  <td>{mentor.aadhar_card}</td>
                  <td
                  
                    style={{ fontSize: "1.2rem", position: "relative" }}
                  >
                    <div className="dropdown">
                      <i
                        className="bx bx-dots-horizontal-rounded"
                        id="dot"
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
                            className="dropdown-item secondary--cta__button"
                            onClick={() => onViewDetails(mentor.user_id)}
                          >
                             <FiEye class="bx bx-plus secondary--icon__text" />
                            <p class="secondary--button__text">View</p>
                          </div>
                          <div
                            className="dropdown-item secondary--cta__button"
                            onClick={() => onEditMentor(mentor.user_id)}
                          >
                              <MdOutlineModeEdit class="bx bx-plus secondary--icon__text" />
                            <p class="secondary--button__text">Edit</p>
                          </div>
                          <div
                            className="dropdown-item secondary--cta__button"
                            onClick={() => onDeleteWithConfirmation(mentor.user_id)}
                          >
                            <MdDeleteOutline class="bx bx-plus secondary--icon__text" />
                            <p class="secondary--button__text">Delete</p>
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
    </section>
  );
};

export default AdminAllMentors;
