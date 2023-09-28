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

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [designation, setDesignation] = useState('');
    const [department, setDepartment] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [doj, setDoj] = useState('');
    const [password, setPassword] = useState('');

    console.log(eid)

    useEffect(() => {
        if (eid !== '_create') {
            EmployeeViewServices.getEmployeeById(eid).then((response) => {
                const employee = response.data;
                setId(employee.id);
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
        

        if (eid === '_create') {
            const employee = { id, name, designation, department, gender, dob, doj, password };
            EmployeeViewServices.createEmployee(employee).then(() => {
                history('/manage-employee');
            });
        }
        else {
            const employee = { id, name, designation, department, gender, dob, doj};
            EmployeeViewServices.updateEmployee(employee, eid).then(() => {
                history('/manage-employee');
            });
        }
    }

    const changeIdHandler = (event) => {
        setId(event.target.value);
    };

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
                backgroundColor: "#FFCCCB",
                padding: "5px 5px",
                color: "#000000",
                fontWeight: "bold",
                fontSize: "30px"
            }}>
                Add Employee
            </Typography></>
        } else {
            return <><Typography variant="h4" gutterBottom style={{
                borderRadius: 2,
                backgroundColor: "#FFCCCB",
                padding: "5px 5px",
                color: "#000000",
                fontWeight: "bold",
                fontSize: "30px"
            }}>
                Update Employee
            </Typography></>
        }
    };

    return (
        <>
            <center>
                <Card variant='outlined' sx={{ maxWidth: 600, marginTop: '10vh', marginBottom: '10vh' }} style={{ backgroundColor: "#fff6f6" }}>
                    <CardContent>
                        {getTitle()}
                        <br></br>
                        <form>
                            <div className="form-group">
                                <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }}> Employee Id: </label>


                                <input style={{ textAlign: "center", marginTop: "10px", border: '2px solid #f0bebd', fontSize: '18px', fontFamily: 'monospace' }} placeholder="Employee Id" name="id" className="form-control"
                                    value={id} onChange={changeIdHandler} />
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }} > Employee Name: </label>
                                <input style={{ textAlign: "center", marginTop: "10px", border: '2px solid #f0bebd', fontSize: '18px', fontFamily: 'monospace' }} placeholder="Employee Name" name="name" className="form-control"
                                    value={name} onChange={changeNameHandler} />
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }}> Department: </label>
                                <input style={{ textAlign: "center", marginTop: "10px", border: '2px solid #f0bebd', fontSize: '18px', fontFamily: 'monospace' }} placeholder="Department" name="department" className="form-control"
                                    value={department} onChange={changeDepartmentHandler} />
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }}> Designation: </label>
                                <input style={{ textAlign: "center", marginTop: "10px", border: '2px solid #f0bebd', fontSize: '18px', fontFamily: 'monospace' }} placeholder="Designation" name="designation" className="form-control"
                                    value={designation} onChange={changeDesignationHandler} />
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }}> Gender: </label>
                                <select style={{ textAlign: "center", marginTop: "10px", border: '2px solid #f0bebd', fontSize: '18px', fontFamily: 'monospace' }} placeholder="Gender" name="gender" className="form-control"
                                value={gender} onChange={changeGenderHandler}>
                                    <option disabled={true} value=''>--Choose an Option--</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Others">Others</option>
                                </select>   
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }}> Date Of Birth (DD-MM-YYYY): </label>
                                <input style={{ textAlign: "center", marginTop: "10px", border: '2px solid #f0bebd', fontSize: '18px', fontFamily: 'monospace' }} type='date' placeholder="Date Of Birth" name="dob" className="form-control"
                                    value={dob} onChange={changeDobHandler} />
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }}> Date Of Joining (DD-MM-YYYY): </label>
                                <input style={{ textAlign: "center", marginTop: "10px", border: '2px solid #f0bebd', fontSize: '18px', fontFamily: 'monospace' }} type='date' placeholder="Date Of Joining" name="doj" className="form-control"
                                    value={doj} onChange={changeDojHandler} />
                            </div>
                            <br></br>

                            {
                                eid === '_create' && <div className="form-group">
                                    <label style={{ fontFamily: 'monospace', fontSize: '19px', fontWeight: "normal" }}> Password: </label>
                                    <input  style={{ textAlign: "center", marginTop: "10px", border: '2px solid #f0bebd', fontSize: '18px', fontFamily: 'monospace' }} type='password' placeholder="Password" name="password" className="form-control"
                                        value={password} onChange={changePasswordHandler} />
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
        </>

    );


}

export default CreateUpdateEmployee;