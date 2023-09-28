import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CategoryIcon from '@mui/icons-material/Category';
import AddCardIcon from '@mui/icons-material/AddCard';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';

const ProSidebar = ({ name, id, department, designation }) => {

  const { collapseSidebar } = useProSidebar();

  return (
    <div style={({ height: "100vh" }, { display: "flex", position:'fixed'  })}>
      <Sidebar style={{ height: "100vh" }}>
        <Menu>
          <MenuItem
            style={{ textAlign: "left", height:'20vh' }}
          >
            {" "}
            <h6 style={{fontFamily:"monospace", fontSize:'1.15rem'}}>Employee id: {id} </h6>
            <h5 style={{fontFamily:"monospace", fontSize:'1.15rem'}}>Designation: {designation}</h5>
            <h5 style={{fontFamily:"monospace", fontSize:'1.15rem'}}>Department: {department}</h5>
          </MenuItem>
          <MenuItem component={<Link to="/employee" />} icon={<HomeOutlinedIcon />}>Home</MenuItem>
          <MenuItem component={<Link to="/emploanview" />} icon={<AccountBalanceIcon />}>View Loans</MenuItem>
          <MenuItem component={<Link to="/empitemsview" />} icon={<CategoryIcon />}>View Items</MenuItem>
          <MenuItem component={<Link to="/applyloan" />} icon={<AddCardIcon />}>Apply for loan</MenuItem>
          {/* <MenuItem component={<Link to="/logout" />} icon={<LogoutIcon />}>Log out</MenuItem> */}
        </Menu>
      </Sidebar>
    </div>
  );
};


export default ProSidebar;


