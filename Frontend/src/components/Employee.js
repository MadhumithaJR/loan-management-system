import { useNavigate } from "react-router-dom";
import * as React from 'react';
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useCookies } from 'react-cookie';
import EmpViewLoans from "./EmpViewLoans";
import EmployeeViewServices from "../services/EmployeeViewServices";
import { Link, Outlet } from 'react-router-dom'
import Sidebar from "./Sidebar";
import ProSidebar from "./ProSidebar";

const Employee = () => {


  const history = useNavigate();
  const [cookies, setCookies] = useCookies(['id', 'name', 'department', 'designation']);
  const [empName, setEmpName] = useState('');
  const [empDesignation, setEmpDesignation] = useState('');
  const [empDepartment, setEmpDepartment] = useState('');

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
          localStorage.setItem('name', response.data.name);
          localStorage.setItem('department', response.data.department);
          localStorage.setItem('designation', response.data.designation);
        }
        catch {
          console.log('Error in setting the local storage')
        }
        console.log(localStorage);
      });

    } catch (error) {
      console.error('Fetch Error: ', error);
    }
  }
  return (
    <>
    <center>
      <div style={{ display: 'flex' }}>
        <div className="col-lg-4 p-0" emp-sidebar>
          <ProSidebar name={empName} id={empId} department={empDepartment} designation={empDesignation} />
        </div>
        <div className="emp-heading ">
          <h2 style={{ marginLeft: '-5vw', marginTop: '5vh' }}> Hello {empName}!</h2>
          <h2 style={{ marginLeft: '-5vw', marginTop: '11vh' }}>Welcome Back</h2>
          <div style={{ display: 'flex' }}>
            <div style={{ marginLeft:'-1vw', marginTop: '42vh' }}>
              <button style={{height:'7vh', width:'8vw', border: '2px solid black',fontWeight:'bolder'}} class="btn btn-outline-secondary btn-light" >
                {empDepartment}
              </button>
            </div>
            <div style={{ marginLeft: '3vw', marginTop: '42vh'}}>
              <button style={{height:'7vh', width:'8vw',border: '2px solid black',fontWeight:'bolder'}} class="btn btn-outline-secondary btn-light" >
                {empDesignation}
              </button>
            </div>

          </div>
        </div>
        <div>
          <img src="https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg" style={{ width: '20vw', height: '40vh', borderRadius: '50%', objectFit: 'cover', marginLeft: '7vw', marginTop: '13vh' }}></img>
        </div>

      </div>
      </center>
    </>
  );
}

export default Employee;