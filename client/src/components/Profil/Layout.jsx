import React from "react";
import "../../componentsStyles/ProfilStyles/Layout.css"

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <header className="header-container">
        {/* <SearchBar />  */}
      </header>
      <main className="main">
        {children}
      </main>
    </div>
  );
};

export default Layout;



