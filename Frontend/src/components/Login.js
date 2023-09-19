import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthenticationService from "../services/AuthenticationService";

const Login = () => {

    const history=useNavigate();
    const [id, setId] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const idChangeHandler = (event) => {
        setId(event.target.value);
    }

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    }

    const submitActionHandler = async(event) => {
      event.preventDefault();

      if(!id || !password){
        setErrorMessage('Please Enter both ID or Password')
        return;
     }
     const employee={eid:id,password}
     try{
      const loginSuccess =await AuthenticationService.loginEmployee(employee);
      console.log(employee)
      console.log('API responses:',loginSuccess.data);
      if(loginSuccess){
        setSuccessMessage('Login Successful Redirecting..');
        setTimeout(()=>{
          history('/home'); //on successful login navigate to product componenets
        },200)
      }else{
        setErrorMessage('Invalid Email or Password');
      }
  
    }
    catch(error){
      console.log('Login error:', error)
      setErrorMessage('Error Occured during Login');
    }

    
    };

    return (
        <>
        <form onSubmit={submitActionHandler}>
            <p>
            <label>Employee ID: <input type="text" value={id} onChange={idChangeHandler}></input></label>
            </p>

            <p>
            <label>Password: <input type="password" value={password} onChange={passwordChangeHandler}></input></label>
            </p>

            <button type="submit">Login</button>
            {errorMessage && <p className='error-message'>{errorMessage}</p>}
            {successMessage && <p className='success-message'>{successMessage}</p>}
        </form>
        </>
    )
};



export default Login;