import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../../Styles/AdminSchoolDetails.css";
import "../../Styles/AdminSchoolDetails.css";
import { MdOutlineModeEdit } from "react-icons/md";
import * as echarts from "echarts";
// import 'echarts/dist/echarts.css';

const AdminSchoolDetails = () => {
  const { schoolId } = useParams();
  const [schoolDetails, setSchoolDetails] = useState(null);

  const [userCounts, setUserCounts] = useState(null);

  const [teachersCount, setTeachersCount] = useState(null);
  const [studentsCount, setStudentsCount] = useState(null);

  const navigate = useNavigate();

  const chartRef = useRef(null);

  useEffect(() => {
    try {
      // Create an ECharts instance
      const chart = echarts.init(chartRef.current);
  
      // Define the chart options
      const option = {
        title: {
          text: "Total Users",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            type: "pie",
            radius: "50%",
            data: [
              { value: teachersCount || 0, name: "Teachers" },
              { value: studentsCount || 0, name: "Students" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
  
      // Set the options to the chart
      chart.setOption(option);
  
      // Handle click events on the pie chart
      chart.on("click", (params) => {
        const userType = params.name.toLowerCase();
        navigate(`/admin/all${userType}/${schoolId}`);
      });
  
      // Clean up the chart instance when the component is unmounted
      return () => {
        chart.dispose();
      };
    } catch (error) {
      console.error("Chart initialization error:", error);
    }
  }, [chartRef.current, teachersCount, studentsCount, navigate, schoolId]);
  

  useEffect(() => {
    // Fetch school details using schoolId
    axios
      .get(`http://localhost:3001/api/fetch-school-data/${schoolId}`)
      .then((response) => {
        setSchoolDetails(response.data.schoolDetails);
      })
      .catch((error) => {
        console.error("Error fetching school details:", error);
      });

    // Fetch user counts using schoolId
    axios
      .get(`http://localhost:3001/api/fetch-user-counts/${schoolId}`)
      .then((response) => {
        setUserCounts(response.data.userCounts);
        setTeachersCount(response.data.userCounts.total_teachers);
        setStudentsCount(response.data.userCounts.total_students);
      })
      .catch((error) => {
        console.error("Error fetching user counts:", error);
      });
  }, [schoolId]);

  const data = [
    { columnName: "School Name", columnKey: "school_name" },
    { columnName: "School Address", columnKey: "school_address" },
    {
      columnName: "School Document Number",
      columnKey: "school_document_number",
    },
    { columnName: "Principal Name", columnKey: "principal_name" },
    { columnName: "City", columnKey: "city" },
    { columnName: "State", columnKey: "state" },
    { columnName: "Zip Code", columnKey: "zip_code" },
    { columnName: "Contact Number", columnKey: "contact_number" },
    { columnName: "Alternative Number", columnKey: "alternative_number" },
    { columnName: "Funds Deployed", columnKey: "funds_deployed" },
  ];

  const replacePlaceholders = (string, dataObject) => {
    return string.replace(/{(\w+)}/g, (match, key) => dataObject[key] || "N/A");
  };

  // Edit school details
  // Edit school details
  const onEditSchool = (schoolId) => {
    navigate(`/admin/edit-school/${schoolId}`);
    console.log(`Editing school with ID: ${schoolId}`);
  };

  return (
    <section className="section__padding">
      <div className="dashboard__header">
        <h2 className="heading-text">School Information</h2>
        <div>
          <div className="buttons">
            <button
              class="cta__button"
              onClick={() => onEditSchool(schoolId)}
              style={{ width: "150px" }}
            >
              <MdOutlineModeEdit className="icon__text" />
              <p class="button__text">Edit School</p>
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard__table">
        {schoolDetails ? (
          <>
            <div className="dashboard__left">
              <div className="dashboard__left--column">
                <div className="flex__row">
                  <h5 className="column-heading">School Name</h5>
                  <span className="column-detail">
                    {replacePlaceholders("{school_name}", schoolDetails)}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex__row">
                  <h5 className="column-heading">School Address</h5>
                  <span className="column-detail">
                    {replacePlaceholders("{school_address}", schoolDetails)}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex__row">
                  <h5 className="column-heading">City</h5>
                  <span className="column-detail">
                    {replacePlaceholders("{city}", schoolDetails)}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex__row">
                  <h5 className="column-heading">State</h5>
                  <span className="column-detail">
                    {replacePlaceholders("{state}", schoolDetails)}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex__row">
                  <h5 className="column-heading">Zip Code</h5>
                  <span className="column-detail">
                    {replacePlaceholders("{zip_code}", schoolDetails)}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex__row">
                  <h5 className="column-heading">Principal Name</h5>
                  <span className="column-detail">
                    {replacePlaceholders("{principal_name}", schoolDetails)}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex__row">
                  <h5 className="column-heading">Contact Number</h5>
                  <span className="column-detail">
                    {replacePlaceholders("{contact_number}", schoolDetails)}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex__row">
                  <h5 className="column-heading">Alternative Number</h5>
                  <span className="column-detail">
                    {replacePlaceholders("{alternative_number}", schoolDetails)}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex__row">
                  <h5 className="column-heading">School Document Number</h5>
                  <span className="column-detail">
                    {replacePlaceholders(
                      "{school_document_number}",
                      schoolDetails
                    )}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex__row">
                  <h5 className="column-heading">Funds Deployed</h5>
                  <span className="column-detail">
                    {replacePlaceholders("{funds_deployed}", schoolDetails)}
                  </span>
                </div>
              </div>
            </div>

            {/* -------- Right Side Table Content ------- */}
            <div className="dashboard__right">
              <div className="dashboard__right--top">
                <div
                  ref={chartRef}
                  style={{ width: "100%", height: "260px" }}
                />
              </div>
              <div className="dashboard__right--bottom">
                <div id="content__card-full-length">
                  <table style={{ marginBottom: "2rem" }}>
                    <thead className="table__headers">
                      <tr>
                        <th style={{ paddingLeft: "2rem" }}>User</th>
                        <th>Count</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody className="table__columns">
                      <tr>
                        <td>Teachers</td>
                        <td style={{ paddingLeft: "1rem" }}>
                          {userCounts
                            ? userCounts.total_teachers
                            : "Loading..."}
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                            fontSize: "1.2rem",
                            paddingRight: "1rem",
                          }}
                        >
                          <i
                            // className="bx bx-dots-vertical-rounded"
                            style={{
                              textTransform: "lowercase",
                              fontStyle: "normal",
                            }}
                            onClick={() =>
                              navigate(`/admin/allTeachers/${schoolId}`)
                            }
                          >
                            View
                          </i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table>
                    <thead className="table__headers">
                      <tr>
                        <th style={{ paddingLeft: "2rem" }}>User</th>
                        <th>Count</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody className="table__columns">
                      <tr>
                        <td>Students</td>
                        <td style={{ paddingLeft: "1rem" }}>
                          {userCounts
                            ? userCounts.total_students
                            : "Loading..."}
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                            fontSize: "1.2rem",
                            paddingRight: "1rem",
                          }}
                        >
                          <i
                            // className="bx bx-dots-vertical-rounded"
                            style={{
                              textTransform: "lowercase",
                              fontStyle: "normal",
                            }}
                            onClick={() =>
                              navigate(`/admin/allStudents/${schoolId}`)
                            }
                          >
                            View
                          </i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        ) : (
          <span className="column-detail">Loading...</span>
        )}
      </div>
    </section>
  );
};

export default AdminSchoolDetails;
