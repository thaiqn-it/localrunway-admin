import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { context } from "../StateProvider/StateProvider";
import { SidebarData } from "./SidebarData";

export default function Sidebar(props) {
  const { state, dispatch } = useContext(context);

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
