import React from "react";
import axios from "axios";
import { cookie } from "express-validator";
const Logout = () => {
  const logout = async () => {
    const removeCookie = (key) => {
      if (window !== "undefined") {
        cookie.remove(key, { expires: 1 });
      }
    };
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true,
    })
    //remove cookie from the front
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));
    window.location = "/";
  };
  return (
    <div>
      <li onClick={logout}>
        <img src="./img/icons/logout.svg" alt="logout" />
      </li>
    </div>
  );
};

export default Logout;
