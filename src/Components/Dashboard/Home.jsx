import React from "react";
import Student from "../../assets/student.png";
import {Link} from 'react-router-dom'
import { MdOutlineFileUpload } from "react-icons/md";

const Home = () => {
  return (
    <section className="home__section">
      <div className="home__container">
        <div className="home__left">
          <div className="home__left--container">
            <h1 className="home__heading">
              <span>Improving</span> Lives <span>Through</span> Learning
            </h1>
            <p className="home__subheading">
              This platform is a global hub for online education, offering
              flexible and effective opportunities for individuals and
              organizations to acquire and share knowledge.
            </p>

            <div className="home__buttons">
            <Link to="/create-course">
              <button class="cta__button" style={{width:'170px'}}>
                <i class="bx bx-plus icon__text"></i>
                <p class="button__text">Create Course</p>
              </button>
            </Link>
            <Link to="/publish-course">
              <button class="cta__button" style={{width:'170px'}}>
              <MdOutlineFileUpload className="icon__text"/>
                <p class="button__text">Publish Course</p>
              </button>
            </Link>
            </div>

            <h3 className="sponsors__heading">Our sponsors:</h3>
            <div className="home__sponsors">
              <div className="sponsor__image"></div>
              <div className="sponsor__image"></div>
              <div className="sponsor__image"></div>
            </div>
          </div>
        </div>
        <div className="home__right">
          <div className="home__image--container">
            <img src={Student} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
