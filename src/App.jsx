import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import NavbarComponent from './components/Navbar/Navbar';
import Quotes from './pages/Quotes/Quotes';
import Login from './pages/Credentials/Login';
import Register from './pages/Credentials/Register';
import NewPassword from './pages/Credentials/NewPassword';
import Testes from './components/Testes';
import AddQuote from './pages/Quotes/AddQuote/AddQuote';
import EditQuote from './pages/Quotes/EditQuote';
import MyQuotes from './pages/Quotes/MyQuotes/MyQuotes';
import ProtectedRoutes from './pages/Credentials/ProtectedRoutes';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function App() {
  return (
    <div>
      <NavbarComponent />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/testes" element={<Testes />} />
        <Route path="/new_password" element={<NewPassword />} />

          <Route path="/quotes" element={<Quotes />} />
      
        <Route path="/add_quote" element={
          <ProtectedRoutes>
            <AddQuote />
          </ProtectedRoutes>
        } />

        <Route path="/edit_quote/:quotetype/:id" element={
          <ProtectedRoutes>
            <EditQuote />
          </ProtectedRoutes>
        } />


        <Route path="/my_quotes" element={
          <ProtectedRoutes>
            
              <MyQuotes />
           
          </ProtectedRoutes>
        } />

        <Route path="/navbar" element={
          <ProtectedRoutes>
            <NavbarComponent />
          </ProtectedRoutes>
        } />

      </Routes>
    </div>
  )
}