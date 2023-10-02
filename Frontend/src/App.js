import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import AdminLogin from './components/AdminLogin';
import EmployeeLogin from './components/EmployeeLogin';
import Register from './components/Register';
import ViewLoans from './components/ViewLoans';
import ViewItems from './components/ViewItems';
import Admin from './components/Admin'
import EmployeeView from './components/EmployeeView';
import CreateUpdateEmployee from './components/CreateUpdateEmployee';
import LoanView from './components/LoanView';
import CreateUpdateLoan from './components/CreateUpdateLoan';
import ItemView from './components/ItemView';
import CreateUpdateItem from './components/CreateUpdateItem';
import Employee from './components/Employee';
import AboutUs from './components/AboutUs';
import EmpViewLoans from './components/EmpViewLoans';
import EmpViewItems from './components/EmpViewItems';
import Logout from '@mui/icons-material/Logout';
import ApplyLoan from './components/ApplyLoan';
import { useNavigate } from "react-router-dom";

import { Link } from 'react-router-dom';
const App = () => {
  const [loggedIn,setLoggedIn] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const history = useNavigate();

  const handleLoginButton = () => {
    setShowButton(!showButton);
    console.log("Log In Button");
    history('/login');
  }

  // {!loggedIn && <button class="btn btn-outline-secondary btn-light" onClick={() => <Link to="/login" />}>Login</button>}

  return (
    <div className="App">
      <div className='sticky'>
      <header className='color-1'>
        <h1>Loan Management App </h1>
      </header>
      </div>
      <div style={{marginLeft:'90vw', marginTop:'2vh'}}>
          {showButton && <button class="btn btn-outline-secondary btn-light" onClick={handleLoginButton} >
          Login
        </button> }
        </div>
      
      <section>
        <div>
        
            <Routes>
              {/* <Route exact path="/" element={loggedIn ? <Navigate to="/" /> : <EmployeeLogin fxn = {setLoggedIn} />}/> */}
              <Route exact path="/" element={<Home />} />
              <Route exact path="/admin-login" element={<AdminLogin fxn={setAdminLoggedIn} />} />
              <Route exact path="/login" element={<EmployeeLogin fxn={setLoggedIn} />} />

              <Route path='/addEmployee/:eid' element={adminLoggedIn ? <CreateUpdateEmployee /> : <AdminLogin fxn={setAdminLoggedIn} />} />
              <Route exact path="/manage-employee" element={adminLoggedIn ? <EmployeeView /> : <AdminLogin fxn={setAdminLoggedIn} />} />

              <Route path='/addLoan/:lid' element={adminLoggedIn ? <CreateUpdateLoan /> : <EmployeeLogin fxn={setAdminLoggedIn} />} />
              <Route exact path="/manage-loan" element={adminLoggedIn ? <LoanView /> : <AdminLogin fxn={setAdminLoggedIn} />} />

              <Route path='/addItem/:Iid' element={adminLoggedIn ? <CreateUpdateItem /> : <EmployeeLogin fxn={setAdminLoggedIn} />} />
              <Route exact path="/manage-item" element={adminLoggedIn ? <ItemView /> : <AdminLogin fxn={setAdminLoggedIn} />} />

              <Route exact path="/register" element={loggedIn ? <Register /> : <EmployeeLogin fxn={setLoggedIn} />} />
              <Route exact path="/admin" element={adminLoggedIn ? <Admin /> : <AdminLogin fxn={setAdminLoggedIn} />} />
              <Route exact path="/employee" element={loggedIn ? <Employee /> : <EmployeeLogin fxn={setLoggedIn} />} />
              <Route exact path="/aboutus" element={loggedIn ? <AboutUs /> : <EmployeeLogin fxn={setLoggedIn} />} />
              <Route exact path="/applyloan" element={loggedIn ? <ApplyLoan /> : <EmployeeLogin fxn={setLoggedIn} />} />
              <Route exact path="/emploanview" element={loggedIn ? <EmpViewLoans /> : <EmployeeLogin fxn={setLoggedIn} />} />
              <Route exact path="/empitemsview" element={loggedIn ? <EmpViewItems /> : <EmployeeLogin fxn={setLoggedIn} />} />
              <Route exact path="/logout" element={loggedIn ? <Logout fxn={setLoggedIn} /> : <EmployeeLogin fxn={setLoggedIn} />} />
              <Route path="/user/:id/viewLoan" element={loggedIn ? <ViewLoans /> : <EmployeeLogin fxn={setLoggedIn} />} />
              <Route path="/user/:id/viewItems" element={loggedIn ? <ViewItems /> : <EmployeeLogin fxn={setLoggedIn} />} />
            </Routes>
          
        </div>
      </section>
    </div>

  );
}

export default App;
