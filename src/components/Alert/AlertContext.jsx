import React, {useContext, createContext} from "react"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

const AlertContext = createContext()

export function AlertProvider({children}) {
    const notify = (message) => toast(message)
    
    return (
        <>
        <AlertContext.Provider value={notify}>
            <ToastContainer
                autoClose={2000}
                position="top-center"
                theme="dark"
                limit={2}
                closeButton={false}
            />
            {children}
           </AlertContext.Provider>
        </>
    )
}

export function useAlert() {
    return useContext(AlertContext)
}