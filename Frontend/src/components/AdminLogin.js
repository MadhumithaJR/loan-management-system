import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLoginService from "../services/AdminLoginService";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Alert, AlertTitle, Container } from "@mui/material";
import { useCookies } from "react-cookie";

const Login = (props) => {

  const history = useNavigate();
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['id'])


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
    const admin = { "username": id, "password": password }
    try {
      const loginSuccess = await AdminLoginService.loginAdmin(admin);
      console.log(admin)
      console.log('API responses:', loginSuccess.data);
      if (loginSuccess) {
        setSuccessMessage('Login Successful Redirecting..');
        setTimeout(() => {
          props.fxn(true);
          if (cookies.id) {
            removeCookie('id', { path: '/' });
          }
          history('/admin');
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

  const handleEmployeeLogin = () => {
    console.log("Employee Log In Button");
    history('/login');
  }

  return (
    <>
      <div>
        <br></br>
        <Button
          onClick={handleEmployeeLogin}
          fullWidth
          variant="contained"
          style={{
            borderRadius: 20,
            backgroundColor: "#e86159",
            padding: "10px 20px",
            fontSize: "15px",
            maxWidth: '7vw',
            marginLeft: '89vw',
            marginTop: '1vh'

          }}
          sx={{ mt: 3, mb: 2 }}
        >
          Employee
        </Button>
        <div style={{ marginTop: '-3vh' }}>
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
                    //backgroundImage: "url(https://defisolutions.com/wp-content/uploads/Auto-loan-risk-management-1.png)",
                    backgroundImage: "url(https://appinventiv.com/wp-content/uploads/sites/1/2022/06/How-to-build-a-loan-management-system-scaled.webp)",
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
                    <Typography component="h1" variant="h5" style={{ fontFamily: "serif", fontSize: "28px" }}>
                      Admin Sign In
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
                        id="username"
                        label="username"
                        onChange={idChangeHandler}
                        name="username"
                        autoComplete="username"
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
                          backgroundColor: "#494bf5", // #718494
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

                      {successMessage && <center><Alert severity="success" sx={{ width: '300px', '& .MuiAlert-message': { textAlign: "center", width: "inherit" } }}>
                        <AlertTitle>Success</AlertTitle>
                        <strong>{successMessage}</strong></Alert></center>}

                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </div>
      </div>
    </>
  )
};



export default Login;