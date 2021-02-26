import React from "react";
import { Link, NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
      <ul>
        <li>
          <NavLink to="/signup">SignUp </NavLink>
        </li>
        <li>
          <NavLink to="/signin">Login</NavLink>
        </li>
        <li>
          <NavLink to="/email">Add your emails here</NavLink>
        </li>
      </ul>
    </>
  );
};

export default Home;
