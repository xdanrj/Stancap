import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Quotes from './pages/Quotes/Quotes';
import Login from './pages/Credentials/Login';
import Register from './pages/Credentials/Register';
import NewPassword from './pages/Credentials/NewPassword';
import Testes from './components/Testes';
import AddQuote from './pages/Quotes/AddQuote';
import EditQuote from './pages/Quotes/EditQuote';
import MyQuotes from './pages/Quotes/MyQuotes';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/testes" element={<Testes />} />
        <Route path="/new_password" element={<NewPassword />} />
        <Route path="/add_quote" element={<AddQuote />} />
        <Route path="/edit_quote/:id" element={<EditQuote />} />
        <Route path="/my_quotes" element={<MyQuotes />} />
      </Routes>
    </Router>

  )
}