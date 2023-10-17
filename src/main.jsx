import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import NavbarComponent from './components/Navbar/Navbar.jsx'
import { AlertProvider } from './components/Alert/AlertContext.jsx'
import { ModalProvider } from './components/Modal/ModalContext.jsx'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NavbarComponent />
    <ModalProvider>
      <AlertProvider>
        <App />
      </AlertProvider>
    </ModalProvider>
  </React.StrictMode>
)