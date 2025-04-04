import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logoShort from "/logoShort.png";
import logoTxt from "/logo.png";
import "./Sidebar.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faHeart,
  faBook,
  faSignOutAlt,
  faBars,
  faChevronLeft,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";

function SidebarItem({
  icon,
  text,
  active,
  expanded,
  path,
  splMargin,
  loggedOut,
}) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const iconStyle = {
    marginLeft: expanded
      ? ""
      : windowWidth <= 1125 && !splMargin
      ? "8px"
      : windowWidth <= 1125 && splMargin
      ? "6.5px"
      : splMargin
      ? "8.25px"
      : "10.25px",
    flex: expanded ? 1 : "",
  };

  return (
    <NavLink
      to={path}
      className={`sidebar-item ${active ? "active" : ""}
      ${expanded ? "expanded" : "collapsed"}`}
      end={true}
      onClick={() => {
        if (loggedOut) {
          localStorage.clear();
          navigate("/");
          toast.success("Logout Successful");
        }
      }}>
      {" "}
      <FontAwesomeIcon icon={icon} className="icon" style={iconStyle} />
      <span
        className="item-text"
        style={{
          marginLeft: expanded ? "6px" : "",
          flex: expanded ? 6 : 0,
          transform: expanded ? "translateX(0%)" : "translateX(-100%)",
          opacity: expanded ? 1 : 0,
        }}>
        {text}
      </span>
    </NavLink>
  );
}

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const iconStyle = {
    marginLeft: expanded ? "" : windowWidth <= 1125 ? "3.5px" : "8px",
    flex: expanded ? 1 : "",
  };

  const collapsedShortMobileLogo = {
    marginLeft: expanded ? "" : windowWidth <= 835 ? "10px" : "0px",
  };

  return (
    <>
      <aside className={`sidebar ${expanded ? "expanded" : "collapsed"}`}>
        <nav className="sidebar-nav">
          <div className="sidebar-header">
            <img
              src={expanded ? logoShort : logoShort}
              className={expanded ? "logo-short" : "logo-short"}
              style={collapsedShortMobileLogo}
              alt="Logo"
            />
            <img
              src={logoTxt}
              className={expanded ? "logo-txt" : "logo-txt"}
              alt="LogoTxt"
            />
          </div>
          <div className="sidebar-menu">
            <button
              className={`sidebar-item ${expanded ? "expanded" : "collapsed"}`}
              style={{
                border: "none",
                outline: "none",
              }}
              onClick={toggleSidebar}>
              <FontAwesomeIcon
                icon={expanded ? faChevronLeft : faBars}
                className="icon"
                style={
                  (iconStyle,
                  {
                    marginLeft: expanded ? "6px" : "11px",
                  })
                }
              />
              <span
                className="item-text"
                style={{
                  marginLeft: expanded ? "12px" : "",
                  flex: expanded ? 6 : 0,
                  transform: expanded ? "translateX(0%)" : "translateX(-100%)",
                  opacity: expanded ? 1 : 0,
                }}>
                {"Hide"}
              </span>
            </button>
            <SidebarItem
              path={"./"}
              icon={faHome}
              splMargin={true}
              text={"My Page"}
              expanded={expanded}
            />
            <SidebarItem
              path={"./Profile"}
              icon={faUser}
              text={"My Details"}
              expanded={expanded}
            />
            <SidebarItem
              icon={faBook}
              splMargin={true}
              path={"./enrolled"}
              text={"Lessons"}
              expanded={expanded}
            />
            {/* <SidebarItem
              icon={faBook}
              path={"./degrees"}
              text={"Degrees"}
              expanded={expanded}
            /> */}
            <SidebarItem
              path={"./marks"}
              icon={faClipboardList}
              text={"Marks"}
              expanded={expanded}
            />
          </div>
          <div className="menu-bottom">
            <SidebarItem
              icon={faSignOutAlt}
              path={"/"}
              text={"Logout"}
              expanded={expanded}
              loggedOut={true}
            />
          </div>
        </nav>
      </aside>
      {expanded && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;

// import { NavLink } from "react-router-dom";
// import logoShort from "/logoShort.png";
// import logoTxt from "/logo.png";
// import "./Sidebar.css";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faHome,
//   faUser,
//   faBook,
//   faClipboardList,
//   faSignOutAlt,
// } from "@fortawesome/free-solid-svg-icons";

// function SidebarItem({ icon, text, path, loggedOut }) {
//   const navigate = useNavigate();

//   return (
//     <NavLink
//       to={path}
//       className="sidebar-item"
//       end={true}
//       onClick={() => {
//         if (loggedOut) {
//           localStorage.clear();
//           navigate("/");
//           toast.success("Logout Successful");
//         }
//       }}>
//       <FontAwesomeIcon icon={icon} className="icon" />
//       <span className="item-text">{text}</span>
//     </NavLink>
//   );
// }

// const Sidebar = () => {
//   return (
//     <aside className="sidebar">
//       <nav className="sidebar-nav">
//         <div className="sidebar-header">
//           <img src={logoShort} className="logo-short" alt="Logo" />
//           <img src={logoTxt} className="logo-txt" alt="LogoTxt" />
//         </div>
//         <div className="sidebar-menu">
//           <SidebarItem path="./" icon={faHome} text="My Page" />
//           <SidebarItem path="./Profile" icon={faUser} text="My Details" />
//           <SidebarItem path="./enrolled" icon={faBook} text="Lessons" />
//           <SidebarItem path="./marks" icon={faClipboardList} text="Marks" />
//         </div>
//         <div className="menu-bottom">
//           <SidebarItem
//             path="/"
//             icon={faSignOutAlt}
//             text="Logout"
//             loggedOut={true}
//           />
//         </div>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;
