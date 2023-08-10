import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import NavbarComponent from './components/Navbar/Navbar.jsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <div className='bg-danger'>
    <React.StrictMode>
      <NavbarComponent />
      <App />
    </React.StrictMode>
  </div>
)
