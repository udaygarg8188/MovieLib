import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="inner-content">
          <div className="brand">
            <Link to="/">MyWatchList</Link>
          </div>
          <div className="nav-links">
            <li>
              <Link to="/">Watch List</Link>
            </li>
            <li>
              <Link to="/watched">Watched</Link>
            </li>
            <li>
              <Link to="/add" className="btn">
                + add
              </Link>
            </li>
            
            {localStorage.getItem('auth-token')
            ?<li onClick={()=>{localStorage.removeItem('auth-token');window.location.replace("/")}} className="btn">Logout</li>
            :<Link to='/signup'><li>SignUp</li></Link>}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
