import React from "react"
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import "./Navbar.css"


function NavbarComponent() {

    const username = localStorage.getItem("username")

    return (
        <Navbar expand="" fixed="top">
            <Container>
                <Navbar.Brand href="/quotes">Navbar with text</Navbar.Brand>
                
                <Navbar.Toggle />
                
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Logado como: <a href="#login">{username}</a>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/quotes">Quotes</Nav.Link>
                        <Nav.Link href="/register">Register</Nav.Link>
                        <Nav.Link href="/new_password">New Password</Nav.Link>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarComponent