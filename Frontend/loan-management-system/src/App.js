
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
// import Homepage from './Components/Homepage';
import Login from './Components/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path='/login' element={<Login/>} >
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
