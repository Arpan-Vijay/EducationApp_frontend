// AdminAllMentors.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../../Styles/PublishCourse.css";
// import { Link, useNavigate } from "react-router-dom";

// const AdminAllMentors = () => {
//   // const navigate = useNavigate();
//   const [mentorsData, setMentorsData] = useState([]);

//   useEffect(() => {
//     // Fetch mentors data when component mounts
//     axios
//       .get("http://localhost:3001/api/fetch-all-mentors-data")  
//       .then((res) => {
//         setMentorsData(res.data.mentorsData || []);
//       })
//       .catch((error) => {
//         console.error("Error fetching mentors data:", error);
//       });
//   }, []);

//   // JSX rendering of the component
//   return (
//     <section className="publish__course">
//       <div className="publish__course-header">
//         <h3 className="publish__course-heading h-text ">Mentors Information</h3>
//         <div className="buttons">
//           <div className="container-input">
//             <input
//               type="text"
//               placeholder="Search"
//               name="text"
//               className="search-input"
//             />
//             <svg
//               fill="#000000"
//               width="20px"
//               height="20px"
//               viewBox="0 0 1920 1920"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               {/* Search icon path */}
//             </svg>
//           </div>
//           <div className="icons">
//             <div className="filter-icon">
//               <i className="bx bx-filter-alt "></i>
//             </div>
//           </div>
//           <Link to="/admin/addMentor">
//             <button className="cta_button">Add Mentor</button>
//           </Link>
//         </div>
//       </div>
//       <div className="publish__course-details">
//         <div className="content__card-full-length"></div>
//         <div className="cards">
//           <table className="content__card-table">
//             <tbody>
//               <tr>
//                 <th className="content__table-col-heading">S.No.</th>
//                 <th className="content__table-col-heading">Mentor Name</th>
//                 <th className="content__table-col-heading">Email</th>
//                 <th className="content__table-col-heading">Contact Number</th>
//                 <th className="content__table-col-heading">Aadhar Card</th>
//                 {/* Add more columns as needed */}
//               </tr>
//               {mentorsData.map((mentor, index) => (
//                 <tr
//                   key={index}
//                   className="content__table"
//                   // onClick={() =>
//                   //   navigate(`/admin/allMentors/${mentor.mentor_id}`)
//                   // }
//                 >
//                   <td className="content__table-data">{index + 1}</td>
//                   <td className="content__table-data">{mentor.mentor_first_name} {mentor.mentor_last_name}</td>
//                   <td className="content__table-data">{mentor.email}</td>
//                   <td className="content__table-data">{mentor.contact_number}</td>
//                   <td className="content__table-data">{mentor.aadhar_card}</td>
//                   {/* Add more columns as needed */}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AdminAllMentors;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AdminAllMentors = () => {
  const navigate = useNavigate();
  const [mentorsData, setMentorsData] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(null);

  useEffect(() => {
    // Fetch mentors data when component mounts
    axios
      .get("http://localhost:3001/api/fetch-all-mentors-data")  
      .then((res) => {
        setMentorsData(res.data.mentorsData || []);
      })
      .catch((error) => {
        console.error("Error fetching mentors data:", error);
      });
  }, []);

  // View mentor details
  const onViewDetails = (mentorId) => {
    navigate(`/admin/allMentors/${mentorId}`);
    setDropdownVisible(null);
  };

  // Edit mentor details
  const onEditMentor = (mentorId) => {
    navigate(`/admin/edit-mentor/${mentorId}`);
    console.log(`Editing mentor with ID: ${mentorId}`);
    setDropdownVisible(null);
  };

  // Delete mentor
  const onDeleteMentor = async (mentorId) => {
    try {
      // Send a request to delete the mentor
      const response = await axios.delete(
        "http://localhost:3001/api/delete-mentor",
        {
          data: { mentorId }, // Send mentorId in the request body
        }
      );

      console.log(response.data.message);

      // Refresh the mentorsData by fetching the updated data
      axios
        .get("http://localhost:3001/api/fetch-all-mentors-data")
        .then((res) => setMentorsData(res.data.mentorsData || []));

      setDropdownVisible(null);
    } catch (error) {
      console.error("Error deleting mentor:", error);
    }
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
              {/* Search icon path */}
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
                <td className="content__table-data">{mentor.mentor_first_name} {mentor.mentor_last_name}</td>
                <td className="content__table-data">{mentor.email}</td>
                <td className="content__table-data">{mentor.contact_number}</td>
                <td className="content__table-data">{mentor.aadhar_card}</td>
                <td className="content__table-data" style={{ fontSize: "1.2rem", position:'relative' }}>
                  <div className="dropdown">
                    <i
                      className="bx bx-dots-vertical-rounded"
                      onClick={() => setDropdownVisible(index)}
                    ></i>
                    {dropdownVisible === index && (
                      <div className={`dropdown-content ${dropdownVisible === index ? 'show-pop-up' : 'hide-pop-up'}`}>
                        <div
                          className="dropdown-item"
                          onClick={() => onViewDetails(mentor.mentor_id)}
                        >
                          View
                        </div>
                        <div
                          className="dropdown-item"
                          onClick={() => onEditMentor(mentor.mentor_id)}
                        >
                          Edit
                        </div>
                        <div
                          className="dropdown-item"
                          onClick={() => onDeleteMentor(mentor.mentor_id)}
                        >
                          Delete
                        </div>
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
