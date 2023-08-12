import React from "react"
//import Navbar from "react-bootstrap/Navbar"
import { Navbar } from "react-bootstrap"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import "./Navbar.css"
import { MDBIcon } from "mdb-react-ui-kit"

function NavbarComponent() {
    const username = localStorage.getItem("username")
    return (
        <Navbar expand="xxl" fixed="top">
            <Container>
                <Navbar.Brand href="/quotes">Navbar with text</Navbar.Brand>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Logado como: <a href="#login">{username}</a>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/quotes"><MDBIcon className='ms-1' icon='camera' size='6x' /></Nav.Link>
                        <Nav.Link href="/register">Register</Nav.Link>
                        <Nav.Link href="/new_password">New Password</Nav.Link>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarComponent