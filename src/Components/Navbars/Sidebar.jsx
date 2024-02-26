// Sidebar.jsx
import React, { useState, useEffect } from "react";
import "../../Styles/Home.css";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/logo.png";
const Sidebar = ({ children, userRole }) => {
  const [isSidebarClosed, setSidebarClosed] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const excludedRoutes = [
    "/login",
    "/verify-otp",
    "/forgotPassword",
    "/resetPassword",
  ];
  const shouldExcludeSidebar = excludedRoutes.includes(location.pathname);

  // const { schoolId, teacherId } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (!token) {
      navigate("/login");
    } else {
      // decodeToken
    }
  }, [navigate]);

  const handleSidebarToggle = () => {
    setSidebarClosed(!isSidebarClosed);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
  };

  return (
    // -------------------------------------
    <div>
      {!shouldExcludeSidebar && (
        <nav className={`sidebar ${isSidebarClosed ? "close" : ""}`}>
          <header>
            <div className="image-text">
              <span className="image">
                <img src={logo} alt="" />
              </span>
              <div className="text logo-text">
                <span className="name">Knowledge Nest</span>
                {/* <span className="profession">Web developer</span> */}
              </div>
            </div>
            <i
              className="bx bx-chevron-right toggle"
              onClick={handleSidebarToggle}
            ></i>
          </header>

          <div className="menu-bar">
            <div className="menu">
              <ul className="menu-links">
                {userRole === "teacher" && (
                  <>
                    <li>
                      <Link to="/home">
                        <i className="bx bx-home-alt icon"></i>
                        <span className="text nav-text">Home</span>
                      </Link>
                    </li>

                    <li>
                      <Link to="/courses">
                        <i className="bx bx-bar-chart-alt-2 icon"></i>
                        <span className="text nav-text">All Courses</span>
                      </Link>
                    </li>

                    <li>
                      <Link to="/publish-course">
                        <i className="bx bx-bell icon"></i>
                        <span className="text nav-text">Publish Courses</span>
                      </Link>
                    </li>

                    <li>
                      <Link to="/profile">
                        <i class="bx bx-info-circle icon"></i>
                        <span className="text nav-text">Personal Info</span>
                      </Link>
                    </li>
                  </>
                )}
                {userRole === "admin" && (
                  <>
                    <li>
                      <Link to="/admin/home">
                        <i className="bx bx-home icon"></i>
                        <span className="text nav-text">Home</span>
                      </Link>
                    </li>

                    <li>
                      <Link to="/admin/allSchools">
                        <i class="bx bxs-school icon"></i>{" "}
                        <span className="text nav-text">Schools</span>
                      </Link>
                    </li>

                    <li>
                      <Link to="/admin/allMentors">
                        <i className="bx bxs-graduation icon"></i>
                        <span className="text nav-text">Mentors</span>
                      </Link>
                    </li>

                    <li>
                      <Link to="/admin/profile">
                        <i class="bx bx-info-circle icon"></i>
                        <span className="text nav-text">Personal Info</span>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <div className="bottom-content">
              <li>
                <Link to="/help">
                  <i className="bx bx-help-circle icon"></i>
                  <span className="text nav-text">Help center</span>
                </Link>
              </li>
              <li>
                <Link to="/login" onClick={handleLogout}>
                  <i className="bx bx-log-out logout_btn icon"></i>
                  <span className="text nav-text">Logout</span>
                </Link>
              </li>
            </div>
          </div>
        </nav>
      )}
      <section className="home">{children}</section>
    </div>
  );
};

export default Sidebar;
