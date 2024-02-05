// AdminAddMentor.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
// import "../../Styles/AdminAddMentor.css";  // Adjust the CSS file path

const AdminAddMentor = () => {
  const navigate = useNavigate();
  const [mentorData, setMentorData] = useState({
    mentorFirstName: "",
    mentorMiddleName: "",
    mentorLastName: "",
    email: "",
    aadharCard: "",
    birthdate: "",
    contactNumber: "",
    alternativeContactNumber: "",
    permanentAddress: "",
    city: "",
    state: "",
  });

  const notify = () => toast.success("Mentor created successfully!");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMentorData({ ...mentorData, [name]: value });
  };

  const handleCreateMentor = (e) => {
    e.preventDefault();

    toast.dismiss();

    // Make a request to the backend to add the new mentor
    axios
      .post("http://localhost:3001/api/add-mentor", mentorData) // Use the correct API endpoint
      .then((response) => {
        console.log(response.data.message);
        notify();
        navigate("/admin/allMentors"); // Adjust the redirect route
      })
      .catch((error) => {
        console.error("Error adding mentor:", error);
        toast.error("Error adding mentor. Please try again.", {
          duration: 4000,
        });
      });
  };

  return (
    <section className="admin__add-mentor">
      <div className="admin__add-school-container">
        <div className="h-text admin__add-mentor-heading">
          Create New Mentor
        </div>
        <div className="content">
          <form action="#">
            <div className="user-details">
              <div className="input-box">
                <span className="details">First Name</span>
                <input
                  type="text"
                  placeholder="Enter"
                  name="mentorFirstName"
                  value={mentorData.mentorFirstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Middle Name</span>
                <input
                  type="text"
                  placeholder="Enter"
                  name="mentorMiddleName"
                  value={mentorData.mentorMiddleName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Last Name</span>
                <input
                  type="text"
                  placeholder="Enter"
                  name="mentorLastName"
                  value={mentorData.mentorLastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  type="text"
                  placeholder="Enter"
                  name="email"
                  value={mentorData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Aadhar Card Number</span>
                <input
                  type="text"
                  placeholder="Enter"
                  name="aadharCard"
                  value={mentorData.aadharCard}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Birthdate</span>
                <input
                  type="date"
                  placeholder="Enter"
                  name="birthdate"
                  value={mentorData.birthdate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Contact Number</span>
                <input
                  type="text"
                  placeholder="Enter"
                  name="contactNumber"
                  value={mentorData.contactNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Alternative Contact Number</span>
                <input
                  type="text"
                  placeholder="Enter"
                  name="alternativeContactNumber"
                  value={mentorData.alternativeContactNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Permanent Address</span>
                <input
                  type="text"
                  placeholder="Enter"
                  name="permanentAddress"
                  value={mentorData.permanentAddress}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">City</span>
                <input
                  type="text"
                  placeholder="Enter"
                  name="city"
                  value={mentorData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">State</span>
                <input
                  type="text"
                  placeholder="Enter"
                  name="state"
                  value={mentorData.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {/* Add similar input boxes for other mentor details */}
            </div>
            <div className="flex_right">
              <button
                className="primary_cta_button"
                onClick={handleCreateMentor}
                style={{ width: "25%" }}
              >
                Create Mentor
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </section>
  );
};

export default AdminAddMentor;
