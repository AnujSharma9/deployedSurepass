import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './SideBar.css';

export function SideBar() {

    const navigate = useNavigate(); // Declare useNavigate at the top of the component

    const handleLogout = () => {
        navigate('/'); // Navigate to the home page
    };
    return (
        <div className="sidebar">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/billGenrator">
                        Bill Generator
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/CustomerList">
                        Customer List
                    </Link>
                </li>
            </ul>
            <button type="button" onClick={handleLogout} class="btn btn-dark" style={{marginLeft:'30px', marginTop:'500px'}}>logout</button>

        </div>
    );
}
