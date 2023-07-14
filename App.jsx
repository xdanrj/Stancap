import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './src/pages/Home';
import Quotes from './src/pages/Quotes';
import Login from './src/pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
     <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/quotes" element={<Quotes/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </Router>
  )
}

export default App
