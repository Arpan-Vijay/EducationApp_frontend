import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "../../Styles/AdminCreateUsers.css";

const AdminEditTeacher = () => {
  const navigate = useNavigate();
  const { schoolId, userId } = useParams();

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
    panCard: "",
    permanentAddress: "",
    city: "",
    state: "",
    fatherName: "",
    motherName: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    // classId: "",
    // subjectId: "",
  });

  useEffect(() => {
    // Fetch teacher data based on school_id and user_id when component mounts
    axios
      .get(
        `http://localhost:3001/api/fetch-teacher-details/${schoolId}/${userId}`
      )
      .then((res) => {
        const fetchedTeacherDetails = res.data.teacherDetails || {};
        console.log("Fetched Teacher Data:", fetchedTeacherDetails);
        const teacher = {
          schoolId: schoolId,
          userId: userId,
          firstName: fetchedTeacherDetails.first_name,
          middleName: fetchedTeacherDetails.middle_name,
          lastName: fetchedTeacherDetails.last_name,
          gender: fetchedTeacherDetails.gender,
          birthday: fetchedTeacherDetails.birthday,
          email: fetchedTeacherDetails.email,
          contactNumber: fetchedTeacherDetails.contact_number,
          alternativeNumber: fetchedTeacherDetails.alternative_number,
          aadharCardNumber: fetchedTeacherDetails.aadhar_card_number,
          panCard: fetchedTeacherDetails.pan_card,
          permanentAddress: fetchedTeacherDetails.permanent_address,
          city: fetchedTeacherDetails.city,
          state: fetchedTeacherDetails.state,
          fatherName: fetchedTeacherDetails.father_name,
          motherName: fetchedTeacherDetails.mother_name,
          emergencyContactName: fetchedTeacherDetails.emergency_contact_name,
          emergencyContactNumber:
            fetchedTeacherDetails.emergency_contact_number,
        };
        setFormData(teacher);
      })
      .catch((error) => {
        console.error("Error fetching teacher data:", error);
      });
  }, [schoolId, userId]);

  const notify = () => toast.success("Teacher updated successfully!");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateTeacher = (e) => {
    e.preventDefault();

    toast.dismiss();

    axios
      .put("http://localhost:3001/api/update-teacher", formData)
      .then((response) => {
        console.log(response.data.message);
        notify();
        navigate(`/admin/allTeachers/${schoolId}`);
      })
      .catch((error) => {
        console.error("Error updating teacher:", error);
        toast.error("Error updating teacher. Please try again.", {
          duration: 4000,
        });
      });
  };

  return (
    <section>
      <Toaster />
      <div className="add__teacher-container">
        <div className="h-text admin__edit-school-heading">
          Update Teacher Information
        </div>
        <form onSubmit={handleUpdateTeacher}>
          <div className="form">
            <div className="details__personal">
              <div className="details__personal">
                <span className="title__heading">Personal Details</span>
                <div className="fields">
                  <div className="input-field">
                    <label>First Name</label>
                    <input
                      type="text"
                      placeholder="Ex: Harvey"
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
                      placeholder="Ex: Reginald"
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-field">
                    <label>Last Name</label>
                    <input
                      type="text"
                      placeholder="Ex: Spector"
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
                      placeholder="Ex: harvey.spector@email.com"
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
                    <label>Pancard Number</label>
                    <input
                      type="text"
                      placeholder="Enter pancard number"
                      name="panCard"
                      value={formData.panCard}
                      onChange={handleChange}
                      required
                    />
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
                        placeholder="Ex: Pune"
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
                        placeholder="Ex: Maharashtra"
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
                      <label>Emergency Contact Name</label>
                      <input
                        type="text"
                        placeholder="Enter contact name"
                        name="emergencyContactName"
                        value={formData.emergencyContactName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="input-field">
                      <label>Emergency Contact Number</label>
                      <input
                        type="tel"
                        placeholder="Enter number"
                        name="emergencyContactNumber"
                        value={formData.emergencyContactNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="details__school">
                  <span className="title__heading">School Details</span>
                  <div className="fields">
                    <div className="input-field">
                      <label>Class Name</label>
                      <select
                        name="className" // Use the appropriate name
                        value={formData.className}
                        onChange={handleClassesAndSubjectsChange}
                        // required
                      >
                        <option disabled value="" selected>
                          Select class
                        </option>
                        {classes.map((classItem) => (
                          <option
                            key={classItem.class_id}
                            value={classItem.class_id}
                          >
                            {classItem.class_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="input-field">
                      <label>Subject Name</label>
                      <select
                        name="subjectName" // Use the appropriate name
                        value={formData.subjectName}
                        onChange={handleClassesAndSubjectsChange}
                        // required
                      >
                        <option disabled value="" selected>
                          Select subject
                        </option>
                        {subjects.map((subject) => (
                          <option
                            key={subject.subject_id}
                            value={subject.subject_id}
                          >
                            {subject.subject_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div> */}
              </div>
              {/* <Link to={`/admin/allTeachers/${schoolId}`}> */}
              <div className="flex_right">
                <button
                  type="submit"
                  className="primary_cta_button"
                  style={{ width: "max-content" }}
                  onClick={notify}
                >
                  Update Teacher
                </button>
              </div>
              {/* </Link> */}
            </div>
          </div>
        </form>
      </div>
      <Toaster />
    </section>
  );
};

export default AdminEditTeacher;
