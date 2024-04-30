import React, { useContext, createContext } from "react"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

const AlertContext = createContext()

export function AlertProvider({ children }) {

    function notify(message, duration = 3500) {
        let msg
        if (message && message.includes("\n")) {
            let splitMsg = message.split("\n")
            msg = (
                <div>
                    {splitMsg.map((line, index) => (
                        <div key={index}>
                            {line}
                            {index !== splitMsg.length - 1 && <br />}
                        </div>
                    ))}
                </div>
            )
        } else {
            msg = message
        }
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