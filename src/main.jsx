import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AlertProvider } from './components/Alert/AlertContext.jsx'
import { ModalProvider } from './components/Modal/ModalContext.jsx'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename='/stancap'>
      <ModalProvider>
        <AlertProvider>
          <App />
        </AlertProvider>
      </ModalProvider>
    </BrowserRouter>
  </React.StrictMode>
)