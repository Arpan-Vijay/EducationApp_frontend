import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import "../../Styles/AdminAddSchool.css";

const AdminEditSchool = () => {
  const navigate = useNavigate();
  const { schoolId } = useParams();
  const [schoolData, setSchoolData] = useState({
    schoolId:'',
    schoolName: "",
    schoolAddress: "",
    city: "",
    state: "",
    zipCode: "",
    contactNumber: "",
    alternativeNumber: "",
    principalName: "",
    schoolDocumentNumber: "",
    // fundsToDeploy: "",
  });
  
  useEffect(() => {
    // Fetch school data based on school_id when component mounts
    axios
    .get(`http://localhost:3001/api/fetch-school-data/${schoolId}`)
      .then((res) => {
        const fetchedschoolDetails = res.data.schoolDetails || {};
        console.log('Fetched School Data:', fetchedschoolDetails);
        const school = {
          schoolId: schoolId,
          schoolName: fetchedschoolDetails.school_name,
          schoolAddress: fetchedschoolDetails.school_address,
          city: fetchedschoolDetails.city,
          state: fetchedschoolDetails.state,
          zipCode: fetchedschoolDetails.zip_code,
          contactNumber: fetchedschoolDetails.contact_number,
          alternativeNumber: fetchedschoolDetails.alternative_number,
          principalName: fetchedschoolDetails.principal_name,
          schoolDocumentNumber: fetchedschoolDetails.school_document_number,
          // fundsToDeploy: fetchedschoolDetails.,
        }
        setSchoolData(school);
      })
      .catch((error) => {
        console.error("Error fetching school data:", error);
      });
  }, []);

  const notify = () => toast.success("School updated successfully!");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSchoolData({ ...schoolData, [name]: value });
  };

  const handleUpdateSchool = (e) => {
    console.log('CLICKED:', handleUpdateSchool)
    e.preventDefault();

    toast.dismiss();

    axios
      .put("http://localhost:3001/api/update-school", schoolData)
      .then((response) => {
        console.log(response.data.message);
        notify();
        navigate('/admin/allSchools');
      })
      .catch((error) => {
        console.error("Error updating school:", error);
        toast.error("Error updating school. Please try again.", { duration: 4000 });
      });
  };

  return (
    <section className="admin__add-school">
      <div className="admin__add-school-container">
        <div className="h-text admin__add-school-heading">
          Update School Information
        </div>
        <div className="content">
        <form action="#">
            <div className="user-details">
              <div
                className="input-box"
                style={{ display: "block", width: "100%" }}
              >
                <span className="details">School Name</span>
                <input
                  type="text"
                  placeholder="Ex: Saint Pauls Sr. Sec. School"
                  name="schoolName"
                  value={schoolData.schoolName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div
                className="input-box"
                style={{ display: "block", width: "100%" }}
              >
                <span className="details">School Address</span>
                <input
                  type="text"
                  placeholder="Ex: 2, Church Road Behind Police Commissioner's office"
                  name="schoolAddress"
                  value={schoolData.schoolAddress}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">City</span>
                <input
                  type="text"
                  placeholder="Ex: Pune"
                  name="city"
                  value={schoolData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">State</span>
                <input
                  type="text"
                  placeholder="Ex: Maharashtra"
                  name="state"
                  value={schoolData.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Zip Code</span>
                <input
                  type="text"
                  placeholder="Ex: 411001"
                  name="zipCode"
                  value={schoolData.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input
                  type="tel"
                  placeholder="Ex: 020 2612 0757"
                  name="contactNumber"
                  value={schoolData.contactNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Alternative Number</span>
                <input
                  type="tel"
                  placeholder="Ex: 020 2612 0757"
                  name="alternativeNumber"
                  value={schoolData.alternativeNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Principal Name</span>
                <input
                  type="text"
                  placeholder="Ex: Father Mukesh Rawat"
                  name="principalName"
                  value={schoolData.principalName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">School Government Registered ID</span>
                <input
                  type="text"
                  placeholder="Ex: SCH-20220001"
                  name="schoolDocumentNumber"
                  value={schoolData.schoolDocumentNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {/* <div className="input-box">
                <span className="details">Funds to deploy</span>
                <input
                  type="text"
                  placeholder="Ex: 25,000"
                  name="fundsToDeploy"
                  value={schoolData.fundsToDeploy}
                  onChange={handleInputChange}
                  required
                />
              </div> */}
            </div>
            <div className="flex_right">
            <button
              className="primary_cta_button"
              onClick={handleUpdateSchool}
              style={{width: 'max-content'}}
            >
              Update School
            </button>
          </div>
          </form>
        </div>
      </div>
      <Toaster />
    </section>
  );
};

export default AdminEditSchool;
