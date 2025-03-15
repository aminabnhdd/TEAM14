import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <nav>Searchbar</nav> 
      <aside>Sidebar</aside>
      <main>
         {children}
      </main>
    </div>
  );
};

export default Layout;

