import React, { useContext, createContext } from "react"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { renderToString } from 'react-dom/server';
import parse from 'html-react-parser';

const AlertContext = createContext()

export function AlertProvider({ children }) {
    // const notify = (message, duration=3500) => toast(
    //     <> abc <br /> xyz </>,
    //      { autoClose: duration })

    function notify(message, duration = 3500) {
        let splitMsg = message.split("\n")
        console.log(splitMsg)
        let msg = splitMsg.map((line, index) => (
            <div key={index}>
                {line}
                {index !== message.split("\n").length - 1 && <br />}
            </div>
        ))
        //todo: fazer com que msg seja um html normal pra funfar no toast
        console.log(d(renderToString(msg)))
        toast(renderToString(msg), { autoClose: duration })
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