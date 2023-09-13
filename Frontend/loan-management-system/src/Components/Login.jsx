import React from "react";
import { Link } from "react-router-dom";

function Login(){
return(
    <div className="login-form-div">
        <p>Please enter your credentials</p>

        <form className="login-form">
        <div className="login-field">
                <label htmlFor="" className="form-label">Username</label>
                <input  type="text" className="form-control" required />
        </div>
        <div className="mb-3 login-field">
                <label htmlFor="" className="form-label">Password</label>
                <input  type="password" className="form-control" required />  
        </div>
        <br />
            <button  type="submit" className="btn btn-primary submit-btn">Sign in</button>
        </form>

    </div>
)
}

export default Login;