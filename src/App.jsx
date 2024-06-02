import React from 'react'
import './App.css'
import { Routes, Route, Navigate, HashRouter } from 'react-router-dom';
import NavbarComponent from './components/Navbar/Navbar';
import QuotesPage from './components/Quote/QuotesPage/QuotesPage'
import Login from './pages/Credentials/Login';
import Register from './pages/Credentials/Register';
import NewPassword from './pages/Credentials/NewPassword';
import Testes from './components/Testes';
import AddQuote from './pages/Quotes/AddQuote/AddQuote';
import EditQuote from './pages/Quotes/EditQuote';
import MyQuotes from './pages/Quotes/MyQuotes/MyQuotes';
import ProtectedRoutes from './pages/Credentials/ProtectedRoutes';
import { ModalProvider } from './components/Modal/ModalContext';
import { AlertProvider } from './components/Alert/AlertContext';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function App() {
  return (
    <div>
      <ModalProvider>
        <AlertProvider>
          <NavbarComponent />
          <Routes>
            <Route path="" element={<Navigate replace to="/quotes" />} />
            <Route path="/quotes" element={<QuotesPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/testes" element={<Testes />} />
            <Route path="/new_password" element={<NewPassword />} />

            <Route path="/add_quote" element={
              <ProtectedRoutes>
                <AddQuote />
              </ProtectedRoutes>
            } />

            <Route path="/edit_quote" element={
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
        </AlertProvider>
      </ModalProvider>
    </div>
  )
}