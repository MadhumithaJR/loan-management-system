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
    const [cookies, setCookies] = useCookies(['id','name','department','designation']);
    const [empName,setEmpName] = useState('');
    const [empDesignation,setEmpDesignation] = useState('');
    const [empDepartment,setEmpDepartment] = useState('');

    const empId = cookies.id;
    
    useEffect(() => {
      fetchEmpName();
  }, []);
  const fetchEmpName = async () => {
    try {
      EmployeeViewServices.getEmployeeById(empId).then((response) => {
            setEmpName(response.data.name);
            setEmpDepartment(response.data.department);
            setEmpDesignation(response.data.designation);
            try {
              localStorage.setItem('name',response.data.name);
              localStorage.setItem('department',response.data.department);
              localStorage.setItem('designation',response.data.designation);
            }
            catch{
              console.log('Error in setting the local storage')
            }
            console.log(localStorage);
        });

    } catch (error) {
        console.error('Fetch Error: ', error);
    }
}
return (
<div>

  <div className="col-lg-4 p-0" emp-sidebar>
  <ProSidebar name = {empName} id = {empId} department = {empDepartment} designation = {empDesignation}/>
  </div>
  <div className="emp-heading ">
    <h2> Welcome, {empName} </h2>  
  </div>
 
 

    
    
    {/* <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button onClick={() => history('/emploanview')}>View Loans</Button>
      <Button onClick={() => history('/apply-loan')}>Apply for Loan</Button>
      <Button onClick={() => history('/empitemsview')}>View Items Purchased</Button>
    </ButtonGroup> */}
</div>
    
);
}

export default Employee;