import React from "react";
import { RiLogoutBoxLine } from "react-icons/ri";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const NavBar = () => {

  const Navigate = useNavigate();

  const handleLogout = () => {
    swal({
      title: "Logged Out",
      text: "You Have Logged Out Successfully",
      icon: "success",
    });
    localStorage.clear();
    Navigate('/');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            Goals
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/Home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/AddGoal">
                  Add Goal
                </Link>
              </li>
            </ul>
            <div className="d-flex align-items-center">
              <RiLogoutBoxLine 
                onClick={handleLogout} 
                style={{ cursor: 'pointer' }} 
                size={30} 
                className="ms-auto" 
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
