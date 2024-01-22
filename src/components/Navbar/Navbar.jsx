import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBNavbar, MDBContainer, MDBNavbarItem, MDBCollapse, MDBBtn, MDBIcon, MDBNavbarNav, MDBInputGroup } from 'mdb-react-ui-kit';
import { MDBNavbarLink, MDBNavbarBrand, MDBNavbarToggler } from './NavbarStyles';
import { useModalBox } from '../Modal/ModalContext';
import userServices from '../../services/userServices';

export default function NavbarComponent() {
  const navigate = useNavigate()
  const useModal = useModalBox()
  const [showNavNoTogglerSecond, setShowNavNoTogglerSecond] = useState(false);
  // username vai ser: pegar o username usando o userId como busca
  const username = localStorage.getItem("username")
  const userService = new userServices()

  const logoff = () => {
    userService.logout()
    navigate('/quotes')
    alert("Deslogado com sucesso")
  }

  const handleNavToggler = () => {
    setShowNavNoTogglerSecond(!showNavNoTogglerSecond)
  }

  return (
    <>
      <MDBNavbar fixed="top" expand='lg' light bgColor='dark'>
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
            <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>

              <MDBNavbarItem>
                <MDBNavbarLink onClick={() => useModal({ title: `Usuário ${username}`, paragraph: ``, buttons: [{ text: "Deslogar", action: [logoff, handleNavToggler,"handleClose()"] }] })} className='text-white'>Logado como {username}</MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBNavbarLink href='/quotes'>Quotes</MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBNavbarLink href='/login'>Login</MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBNavbarLink href='/register'>Register</MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBNavbarLink href='/new_password'>New Password</MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBNavbarLink href='/add_quote'>Add Quote</MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBNavbarLink href='/my_quotes'>My Quotes</MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBNavbarLink href='/testes'>Testes</MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}