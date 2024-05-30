import React, { useEffect, useState } from "react"
import { Form, FormGroup, Col, Row } from "react-bootstrap"

export default function Testes() {

  // lembrar que todo intervalo de tamanho de tela tem que ser definido se não o vão entre xs e lg vai ser ignorado.
  return (
    <>
    <Row className="bg-secondary">
      <Col lg={3} md={3} sm={3} xs={6} className="bg-primary">
        AAA
      </Col>
      <Col lg={3} md={3} sm={3} xs={6} className="bg-warning">
        BBB
      </Col>
      <Col lg={3} md={3} sm={3} xs={6} className="bg-success">
        CCC
      </Col>
      <Col lg={3} md={3} sm={3} xs={6} className="bg-danger">
        DDD
      </Col>
    </Row>
  </>
  )
}