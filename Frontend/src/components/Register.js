import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthenticationService from "../services/EmployeeAuthenticationService";

const Register = () => {
    const history=useNavigate();

    const [id, setId] = useState("")
    const [password, setPassword] = useState("")
    const [fullname, setFullname] = useState("")
    const [designation, setDesignation] = useState("")
    const [department, setDepartment] = useState("")
    const [dob, setDob] = useState("")
    const [doj, setDoj] = useState("")
    const [gender, setGender] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState();

    const idChangeHandler = (event) => {
        setId(event.target.value);
    }

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    }

    const fullnameChangeHandler = (event) => {
        setFullname(event.target.value);
    }

    const designationChangeHandler = (event) => {
        setDesignation(event.target.value);
    }

    const deptChangeHandler = (event) => {
        setDepartment(event.target.value);
    }

    const dobChangeHandler = (event) => {
        setDob(event.target.value);
    }

    const dojChangeHandler = (event) => {
        setDoj(event.target.value);
    }

    const genderChangeHandler = (event) => {
        setGender(event.target.value);
    }

    const submitActionHandler = async(event) => {
        event.preventDefault();
        const employee={
            id: id,
            password: password,
            name: fullname,
            designation: designation,
            department:department,
            dob: dob,
            doj: doj,
            gender: gender
        };
        try {
            await AuthenticationService.registerEmployee(employee);
            setSuccessMessage('Registration successful!');
            alert("Registration Successfull");
            setTimeout(() => {
                history('/login'); // navigates to Login Component
            }, 3000);
        } 
        catch (error) {
            console.error('Registration error', error);
            setErrorMessage('An error occurred during registration.');
        }
      };

    return (
        <>
        <form onSubmit={submitActionHandler}>
            <p>
            <label>Employee Id: <input type="text" value={id} onChange={idChangeHandler}></input></label>
            </p>

            <p>
            <label>Password: <input type="password" value={password} onChange={passwordChangeHandler}></input></label>
            </p>

            <p>
            <label>Full Name: <input type="text" value={fullname} onChange={fullnameChangeHandler}></input></label>
            </p>

            <p>
            <label>Designation: <input type="text" value={designation} onChange={designationChangeHandler}></input></label>
            </p>

            <p>
            <label>Department <input type="text" value={department} onChange={deptChangeHandler}></input></label>
            </p>

            <p>
            <label>Date of Birth: <input type="date" value={dob} onChange={dobChangeHandler}></input></label>
            </p>

            <p>
            <label>Date of Joining: <input type="date" value={doj} onChange={dojChangeHandler}></input></label>
            </p>

            <p>
            <label>Gender <input type="text" value={gender} onChange={genderChangeHandler}></input></label>
            </p>

            <button type="submit">Register</button>
        </form>
        </>
    )
};


export default Register;