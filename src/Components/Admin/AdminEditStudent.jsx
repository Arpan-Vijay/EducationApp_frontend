import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "../../Styles/AdminCreateUsers.css";
import { MdOutlineModeEdit } from "react-icons/md";

const AdminEditStudent = () => {
  const navigate = useNavigate();
  const { schoolId, userId } = useParams();

  const [mentors, setMentors] = useState([]);

  const [formData, setFormData] = useState({
    // Initial form state
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    birthday: "",
    email: "",
    contactNumber: "",
    alternativeNumber: "",
    aadharCardNumber: "",
    permanentAddress: "",
    city: "",
    state: "",
    fatherName: "",
    fatherContactNumber: "",
    fatherEmail: "",
    motherName: "",
    motherContactNumber: "",
    motherEmail: "",
    guardianName: "",
    guardianContactNumber: "",
    guardianEmail: "",
    accountHolderName: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    accountType: "",
    mentorId: "",
  });

  useEffect(() => {
    // Fetch student data based on school_id and user_id when component mounts
    axios
      .get(
        `http://localhost:3001/api/fetch-student-details/${schoolId}/${userId}`
      )
      .then((res) => {
        const fetchedStudentDetails = res.data.studentDetails || {};
        console.log("Fetched Student Data:", fetchedStudentDetails);
        const student = {
          schoolId: schoolId,
          userId: userId,
          firstName: fetchedStudentDetails.first_name,
          middleName: fetchedStudentDetails.middle_name,
          lastName: fetchedStudentDetails.last_name,
          gender: fetchedStudentDetails.gender,
          birthday: fetchedStudentDetails.birthday,
          email: fetchedStudentDetails.email,
          contactNumber: fetchedStudentDetails.contact_number,
          alternativeNumber: fetchedStudentDetails.alternative_number,
          aadharCardNumber: fetchedStudentDetails.aadhar_card_number,
          permanentAddress: fetchedStudentDetails.permanent_address,
          city: fetchedStudentDetails.city,
          state: fetchedStudentDetails.state,
          fatherName: fetchedStudentDetails.father_name,
          fatherContactNumber: fetchedStudentDetails.father_contact_number,
          fatherEmail: fetchedStudentDetails.father_email,
          motherName: fetchedStudentDetails.mother_name,
          motherContactNumber: fetchedStudentDetails.mother_contact_number,
          motherEmail: fetchedStudentDetails.mother_email,
          guardianName: fetchedStudentDetails.guardian_name,
          guardianContactNumber: fetchedStudentDetails.guardian_contact_number,
          guardianEmail: fetchedStudentDetails.guardian_email,
          accountHolderName: fetchedStudentDetails.account_holder_name,
          bankName: fetchedStudentDetails.bank_name,
          accountNumber: fetchedStudentDetails.account_number,
          ifscCode: fetchedStudentDetails.ifsc_code,
          accountType: fetchedStudentDetails.account_type,
          mentorId: fetchedStudentDetails.mentor_id,
        };
        setFormData(student);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, [schoolId, userId]);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/get-mentors"
        );
        setMentors(response.data.mentors);
      } catch (error) {
        console.error("Error fetching mentors:", error.message);
      }
    };

    fetchMentors();
  }, []);

  const notify = () => toast.success("Student updated successfully!");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMentorChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      mentorId: value,
    }));
  };

  const handleUpdateStudent = (e) => {
    e.preventDefault();

    toast.dismiss();

    axios
      .put("http://localhost:3001/api/update-student", formData)
      .then((response) => {
        console.log(response.data.message);
        notify();
        navigate(`/admin/allStudents/${schoolId}`);
      })
      .catch((error) => {
        console.error("Error updating student:", error);
        toast.error("Error updating student. Please try again.", {
          duration: 4000,
        });
      });
  };

  return (
    <section className="section__padding">
      <Toaster />
      <div className="add__teacher-container">
      <div className="dashboard__header">
        <h2 className="heading-text">Update Student Information</h2>
        <div>
          <div className="buttons">
            
              <button class="cta__button" onClick={handleUpdateStudent} style={{width:'170px'}}
              >
                <MdOutlineModeEdit className="icon__text"/>
                <p class="button__text">Update Student</p>
              </button>
            
          </div>
        </div>
      </div>
        <form action="#">
          <div className="content">
            <div className="details__personal">
              <span className="title__heading">Personal Details</span>
              <div className="fields">
                <div className="input-field">
                  <label>First Name</label>
                  <input
                    type="text"
                    placeholder="Ex: John"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-field">
                  <label>Middle Name</label>
                  <input
                    type="text"
                    placeholder="Ex: Doe"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-field">
                  <label>Last Name</label>
                  <input
                    type="text"
                    placeholder="Ex: Smith"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-field">
                  <label>Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option disabled value="">
                      Select gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div className="input-field">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    name="birthday"
                    placeholder="Enter birth date"
                    value={formData.birthday}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-field">
                  <label>Email</label>
                  <input
                    type="text"
                    name="email"
                    placeholder="Ex: john.doe@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-field">
                  <label>Contact Number</label>
                  <input
                    type="number"
                    name="contactNumber"
                    placeholder="Enter mobile number"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-field">
                  <label>Alternative Contact Number</label>
                  <input
                    type="number"
                    placeholder="Enter mobile number"
                    name="alternativeNumber"
                    value={formData.alternativeNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-field">
                  <label>Aadhar Card Number</label>
                  <input
                    type="number"
                    placeholder="Enter aadhar card number"
                    name="aadharCardNumber"
                    value={formData.aadharCardNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-field">
                  <label>Mentor Name</label>
                  <select
                    name="mentorName"
                    value={formData.mentorName}
                    onChange={handleMentorChange}
                    required
                  >
                    <option value="" disabled selected>
                      Select mentor
                    </option>
                    {mentors.map((mentor) => (
                      <option key={mentor.user_id} value={mentor.user_id}>
                        {mentor.mentor_name}
                      </option>
                    ))}
                  </select>
                </div>
                
              </div>
              <div className="details__address">
                <span className="title__heading">Address Details</span>
                <div className="fields">
                  <div className="input-field">
                    <label>Permanent Address</label>
                    <input
                      type="text"
                      placeholder="Enter Address"
                      name="permanentAddress"
                      value={formData.permanentAddress}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="input-field">
                    <label>City</label>
                    <input
                      type="text"
                      placeholder="Ex: New York"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>State</label>
                    <input
                      type="text"
                      placeholder="Ex: New York"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="details__family">
                <span className="title__heading">Family Details</span>
                <div className="fields">
                  <div className="input-field">
                    <label>Father Name</label>
                    <input
                      type="text"
                      placeholder="Enter father name"
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Father Contact Number</label>
                    <input
                      type="tel"
                      placeholder="Enter contact number"
                      name="fatherContactNumber"
                      value={formData.fatherContactNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Father Email</label>
                    <input
                      type="email"
                      placeholder="Enter email"
                      name="fatherEmail"
                      value={formData.fatherEmail}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Mother Name</label>
                    <input
                      type="text"
                      placeholder="Enter mother name"
                      name="motherName"
                      value={formData.motherName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Mother Contact Number</label>
                    <input
                      type="tel"
                      placeholder="Enter contact number"
                      name="motherContactNumber"
                      value={formData.motherContactNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Mother Email</label>
                    <input
                      type="email"
                      placeholder="Enter email"
                      name="motherEmail"
                      value={formData.motherEmail}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Guardian Name</label>
                    <input
                      type="text"
                      placeholder="Enter guardian name"
                      name="guardianName"
                      value={formData.guardianName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Guardian Contact Number</label>
                    <input
                      type="tel"
                      placeholder="Enter contact number"
                      name="guardianNumber"
                      value={formData.guardianNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Guardian Email</label>
                    <input
                      type="email"
                      placeholder="Enter email"
                      name="guardianEmail"
                      value={formData.guardianEmail}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="details__account">
                <span className="title__heading">Account Details</span>
                <div className="fields">
                  <div className="input-field">
                    <label>Account Holder Name</label>
                    <input
                      type="text"
                      placeholder="Enter account number"
                      name="accountHolderName"
                      value={formData.accountHolderName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Bank Name</label>
                    <input
                      type="text"
                      placeholder="Enter bank name"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="input-field">
                    <label>Account Number</label>
                    <input
                      type="text"
                      placeholder="Enter account number"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="input-field">
                    <label>IFSC Code</label>
                    <input
                      type="text"
                      placeholder="Enter IFSC code"
                      name="ifscCode"
                      value={formData.ifscCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Account Type</label>
                    <input
                      type="text"
                      placeholder="Enter account type"
                      name="accountType"
                      value={formData.accountType}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AdminEditStudent;
