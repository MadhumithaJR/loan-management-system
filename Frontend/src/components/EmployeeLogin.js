import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthenticationService from "../services/EmployeeAuthenticationService";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Alert, AlertTitle, Container, Snackbar } from "@mui/material";
import { useCookies } from 'react-cookie';

const Login = (props) => {


  const history = useNavigate();
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorStatus, setErrorStatus] = useState(false)
  const [cookies, setCookie] = useCookies(['user']);

  

  useEffect(() => {
    setErrorStatus(false)
  }, [id, password])
  

  const idChangeHandler = (event) => {
    setId(event.target.value);
  }

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  }


  const submitActionHandler = async (event) => {
    event.preventDefault();

    if (!id || !password) {
      setErrorStatus(true)
      setErrorMessage('Please Enter both ID and Password')
      return;
    }
    const employee = { id, password }
    try {
      const loginSuccess = await AuthenticationService.loginEmployee(employee);
      console.log(employee)
      console.log('API responses:', loginSuccess.data);
      if (loginSuccess) {
        setSuccessMessage('Login Successful Redirecting..');
        setTimeout(() => {
          setCookie('id', id, { path: '/' });
          props.fxn(true);
          history('/employee'); //on successful login navigate to product componenets
        }, 200)
      } else {
        setErrorStatus(true)
        setErrorMessage('Invalid Email or Password');
      }

    }
    catch (error) {
      console.log('Login error:', error)
      setErrorStatus(true)
      setErrorMessage('Error Occured during Login');
    }
  };

  const handleAdminLogin = () => {
    console.log("Admin Log In Button");
    history('/admin-login');
  }
  if(cookies.id)
  {
    props.fxn(true)
    history("/employee")
  }
  else {
    return (
      <>
  
        <Container component="main" maxWidth="lg">
          <Box
            sx={{
              marginTop: 8,
            }}
          >
            <Grid container>
              <CssBaseline />
              <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                  backgroundImage: "url(https://img.freepik.com/free-vector/bank-credit-finance-management-loan-agreement-signing-mortgage-money-credit_335657-3136.jpg)",
                  backgroundRepeat: "no-repeat",
                  backgroundColor: (t) =>
                    t.palette.mode === "light"
                      ? t.palette.grey[50]
                      : t.palette.grey[900],
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
              >
                <Box
                  sx={{
                    my: 8,
                    mx: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography component="h1" variant="h5" style={{fontFamily:"serif",fontSize:"28px"}}>
                    Employee Sign In
                  </Typography>
                  <Box
                    component="form"
                    noValidate
                    onSubmit={submitActionHandler}
                    sx={{ mt: 1 }}
                  >
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="eid"
                      label="Employee Id"
                      onChange={idChangeHandler}
                      name="eid"
                      autoComplete="eid"
                      autoFocus
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      onChange={passwordChangeHandler}
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      style={{
                        borderRadius: 10,
                        backgroundColor: "#494bf5",
                        padding: "10px 20px",
                        fontSize: "15px"
                    }}
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign In
                    </Button>
  
                    {errorStatus && <center> <Alert severity="error" sx={{ width: '300px', '& .MuiAlert-message': { textAlign: "center", width: "inherit" } }}>
                      <AlertTitle>Error</AlertTitle>
                      <strong>{errorMessage}</strong></Alert></center>}
  
  
                    {/* <Alert severity="error" sx={{ width: '300px','& .MuiAlert-message':{textAlign:"center", width:"inherit"} }}>
                      <AlertTitle>Error</AlertTitle>
                      <strong>{errorMessage}</strong>
                    </Alert>
                 */}
  
                    {successMessage && <center><Alert severity="success" sx={{ width: '300px', '& .MuiAlert-message': { textAlign: "center", width: "inherit" } }}>
                      <AlertTitle>Success</AlertTitle>
                      <strong>{successMessage}</strong></Alert></center>}
                    <Button
                      onClick={handleAdminLogin}
                      fullWidth
                      variant="contained"
                      style={{
                        borderRadius: 20,
                        backgroundColor: "#e86159",
                        padding: "10px 20px",
                        fontSize: "15px"
                    }}
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Admin Sign In
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
  
  
        {/* <form onSubmit={submitActionHandler}>
                <p>
                <label>Employee ID: <input type="text" value={id} onChange={idChangeHandler}></input></label>
                </p>
  
                <p>
                <label>Password: <input type="password" value={password} onChange={passwordChangeHandler}></input></label>
                </p>
  
                <button type="submit">Login</button>
                {errorMessage && <p className='error-message'>{errorMessage}</p>}
                {successMessage && <p className='success-message'>{successMessage}</p>}
            </form> */}
      </>
    )
  }

  
};



export default Login;