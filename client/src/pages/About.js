import React from "react";

const About = () => {
  return (
    <main className="center-text">
      <div className="about-page">
        <h1 className="about-header">About VGS</h1>
        <p className="about-text">
          VGS is a MERN stack application that allows you to save a list of your
          favorite video games. With VGS, you can easily keep track of the games
          you love and access them at any time from any device.
        </p>
        <p className="about-text">
          {`If you have any questions or feedback, please don't hesitate to `}
          <a href="mailto:darksalamence10@gmail.com" className="about-link">
            contact me
          </a>
          .
        </p>
      </div>
    </main>
  );
};

export default About;
