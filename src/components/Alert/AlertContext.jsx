import React, { useContext, createContext } from "react"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

const AlertContext = createContext()

export function AlertProvider({ children }) {
    const notify = (message, duration) => toast(message, { autoClose: duration || 3500 })

    return (
        <>
            <AlertContext.Provider value={notify}>
                <ToastContainer
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
export function useAlertMsg() {
    return useContext(AlertContext)
}