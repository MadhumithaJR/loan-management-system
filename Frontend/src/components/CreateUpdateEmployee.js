import React, { useState, useEffect } from 'react';
//import * as React from 'react';
import { useHref, useNavigate, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import EmployeeViewServices from '../services/EmployeeViewServices';

function CreateUpdateEmployee() {

    const history = useNavigate();

    const { eid } = useParams();

    //const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [designation, setDesignation] = useState('');
    const [department, setDepartment] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [doj, setDoj] = useState('');
    const [password, setPassword] = useState('');
    const [errors,setErrors]=useState('');

    console.log(eid)

    useEffect(() => {
        if (eid !== '_create') {
            EmployeeViewServices.getEmployeeById(eid).then((response) => {
                const employee = response.data;
                //setId(employee.id);
                setName(employee.name);
                setDesignation(employee.designation);
                setDepartment(employee.department);
                setGender(employee.gender);
                setDob(employee.dob);
                setDoj(employee.doj);
            });
        }
    }, []);

    const createOrUpdateEmployee = (event) => {
        event.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            if (eid === '_create') {
                const employee = { name, designation, department, gender, dob, doj, password };
                EmployeeViewServices.createEmployee(employee).then(() => {
                    history('/manage-employee');
                });
            }
            else {
                const employee = { name, designation, department, gender, dob, doj};
                EmployeeViewServices.updateEmployee(employee, eid).then(() => {
                    history('/manage-employee');
                });
            }
        }else {
        setErrors(validationErrors);
        }
    }

    // const changeIdHandler = (event) => {
    //     setId(event.target.value);
    // };

    const changeNameHandler = (event) => {
        setName(event.target.value);
    };

    const changeDesignationHandler = (event) => {
        setDesignation(event.target.value);
    };

    const changeDepartmentHandler = (event) => {
        setDepartment(event.target.value);
    };

    const changeGenderHandler = (event) => {
        setGender(event.target.value);
    };

    const changeDobHandler = (event) => {
        setDob(event.target.value);
    };

    const changeDojHandler = (event) => {
        setDoj(event.target.value);
    };

    const changePasswordHandler = (event) => {
        setPassword(event.target.value);
    };

    const cancel = () => {
        history('/manage-employee');
    };

    const getTitle = () => {
        console.log(eid)
        if (eid === '_create') {
            return <><Typography variant="h4" gutterBottom style={{
                borderRadius: 2,
                backgroundColor: "#000000",
                padding: "5px 5px",
                color: "#FFFFFF",
                fontWeight: "bold",
                fontSize: "30px"
            }}>
                Add Employee
            </Typography></>
        } else {
            return <><Typography variant="h4" gutterBottom style={{
                borderRadius: 2,
                backgroundColor: "#000000",
                padding: "5px 5px",
                color: "#FFFFFF",
                fontWeight: "bold",
                fontSize: "30px"
            }}>
                Update Employee
            </Typography></>
        }
    };

    const validateForm = () => {
        let validationErrors = {};
      
        
        if (!name) {
          validationErrors.name = 'Name is required.';
        }
          else if (!/^[a-zA-Z]*$/.test(name)) {
            validationErrors.fullname = 'Enter Alphabets Only';
          }
        if (!password && eid === '_create') {
          validationErrors.password = 'Password is required.';
        } else if ( password.length < 6  && eid === '_create') {
          validationErrors.password = 'Password must be at least 6 characters.';
        }
        
        if(!gender){
            validationErrors.gender="Gender is required."
        }
         if (!dob) {
          validationErrors.dob = 'Date of Birth is required.';
        }
        if (!doj) {
            validationErrors.doj = 'Date of Joining is required.';
          }  
        
        if (!designation) {
        validationErrors.designation = 'Designation is required.';
        }
    
        if (!department) {
        validationErrors.department = 'Department is required.';
        }
        return validationErrors;
      };

    return (
        <>
        <div>
            <br></br>
            <center>
                <Card variant='outlined' sx={{ maxWidth: 600,marginTop:'5vh', marginBottom: '10vh' }} style={{ backgroundColor: "#E5E4E2" }}>
                    <CardContent>
                        {getTitle()}
                        <br></br>
                        <form>
                            {/* <div className="form-group">
                                <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }}> Employee Id: </label>


                                <input style={{ textAlign: "center", marginTop: "10px", fontSize: '18px', fontFamily: 'monospace' }} placeholder="Employee Id" name="id" className="form-control"
                                    value={id} onChange={changeIdHandler} />
                            </div>
                            <br></br> */}
                            <div className="form-group">
                                <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }} > Employee Name: </label>
                                <input style={{ textAlign: "center", marginTop: "10px", fontSize: '18px', fontFamily: 'monospace' }} placeholder="Employee Name" name="name" className="form-control"
                                    value={name} onChange={changeNameHandler} />
                                 <p style={{color:'red',marginTop: "10px"}}>{errors.name}</p>
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }}> Department: </label>
                                <input style={{ textAlign: "center", marginTop: "10px", fontSize: '18px', fontFamily: 'monospace' }} placeholder="Department" name="department" className="form-control"
                                    value={department} onChange={changeDepartmentHandler} />
                                    <p style={{color:'red',marginTop: "10px"}}>{errors.department}</p>
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }}> Designation: </label>
                                <input style={{ textAlign: "center", marginTop: "10px", fontSize: '18px', fontFamily: 'monospace' }} placeholder="Designation" name="designation" className="form-control"
                                    value={designation} onChange={changeDesignationHandler} />
                                    <p style={{color:'red',marginTop: "10px"}}>{errors.designation}</p>
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }}> Gender: </label>
                                <select style={{ textAlign: "center", marginTop: "10px", fontSize: '18px', fontFamily: 'monospace' }} placeholder="Gender" name="gender" className="form-control"
                                value={gender} onChange={changeGenderHandler}>
                                    <option disabled={true} value=''>--Choose an Option--</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Others">Others</option>
                                </select>   
                                <p style={{color:'red',marginTop: "10px"}}>{errors.gender}</p>
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }}> Date Of Birth (DD-MM-YYYY): </label>
                                <input style={{ textAlign: "center", marginTop: "10px", fontSize: '18px', fontFamily: 'monospace' }} type='date' placeholder="Date Of Birth" name="dob" className="form-control"
                                    value={dob} onChange={changeDobHandler} />
                                    <p style={{color:'red',marginTop: "10px"}}>{errors.dob}</p>
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }}> Date Of Joining (DD-MM-YYYY): </label>
                                <input style={{ textAlign: "center", marginTop: "10px", fontSize: '18px', fontFamily: 'monospace' }} type='date' placeholder="Date Of Joining" name="doj" className="form-control"
                                    value={doj} onChange={changeDojHandler} />
                                <p style={{color:'red',marginTop: "10px"}}>{errors.doj}</p>
                            </div>
                            <br></br>

                            {
                                eid === '_create' && <div className="form-group">
                                    <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }}> Password: </label>
                                    <input  style={{ textAlign: "center", marginTop: "10px", fontSize: '18px', fontFamily: 'monospace' }} type='password' placeholder="Password" name="password" className="form-control"
                                        value={password} onChange={changePasswordHandler} />
                                        <p style={{color:'red',marginTop: "10px"}}>{errors.password}</p>
                                </div>
                            }
                            <br></br>

                            <button className="btn btn-success" onClick={createOrUpdateEmployee}>Save</button>
                            <button className="btn btn-danger" onClick={cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                        </form>
                    </CardContent>
                </Card>
            </center>


            {/* <div>
                <br></br>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="form-outline col-12 mb-4">
                            {getTitle()}
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> Employee Name: </label>
                                        <input placeholder="Employee Name" name="name" className="form-control"
                                            value={name} onChange={changeNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Department: </label>
                                        <input placeholder="Department" name="department" className="form-control"
                                            value={department} onChange={changeDepartmentHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Designation: </label>
                                        <input placeholder="Designation" name="designation" className="form-control"
                                            value={designation} onChange={changeDesignationHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Price: </label>
                                        <input placeholder="Gender" name="gender" className="form-control"
                                            value={gender} onChange={changeGenderHandler} />
                                    </div>

                                    <button className="btn btn-success" onClick={createOrUpdateEmployee}>Save</button>
                                    <button className="btn btn-danger" onClick={cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div> */}
            </div>
        </>

    );


}

export default CreateUpdateEmployee;