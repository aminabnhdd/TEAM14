import React from "react";
import './SideNavAdmin.css'
import { Link } from "react-router-dom";
import {FaUserCog, FaFolderOpen, FaBell } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";

/*import { FaFolderCog } from "react-icons/fa6";*/
function SideNavAdmin(){
  
    return(
        <div className="side-nav">

            
            
            <Link to="" className="folder-settings">
            <FaFolderOpen className="folder-icon" />
            <div className="nav-link">
            <span className="tooltip">Folders???</span>
            </div>
            </Link>

            <Link to="" className="user-settings">
            <FaUserCog className="user-icon" />
            <div className="nav-link">
            <span className="tooltip">Settings</span>
            </div>
            </Link>

            


            <Link to="" className="notification">
            <FaBell className="notification-icon" />
            <div className="nav-link">
            <span className="tooltip">Notifications</span>
            </div>
            </Link>

            <Link to=""className="help">
            <FaQuestionCircle className="help-icon" />
            <div className="nav-link">
            <span className="tooltip">Help</span>
            </div>
            </Link>
            

        </div>
        
        
    );
}



export default SideNavAdmin;