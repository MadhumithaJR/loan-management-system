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

const App = () => {
  const [loggedIn,setLoggedIn] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  return (
    <div className="App">
      <header>
        <h1>Loan Management App</h1>
      </header>
      {/* <section>
        <div style={{
          backgroundImage: "url(https://res.cloudinary.com/practicaldev/image/fetch/s--ddOXg3rr--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ko3w8f3icy7va6mmhx75.jpg)", backgroundSize: 'cover', backgroundRepeat: 'no-repeat', minHeight: '86vh', minWidth: '90vw'
          //backgroundImage: "url(https://media.licdn.com/dms/image/D5612AQFAMCWk7Dkvvw/article-cover_image-shrink_600_2000/0/1672904516095?e=2147483647&v=beta&t=XXctsPTRnJ5CrCa9YGPHMpkQH5hjYpaXmQf97cMZLeM)", backgroundSize: 'cover', backgroundRepeat: 'no-repeat', minHeight: '86vh', minWidth: '90vw'
          
        }}> */}
          <BrowserRouter>
            <Routes>
            {/* <Route exact path="/" element={loggedIn ? <Navigate to="/" /> : <EmployeeLogin fxn = {setLoggedIn} />}/> */}
              <Route exact path="/" element={<Home />} />
              <Route exact path="/admin-login" element={<AdminLogin fxn = {setAdminLoggedIn}/>} />
              <Route exact path="/login" element={<EmployeeLogin fxn = {setLoggedIn} />} />

              <Route path='/addEmployee/:eid' element={adminLoggedIn ? <CreateUpdateEmployee />: <AdminLogin fxn = {setAdminLoggedIn} />} />
              <Route exact path="/manage-employee" element={ adminLoggedIn ? <EmployeeView /> : <AdminLogin fxn = {setAdminLoggedIn} />} />

              <Route path='/addLoan/:lid' element={adminLoggedIn ? <CreateUpdateLoan />: <EmployeeLogin fxn = {setAdminLoggedIn} />} />
              <Route exact path="/manage-loan" element={adminLoggedIn ? <LoanView />: <AdminLogin fxn = {setAdminLoggedIn} />} />

              <Route path='/addItem/:Iid' element={adminLoggedIn ? <CreateUpdateItem />: <EmployeeLogin fxn = {setAdminLoggedIn} />} />
              <Route exact path="/manage-item" element={adminLoggedIn ? <ItemView />: <AdminLogin fxn = {setAdminLoggedIn} />} />

              <Route exact path="/register" element={loggedIn ? <Register />: <EmployeeLogin fxn = {setLoggedIn} />} />
              <Route exact path="/admin" element={adminLoggedIn ? <Admin />: <AdminLogin fxn = {setAdminLoggedIn} />} />
              <Route exact path="/employee" element={loggedIn ? <Employee />: <EmployeeLogin fxn = {setLoggedIn} />} />
              <Route exact path="/aboutus" element={loggedIn ? <AboutUs />: <EmployeeLogin fxn = {setLoggedIn} />} />
              <Route exact path="/emploanview" element={loggedIn ? <EmpViewLoans />: <EmployeeLogin fxn = {setLoggedIn} />} />
              <Route exact path="/empitemsview" element={loggedIn ? <EmpViewItems />: <EmployeeLogin fxn = {setLoggedIn} />} />
              <Route exact path="/logout" element={loggedIn ? <Logout fxn = {setLoggedIn}/>: <EmployeeLogin fxn = {setLoggedIn} />} />
              <Route path="/user/:id/viewLoan" element={loggedIn ? <ViewLoans />: <EmployeeLogin fxn = {setLoggedIn} />} />
              <Route path="/user/:id/viewItems" element={loggedIn ? <ViewItems />: <EmployeeLogin fxn = {setLoggedIn} />} />
            </Routes>
          </BrowserRouter>
        </div>
    //   </section>
    // </div>

  );
}

export default App;
