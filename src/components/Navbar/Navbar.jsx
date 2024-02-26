import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBNavbarLink, MDBNavbar, MDBContainer, MDBNavbarItem, MDBCollapse, MDBBtn, MDBNavbarNav, MDBInputGroup } from 'mdb-react-ui-kit';
import { CustomMDBNavbarLink, MDBNavbarBrand, MDBNavbarToggler, MDBIcon } from './NavbarStyles';
import { useModalBox } from '../Modal/ModalContext';
import userServices from '../../services/userServices';

export default function NavbarComponent() {
  const navigate = useNavigate()
  const useModal = useModalBox()
  const [showNavNoTogglerSecond, setShowNavNoTogglerSecond] = useState(false)
  const [username, setUsername] = useState(localStorage.getItem("userName"))
  const userService = new userServices()
  const isAuthenticated = userService.authenticatedUser()

  console.log(username)

  const logoff = () => {
    userService.logout()
    setUsername('')
    navigate('/quotes')
    alert("Deslogado com sucesso")
  }

  const handleNavToggler = () => {
    setShowNavNoTogglerSecond(!showNavNoTogglerSecond)
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
          <MDBCollapse navbar show={showNavNoTogglerSecond} >
            <MDBNavbarNav className='mb-2 mb-lg-0 text-center d-inline-flex'>
             <span className='justify-content-center'>
                <MDBNavbarItem>
                  <CustomMDBNavbarLink href='/quotes'><MDBIcon fas icon="comments" /></CustomMDBNavbarLink>
                </MDBNavbarItem>

                {isAuthenticated ?

                  <>
                    <MDBNavbarItem>
                      <CustomMDBNavbarLink href='/add_quote'><MDBIcon fas icon="plus-circle" /></CustomMDBNavbarLink>
                    </MDBNavbarItem>

                    <MDBNavbarItem>
                      <CustomMDBNavbarLink href='/my_quotes'><MDBIcon fas icon="address-book" /></CustomMDBNavbarLink>
                    </MDBNavbarItem>



                  </>
                  :
                  <>
                    <MDBNavbarItem>
                      <CustomMDBNavbarLink href='/login'><MDBIcon fas icon="sign-in-alt" /></CustomMDBNavbarLink>
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