import React, { useContext, createContext } from "react"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { renderToString } from 'react-dom/server'
import parse from 'html-react-parser'

const AlertContext = createContext()

export function AlertProvider({ children }) {

    function notify(message, duration = 3500) {
        let splitMsg = message.split("\n")
        const msg = (
            <div>
                {splitMsg.map((line, index) => (
                    <div key={index}>
                        {line}
                        {index !== splitMsg.length - 1 && <br />}
                    </div>
                ))}
            </div>
        )
        toast(msg, { autoClose: duration })
    }

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