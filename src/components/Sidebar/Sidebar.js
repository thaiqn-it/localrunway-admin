import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/jquery/dist/jquery.min.js";

export default function Sidebar(props) {
  const SidebarLink = ({ item }) => {
    return (
      <>
        <Link className="nav-link" to={item.path}>
          {item.title}
        </Link>
      </>
    );
  };

  return (
    <>
      <div className="nav-wrapper">
        {SidebarData.map((item, index) => {
          return <SidebarLink item={item} key={index} />;
        })}
      </div>
    </>
  );
}
