import React from "react"
//import Navbar from "react-bootstrap/Navbar"
import { Navbar } from "react-bootstrap"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import "./Navbar.css"
import { MDBIcon } from "mdb-react-ui-kit"
import { NavbarStyle } from "./NavbarStyles"

function NavbarComponent() {
    const username = localStorage.getItem("username")
    return (
        <NavbarStyle>
        <Navbar expand="xxl" fixed="top">
            <Container>
                <Navbar.Brand href="/quotes" className="text-white">Navbar with text</Navbar.Brand>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text className="text-white"><a className="text-white" href="/login">
                        Logado como: {username}</a>

                        <Nav.Link href="/login">Login</Nav.Link>

                        <Nav.Link href="/quotes"><MDBIcon className='text-white' icon='quote-left' size='2x'/>Quotes</Nav.Link>

                        <Nav.Link href="/edit_my_quotes"><MDBIcon className="text-white" icon="edit" size='2x'/>Edit My Quotes</Nav.Link>

                        <Nav.Link href="/register">Register</Nav.Link>
                        
                        <Nav.Link href="/new_password">New Password</Nav.Link>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </NavbarStyle>
    )
}

export default NavbarComponent