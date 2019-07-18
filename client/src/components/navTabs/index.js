import React from "react";
import { Link } from "react-router-dom";

function NavTabs() {
    return (
        <nav className="navbar">
            <div className="navbar-item">
                <Link to="/" className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}>
                    Initiative
        </Link>
            </div>
            <div className="navbar-item">
                <Link
                    to="/hue"
                    className={window.location.pathname === "/hue" ? "nav-link active" : "nav-link"}
                >
                    Philips Hue
        </Link>
            </div>
        </nav>
    );
}

export default NavTabs;
