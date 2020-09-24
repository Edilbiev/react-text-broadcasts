import React from "react";
import s from "./loader.module.css";
import icon from "./data_usage-24px.svg";
import cl from "classnames";

function Loader({ size }) {
  return (
    <img
      src={icon}
      className={cl(s.loader, {
        [s.large]: size === "large",
        [s.small]: size === "small",
      })}
      alt="loading"
    />
  );
}

export default Loader;
