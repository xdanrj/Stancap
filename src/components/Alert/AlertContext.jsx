import React, { useContext, createContext } from "react"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

const AlertContext = createContext()

export function AlertProvider({ children }) {
    //todo: fazer um usealert namoralzinho de erro pra caso a api nao responda
    function notify(message = "", duration = 3500) {
        console.log(message)
        if (message instanceof Error) {
            message = message?.stack
        } 
        if (message.includes("\n")) {
            let splitMsg = message.split("\n")
            message = (
                <div>
                    {splitMsg.map((line, index) => (
                        <div key={index}>
                            {line}
                            {index !== splitMsg.length - 1 && <br />}
                        </div>
                    ))}
                </div>
            )
        }
        toast(message, { autoClose: duration })
        
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