import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Login from './components/AdminLogin';
import Register from './components/Register';
import ViewLoans from './components/ViewLoans';
import ViewItems from './components/ViewItems';
import Admin from './components/Admin'
import Employee from './components/Employee'
import AdminLogin from './components/AdminLogin';
import AdminOne from './components/AdminOne';
import AdminTwo from './components/AdminTwo';
import AdminThree from './components/AdminThree';
import EmployeeOne from './components/EmployeeOne';
import EmployeeTwo from './components/EmployeeTwo';
import EmployeeThree from './components/EmployeeThree';

const App = () => {
  return (
    <div className="App">
    <header>
      <h1>Loan Management App</h1>
      </header>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/admin/login" element={<AdminLogin/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/admin" element={<Admin/>}/>
        <Route exact path="/employee" element={<Employee/>}/>
        <Route exact path="/admin/one" element={<AdminOne/>}/>
        <Route exact path="/employee/one" element={<EmployeeOne/>}/>
        <Route exact path="/admin/two" element={<AdminTwo/>}/>
        <Route exact path="/employee/two" element={<EmployeeTwo/>}/>
        <Route exact path="/admin/three" element={<AdminThree/>}/>
        <Route exact path="/employee/three" element={<EmployeeThree/>}/>
        <Route path="/user/:id/viewLoan" element={<ViewLoans/>}/>
        <Route path="/user/:id/viewItems" element={<ViewItems/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
