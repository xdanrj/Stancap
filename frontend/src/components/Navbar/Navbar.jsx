import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBNavbarLink, MDBNavbar, MDBContainer, MDBNavbarItem, MDBCollapse, MDBBtn, MDBNavbarNav, MDBInputGroup } from 'mdb-react-ui-kit';
import { CustomMDBNavbarLink, MDBNavbarBrand, MDBNavbarToggler, MDBIcon, NavbarIcon, NavbarIconText } from './NavbarStyles';
import { useModalBox } from '../Modal/ModalContext';
import userServices from '../../services/userServices';
import { Row, Col } from 'react-bootstrap';

export default function NavbarComponent() {
  const navigate = useNavigate()
  const useModal = useModalBox()
  const [showNavNoTogglerSecond, setShowNavNoTogglerSecond] = useState(false)
  const [navbarClassNames, setNavbarClassNames] = useState("d-flex ms-auto justify-content-center")
  const [username, setUsername] = useState(localStorage.getItem("userName"))
  const userService = new userServices()
  const isAuthenticated = userService.authenticatedUser()

  const logoff = () => {
    userService.logout()
    setUsername('')
    navigate('/quotes')
    alert("Deslogado com sucesso")
  }

  const handleNavToggler = () => {
    setShowNavNoTogglerSecond(!showNavNoTogglerSecond)
  }

  const handleOnShowNavbar = () => {
    setNavbarClassNames("justify-content-between")
    //setIconsTextVisible(true)
  }
  //mdbcontainer tinha fluid
  //navbar fechada: d-flex justify-content-center
  //navbar aberta: d-flex ms-auto justify-content-center
  return (
    <>
      <MDBNavbar fixed="top" expand='sm' dark bgColor='dark'  >
        <MDBContainer fluid>
          <MDBNavbarBrand href='/quotes'>Stancapverso</MDBNavbarBrand>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarTogglerDemo02'
            aria-controls='navbarTogglerDemo02'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => handleNavToggler()}>
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showNavNoTogglerSecond} onShow={() => handleOnShowNavbar()} >
            <MDBNavbarNav className='mt-3'>
              <span className={navbarClassNames}>

                <MDBNavbarItem >
                  <CustomMDBNavbarLink href='/quotes'>
                    < NavbarIcon fas icon="comments"/>
                    <NavbarIconText>Quotes</NavbarIconText>
                  </CustomMDBNavbarLink>
                </MDBNavbarItem>

                {isAuthenticated ?

                  <>
                    <MDBNavbarItem >
                      <CustomMDBNavbarLink href='/add_quote'>
                        < NavbarIcon fas icon="plus-circle" />
                        <NavbarIconText >Adicionar</NavbarIconText>
                      </CustomMDBNavbarLink>

                    </MDBNavbarItem>

                    <MDBNavbarItem >
                      <CustomMDBNavbarLink href='/my_quotes'>
                        < NavbarIcon fas icon="address-book" />
                        <NavbarIconText >Minhas</NavbarIconText>
                      </CustomMDBNavbarLink>
                    </MDBNavbarItem>
                  </>
                  :
                  <>
                    <MDBNavbarItem>
                      <CustomMDBNavbarLink href='/login'>
                        < NavbarIcon fas icon="sign-in-alt" />
                        <NavbarIconText >Login</NavbarIconText>
                        </CustomMDBNavbarLink>
                    </MDBNavbarItem>
                  </>
                }
              </span>

              <MDBNavbarItem className='ms-auto' >
                <MDBNavbarLink active onClick={() => useModal({
                  title: `Usuário ${username}`,
                  paragraph: ``,
                  buttons: [{ text: "Deslogar", action: [logoff, handleNavToggler, "handleClose()"] }]
                })} className='text-secondary'>Logado como {username}</MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  )
}