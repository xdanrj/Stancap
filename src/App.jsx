import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Quotes from './pages/Quotes';
import Login from './pages/Login';
import Register from './pages/Register';
import NewPassword from './pages/NewPassword';
import Testes from './components/Testes';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

function App() {
  return (
     <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/quotes" element={<Quotes/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/testes" element={<Testes/>} />
        <Route path="/new_password" element={<NewPassword/>} />
      </Routes>
    </Router>
    
  )
}
export default App