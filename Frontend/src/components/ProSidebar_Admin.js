import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CategoryIcon from '@mui/icons-material/Category';
import AddCardIcon from '@mui/icons-material/AddCard';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { style } from "@mui/system";

const ProSidebar = ({name}) => {

  const { collapseSidebar } = useProSidebar();

  return (
    <div style={({ height: "100vh" }, { display: "flex", position:'fixed'  })}>
      <Sidebar style={{ height: "100vh" }}>
        <Menu>
          <MenuItem
            style={{ textAlign: "left", height:'10vh' , marginTop:'3vh'}}
          >
            {" "}
            <h6 style={{fontFamily:"monospace", fontSize:'1.3rem', marginLeft:'1.7vh'}}>User: {name} </h6>
          </MenuItem>
          <MenuItem component={<Link to="/admin" />} icon={<HomeOutlinedIcon /> } style={{textAlign:'left'}}>Home</MenuItem>
          <MenuItem component={<Link to="/manage-employee" />} icon={<CategoryIcon />} style={{textAlign:'left'}}>Employee Management</MenuItem>
          <MenuItem component={<Link to="/manage-loan" />} icon={<AccountBalanceIcon />} style={{textAlign:'left'}}>Loan Management</MenuItem>
          <MenuItem component={<Link to="/manage-item" />} icon={<AddCardIcon />} style={{textAlign:'left'}}>Item Management</MenuItem>
          {/* <MenuItem component={<Link to="/logout" />} icon={<LogoutIcon />} style={{textAlign:'left'}}>Log out</MenuItem> */}
        </Menu>
      </Sidebar>
    </div>
  );
};


export default ProSidebar;


