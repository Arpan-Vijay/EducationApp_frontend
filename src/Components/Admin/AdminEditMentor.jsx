import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import "../../Styles/AdminAddSchool.css";
import { MdOutlineModeEdit } from "react-icons/md";

const AdminEditMentor = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [mentorData, setMentorData] = useState({
    userId:'',
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

  useEffect(() => {
    // Fetch mentor data based on mentor_id when component mounts
    axios
      .get(`http://localhost:3001/api/fetch-mentor-details/${userId}`)
      .then((res) => {
        const fetchedMentorDetails = res.data.mentorDetails || {};
        console.log('Fetched Mentor Data:', fetchedMentorDetails);
        const mentor = {
          userId: userId,
          mentorFirstName: fetchedMentorDetails.mentor_first_name,
          mentorMiddleName: fetchedMentorDetails.mentor_middle_name,
          mentorLastName: fetchedMentorDetails.mentor_last_name,
          email: fetchedMentorDetails.email,
          aadharCard: fetchedMentorDetails.aadhar_card,
          birthdate: fetchedMentorDetails.birthdate,
          contactNumber: fetchedMentorDetails.contact_number,
          alternativeContactNumber: fetchedMentorDetails.alternative_contact_number,
          permanentAddress: fetchedMentorDetails.permanent_address,
          city: fetchedMentorDetails.city,
          state: fetchedMentorDetails.state,
        }
        setMentorData(mentor);
      })
      .catch((error) => {
        console.error("Error fetching mentor data:", error);
      });
  }, []);

  const notify = () => toast.success("Mentor updated successfully!");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMentorData({ ...mentorData, [name]: value });
  };

  const handleUpdateMentor = (e) => {
    e.preventDefault();

    toast.dismiss();

    axios
      .put("http://localhost:3001/api/update-mentor", mentorData)
      .then((response) => {
        console.log(response.data.message);
        notify();
        navigate('/admin/allMentors');
      })
      .catch((error) => {
        console.error("Error updating mentor:", error);
        toast.error("Error updating mentor. Please try again.", { duration: 4000 });
      });
  };

  return (
    <section className="section__padding">
      <div className="admin__add-school-container">
      <div className="dashboard__header">
          <h2 className="heading-text">Update Mentor Information</h2>
          <div>
            <div className="buttons">
              <button class="cta__button" onClick={handleUpdateMentor} style={{width:'170px'}}>
                <i class="bx bx-plus icon__text"></i>
                <p class="button__text">Update Mentor</p>
              </button>
            </div>
          </div>
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
            
          </form>
        </div>
      </div>
      <Toaster />
    </section>
  );
};

export default AdminEditMentor;
