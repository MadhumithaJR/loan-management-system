// sidebar.js

import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import '../sidebar.css'

const Sidebar = () => {
  return (

    <Menu isOpen={ true } width={ '30%' }>
      <a className="menu-item" href="/">
        Home
      </a>

      <a className="menu-item" href="/emploanview">
        View Loans
      </a>

      <a className="menu-item" href="/empviewitems">
        View Items
      </a>

      <a className="menu-item" href="/applyloan">
        Apply for Loan
      </a>

      <a className="menu-item" href="/logout">
        Logout
      </a>
      
    </Menu>
  );
};

export default Sidebar;