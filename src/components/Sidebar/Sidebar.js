import React from "react";
import { Link, Router, Switch } from "react-router-dom";
import { SidebarData } from "./SidebarData";

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
