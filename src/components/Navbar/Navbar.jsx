import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MDBNavbarLink, MDBNavbar, MDBContainer, MDBNavbarItem, MDBCollapse, MDBBtn, MDBNavbarNav, MDBInputGroup } from 'mdb-react-ui-kit';
import { CustomMDBNavbarLink, NavbarIcon, NavbarIconText, CustomLink } from './NavbarStyles';
import { useModalBox } from '../Modal/ModalContext';
import userServices from '../../services/userServices';
import { Row, Col, Navbar } from 'react-bootstrap';

export default function NavbarComponent() {
  const location = useLocation()
  const navigate = useNavigate()
  const useModal = useModalBox()
  //const [username, setUsername] = useState(localStorage.getItem("username"))
  const username = localStorage.getItem("username")
  const userQuotesQtd = localStorage.getItem("userQuotesQtd")
  const userService = new userServices()
  const isAuthenticated = userService.authenticatedUser()
  const logoff = () => {
    userService.logout()
    navigate('/quotes')
    alert("Deslogado com sucesso")
  }
  const isInMyQuotes = location.pathname === "/my_quotes"

  return (
    <>
      <MDBNavbar as='header' fixed='top' dark bgColor='dark' className='align-items-center' style={{ "height": isInMyQuotes ? "4.7rem" : "3.6rem", "backgroundColor": "red" }}>
        <MDBContainer fluid style={{ "marginTop": "-0.8rem", }}>
          <MDBNavbarNav className='d-flex flex-row ms-auto justify-content-center' >

            <CustomLink to='/quotes'>
              <MDBNavbarItem>
                <NavbarIcon fas icon="comments" />
                <NavbarIconText>Quotes</NavbarIconText>
              </MDBNavbarItem>
            </CustomLink>

            {isAuthenticated ?
              <>
                <CustomLink to='/add_quote'>
                  <MDBNavbarItem>
                    <NavbarIcon fas icon="plus-circle" />
                    <NavbarIconText >Adicionar</NavbarIconText>
                  </MDBNavbarItem>
                </CustomLink>

                <CustomLink to='/my_quotes'>
                  <MDBNavbarItem>
                    <NavbarIcon fas icon="address-book" />
                    <NavbarIconText >Minhas</NavbarIconText>
                  </MDBNavbarItem>
                </CustomLink>
              </>
              :
              <CustomLink to='/login'>
                <MDBNavbarItem>
                  <NavbarIcon fas icon="sign-in-alt" />
                  <NavbarIconText >Login</NavbarIconText>
                </MDBNavbarItem>
              </CustomLink>
            }
          </MDBNavbarNav>

          <MDBNavbarNav style={{ "marginTop": "-2.2rem" }}>
            {isInMyQuotes &&
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink active onClick={() => useModal({
                    title: `Usuário ${username}`,
                    paragraph: `Você tem ${userQuotesQtd} quote(s).`,
                    buttons: [{ text: "Deslogar", action: [logoff, "handleClose()"] }]
                  })} className='text-secondary' style={{ "marginTop": "0.1rem", "fontSize": "0.85rem" }}>Logado como <span className='text-primary'>{username}</span></MDBNavbarLink>
                </MDBNavbarItem>
              </>}
          </MDBNavbarNav>

        </MDBContainer>
      </MDBNavbar>
    </>
  )
}