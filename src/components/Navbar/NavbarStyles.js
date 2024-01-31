import styled from 'styled-components'
import {
    MDBNavbar as originalMDBNavbar,
    MDBContainer as originalMDBContainer,
    MDBNavbarBrand as originalMDBNavbarBrand,
    MDBNavbarToggler as originalMDBNavbarToggler,
    MDBNavbarItem as originalMDBNavbarItem,
    MDBNavbarLink as originalMDBNavbarLink,
    MDBCollapse as originalMDBCollapse,
    MDBBtn as originalMDBBtn,
    MDBIcon as originalMDBIcon,
    MDBNavbarNav as originalMDBNavbarNav,
    MDBInputGroup as originalMDBInputGroup
} from 'mdb-react-ui-kit';

export const MDBNavbar = styled(originalMDBNavbar).attrs(() => ({
    className: "text-white"
}))`
`;

export const MDBContainer = styled(originalMDBContainer).attrs(() => ({
    className: "text-white"
}))`
`;

export const MDBNavbarBrand = styled(originalMDBNavbarBrand).attrs(() => ({
    className: "text-white"
}))`
`;

export const MDBNavbarToggler = styled(originalMDBNavbarToggler).attrs(() => ({
    className: "text-white"
}))`
`;

export const MDBNavbarItem = styled(originalMDBNavbarItem).attrs(() => ({
    className: "text-white"
}))`
`;

export const CustomMDBNavbarLink = styled(originalMDBNavbarLink).attrs(() => ({
    className: "mx-4 text-white",
}))`
`;

export const MDBCollapse = styled(originalMDBCollapse).attrs(() => ({
    className: ""
}))`
`;

export const MDBBtn = styled(originalMDBBtn).attrs(() => ({
    className: ""
}))`
`;

export const MDBIcon = styled(originalMDBIcon).attrs(() => ({
    size:'2x'
}))`
`;

export const MDBNavbarNav = styled(originalMDBNavbarNav).attrs(() => ({
    className: ""
}))`
`;

export const MDBInputGroup = styled(originalMDBInputGroup).attrs(() => ({
    className: ""
}))`
`;