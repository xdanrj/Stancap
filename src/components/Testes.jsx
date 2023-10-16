import { Button } from "react-bootstrap"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

export default function Testes() {
  const notify = () => toast("testando msg")
  return (
    <>
      <ToastContainer
        autoClose={2000}
        position="top-center"
        theme="dark"
        limit={1}
        closeButton={false}
      />

      <Button onClick={notify}>opa</Button>
    </>
  )
}