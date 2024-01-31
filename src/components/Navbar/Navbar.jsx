import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBNavbarLink, MDBNavbar, MDBContainer, MDBNavbarItem, MDBCollapse, MDBBtn, MDBIcon, MDBNavbarNav, MDBInputGroup } from 'mdb-react-ui-kit';
import { CustomMDBNavbarLink, MDBNavbarBrand, MDBNavbarToggler } from './NavbarStyles';
import { useModalBox } from '../Modal/ModalContext';
import userServices from '../../services/userServices';

export default function NavbarComponent() {
  const navigate = useNavigate()
  const useModal = useModalBox()
  const [showNavNoTogglerSecond, setShowNavNoTogglerSecond] = useState(false);
  const [username, setUsername] = useState('')
  const userService = new userServices()
  const isAuthenticated = userService.authenticatedUser()

  useEffect(() => {
    async function getUsername() {
      setUsername(await userService.getUsername(localStorage.getItem("userId")))
    }
    getUsername()
  }, [])

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

  return (
    <>
      <MDBNavbar fixed="top" expand='md' light bgColor='dark'>
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
          <MDBCollapse navbar show={showNavNoTogglerSecond}>
            <MDBNavbarNav className='mb-2 mb-lg-0'>

              <MDBNavbarItem>
                <CustomMDBNavbarLink href='/quotes'><MDBIcon fas icon="book" /></CustomMDBNavbarLink>
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
                    <CustomMDBNavbarLink href='/login'>Login</CustomMDBNavbarLink>
                  </MDBNavbarItem>

                  <MDBNavbarItem>
                    <CustomMDBNavbarLink href='/register'>Register</CustomMDBNavbarLink>
                  </MDBNavbarItem>
                </>
              }

            </MDBNavbarNav>
            <MDBNavbarItem className='navbar-text mb-4'>
              <MDBNavbarLink onClick={() => useModal({ title: `Usuário ${username}`, paragraph: ``, buttons: [{ text: "Deslogar", action: [logoff, handleNavToggler, "handleClose()"] }] })} className='text-secondary'>Logado como {username}</MDBNavbarLink>
            </MDBNavbarItem>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  )
}

/*
              <MDBNavbarItem>
                <CustomMDBNavbarLink href='/new_password'>New Password</CustomMDBNavbarLink>
              </MDBNavbarItem>

*/