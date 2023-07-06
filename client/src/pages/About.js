import React from "react";

const About = () => {
  return (
    <main className="center-text">
      <div className="about-page">
        <h1 className="about-header">About VGS</h1>
        <p className="about-text">
          VGS is a full-stack web application built with the MERN stack,
          utilizing technologies such as React.js, Bootstrap, Redux, Google
          OAuth, and JWT. The app is designed to allow users to create and
          manage a list of their favorite video games, providing a convenient
          way to keep track of their gaming preferences.
        </p>
        <h2 className="about-heading">Technologies Used</h2>
        <p className="about-text">
          The app leverages a range of technologies to deliver its
          functionality, including:
        </p>
        <ul className="about-text">
          <li>
            React.js: The primary framework used for building the user interface
            and managing the application's state.
          </li>
          <li>
            Bootstrap: A popular CSS framework that provides responsive and
            stylish UI components, ensuring an attractive and user-friendly
            design.
          </li>
          <li>
            Redux: A state management library that enables efficient and
            centralized management of the app's data and state.
          </li>
          <li>
            Google OAuth: Integration with Google OAuth allows users to sign in
            to the app securely using their Google accounts.
          </li>
          <li>
            JWT (JSON Web Tokens): JWT is used for authentication and
            authorization, ensuring secure access to user-specific features and
            data.
          </li>
          <li>RAWG API for fetching video game data.</li>
        </ul>
        <h2 className="about-heading">Features</h2>
        <p className="about-text">VGS offers the following features:</p>
        <ul className="about-text">
          <li>
            Game search: Users can search for their favorite video games by
            title, genre, or platform, making it easy to add new entries to
            their list.
          </li>
          <li>
            Game details: Each game entry provides detailed information,
            including the title, release date, genre, and a description, helping
            users keep track of key details about their favorite games.
          </li>
          <li>
            Favorite list management: Users can add games to their favorite
            list, remove games, and update the details of existing entries,
            allowing them to curate their personalized collection.
          </li>
          <li>
            User authentication: The app utilizes Google OAuth for secure user
            authentication, ensuring that only authorized users can access and
            manage their favorite list.
          </li>
        </ul>
        <h2 className="about-heading">Future Development</h2>
        <p className="about-text">
          In the future, VGS has the following planned enhancements:
        </p>
        <ul className="about-text">
          <li>
            Social features: Users will be able to share their favorite game
            lists with friends, discover new games based on recommendations, and
            participate in gaming communities.
          </li>
        </ul>
        <h2 className="about-heading">Credits</h2>
        <p className="about-text">
          The Video Game Favorite List app was developed by Dariel Vasquez as a
          showcase of their skills and expertise in full-stack web development
          using the MERN stack and related technologies. The project would not
          have been possible without the contributions of the open-source
          community, including the creators of React.js, Bootstrap, Redux,
          Google OAuth, JWT and RAWG API.
        </p>
      </div>
    </main>
  );
};

export default About;
