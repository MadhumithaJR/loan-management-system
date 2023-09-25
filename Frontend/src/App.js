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
import CreateUpdateEmployee from './components/CreateUpdateEmployee';
import LoanView from './components/LoanView';
import CreateUpdateLoan from './components/CreateUpdateLoan';
import ItemView from './components/ItemView';
import CreateUpdateItem from './components/CreateUpdateItem';

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

        <Route path='/addEmployee/:eid' element={<CreateUpdateEmployee/>}/>
        <Route exact path="/manage-employee" element={<EmployeeView/>}/>

        <Route path='/addLoan/:lid' element={<CreateUpdateLoan/>}/>
        <Route exact path="/manage-loan" element={<LoanView/>}/>

        <Route path='/addItem/:Iid' element={<CreateUpdateItem/>}/>
        <Route exact path="/manage-item" element={<ItemView/>}/>

        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/admin" element={<Admin/>}/>
        
        <Route path="/user/:id/viewLoan" element={<ViewLoans/>}/>
        <Route path="/user/:id/viewItems" element={<ViewItems/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
