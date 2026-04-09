import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import "../style/navbar.css";
import { AuthContext } from "../services/AuthProvider";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const { user } = useContext(AuthContext);

  const toggleMenu = () => {
    setOpen(!open);
  };
  // console.log("USER:", user);

  return (
    <nav className="navbar">
      <h1 className="logo">Logo</h1>

      <div className="menu-toggle" onClick={toggleMenu}>
        ☰
      </div>

      <ul className={`nav-link ${open ? "active" : ""}`}>
        {!user ? (
          <>
            <li>
              <Link to="/">Signup</Link>
            </li>
            <li>
              <Link to="/Login">Login</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/List">List</Link>
            </li>
            <li>
              <Link to="/Addtask">Add Task</Link>
            </li>
            <li>
              <Link to="/Logout">Logout</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
