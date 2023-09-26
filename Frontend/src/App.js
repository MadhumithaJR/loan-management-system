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
import Employee from './components/Employee';

const App = () => {
  return (
    <div className="App">
      <header>
        <h1>Loan Management App</h1>
      </header>
      <section>
        <div style={{
          backgroundImage: "url(https://res.cloudinary.com/practicaldev/image/fetch/s--ddOXg3rr--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ko3w8f3icy7va6mmhx75.jpg)", backgroundSize: 'cover', backgroundRepeat: 'no-repeat', minHeight: '86vh', minWidth: '90vw'
          //backgroundImage: "url(https://media.licdn.com/dms/image/D5612AQFAMCWk7Dkvvw/article-cover_image-shrink_600_2000/0/1672904516095?e=2147483647&v=beta&t=XXctsPTRnJ5CrCa9YGPHMpkQH5hjYpaXmQf97cMZLeM)", backgroundSize: 'cover', backgroundRepeat: 'no-repeat', minHeight: '86vh', minWidth: '90vw'
          
        }}>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Home />} />

              <Route exact path="/admin-login" element={<AdminLogin />} />
              <Route exact path="/login" element={<EmployeeLogin />} />

              <Route path='/addEmployee/:eid' element={<CreateUpdateEmployee />} />
              <Route exact path="/manage-employee" element={<EmployeeView />} />

              <Route path='/addLoan/:lid' element={<CreateUpdateLoan />} />
              <Route exact path="/manage-loan" element={<LoanView />} />

              <Route path='/addItem/:Iid' element={<CreateUpdateItem />} />
              <Route exact path="/manage-item" element={<ItemView />} />

              <Route exact path="/register" element={<Register />} />
              <Route exact path="/admin" element={<Admin />} />
              <Route exact path="/employee" element={<Employee />} />

              <Route path="/user/:id/viewLoan" element={<ViewLoans />} />
              <Route path="/user/:id/viewItems" element={<ViewItems />} />
            </Routes>
          </BrowserRouter>
        </div>
      </section>
    </div>

  );
}

export default App;
