import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
const App = () => {
  return (
    <div className="App">
    <header>
      <h1>Loan Management App</h1>
      </header>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/admin-login" element={<AdminLogin/>}/>
        <Route exact path="/login" element={<EmployeeLogin/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/admin" element={<Admin/>}/>
        <Route exact path="/manage-employee" element={<EmployeeView/>}/>
        <Route path="/user/:id/viewLoan" element={<ViewLoans/>}/>
        <Route path="/user/:id/viewItems" element={<ViewItems/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
