import { useNavigate } from "react-router-dom";
import * as React from 'react';
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useCookies } from 'react-cookie';
import EmpViewLoans from "./EmpViewLoans";
import EmployeeViewServices from "../services/EmployeeViewServices";
import {Link, Outlet} from 'react-router-dom'
import Sidebar from "./Sidebar";
import ProSidebar from "./ProSidebar";

const Employee = () => {

    
    const history=useNavigate();
    const [cookies, setCookie] = useCookies(['user']);
    const [empName,setEmpName] = useState('');
    const empId = cookies.id;
    
    useEffect(() => {
      fetchEmpName();
  }, []);
  const fetchEmpName = async () => {
    try {
      EmployeeViewServices.getEmployeeById(empId).then((response) => {
            setEmpName(response.data.name);
            console.log(response.data);
        });

    } catch (error) {
        console.error('Fetch Error: ', error);
    }
}
return (
<div>

  <div className="col-lg-4 p-0" emp-sidebar>
  <ProSidebar name = {empName} id = {empId}/>
  </div>
  <div className="emp-heading ">
    <h2> Welcome, {empName} </h2>  
  </div>
 
 

    
    
    {/* <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button onClick={() => history('/emploanview')}>View Loans</Button>
      <Button onClick={() => history('/employee/two')}>Apply for Loan</Button>
      <Button onClick={() => history('/empitemsview')}>View Items Purchased</Button>
    </ButtonGroup> */}
</div>
    
);
}

export default Employee;