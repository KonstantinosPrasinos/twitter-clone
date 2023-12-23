import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import UserContextProvider from "./context/UserContext.jsx";
import AlertContextProvider from "./context/AlertContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
        <AlertContextProvider>
            <App />
        </AlertContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
)
