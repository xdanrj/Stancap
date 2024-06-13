import React, { useEffect, useState } from "react"
import { Form, FormGroup, Col, Row, Button } from "react-bootstrap"

export default function Testes() {
  const [retryState, setRetryState] = useState(0)
  const [retryHasClicked, setRetryHasClicked] = useState(false)

  function funcao() {
    setRetryHasClicked(true)
    if (retryState === 0) {
      setRetryState(5)
    }
    const timer = setInterval(() => {
      setRetryState(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }
  return (
    <>
    <p>{retryState}</p>
      <Button onClick={()=> funcao()} disabled={retryHasClicked && retryState > 0}>Enviar {retryHasClicked && `(${retryState})`}</Button>
    </>
  )
}