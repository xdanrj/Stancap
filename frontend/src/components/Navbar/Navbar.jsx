import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBNavbarLink, MDBNavbar, MDBContainer, MDBNavbarItem, MDBCollapse, MDBBtn, MDBNavbarNav, MDBInputGroup } from 'mdb-react-ui-kit';
import { CustomMDBNavbarLink, MDBNavbarBrand, MDBNavbarToggler, MDBIcon, NavbarIcon, NavbarIconText } from './NavbarStyles';
import { useModalBox } from '../Modal/ModalContext';
import userServices from '../../services/userServices';
import { Row, Col, Navbar } from 'react-bootstrap';

export default function NavbarComponent() {
  const navigate = useNavigate()
  const useModal = useModalBox()
  const [username, setUsername] = useState(localStorage.getItem("userName"))
  const userService = new userServices()
  const isAuthenticated = userService.authenticatedUser()

  const logoff = () => {
    userService.logout()
    setUsername('')
    navigate('/quotes')
    alert("Deslogado com sucesso")
  }

  //mdbcontainer tinha fluid
  // d-flex ms-auto justify-content-center
  return (
    <>
  <MDBNavbar fixed="top" expand="sm" dark bgColor='dark'>
    <MDBContainer fluid>
      <MDBNavbarNav className='d-flex align-items-center flex-row'>
        <MDBNavbarItem>
          <CustomMDBNavbarLink href='/quotes'>
            <NavbarIcon fas icon="comments"/>
            <NavbarIconText>Quotes</NavbarIconText>
          </CustomMDBNavbarLink>
        </MDBNavbarItem>

        {isAuthenticated ?
          <>
            <MDBNavbarItem>
              <CustomMDBNavbarLink href='/add_quote'>
                <NavbarIcon fas icon="plus-circle" />
                <NavbarIconText >Adicionar</NavbarIconText>
              </CustomMDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <CustomMDBNavbarLink href='/my_quotes'>
                <NavbarIcon fas icon="address-book" />
                <NavbarIconText >Minhas</NavbarIconText>
              </CustomMDBNavbarLink>
            </MDBNavbarItem>
          </>
          :
          <MDBNavbarItem>
            <CustomMDBNavbarLink href='/login'>
              <NavbarIcon fas icon="sign-in-alt" />
              <NavbarIconText >Login</NavbarIconText>
            </CustomMDBNavbarLink>
          </MDBNavbarItem>
        }

<div className='w-100'>
          <MDBNavbarItem> 
            <MDBNavbarLink active onClick={() => useModal({
              title: `Usuário ${username}`,
              paragraph: ``,
              buttons: [{ text: "Deslogar", action: [logoff, "handleClose()"] }]
            })} className='text-secondary'>Logado como {username}</MDBNavbarLink>
          </MDBNavbarItem>
        </div>
      </MDBNavbarNav>
    </MDBContainer>
  </MDBNavbar>
</>

  )
}