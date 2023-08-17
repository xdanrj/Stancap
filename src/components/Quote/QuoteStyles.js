import styled from 'styled-components'
import { device } from '../../GlobalStyles/device'
import { MDBContainer as originalMDBContainer, MDBRow as originalMDBRow, MDBTypography as originalMDBTypography, MDBCard as originalMDBCard } from 'mdb-react-ui-kit';

export const QuotePageDiv = styled.div.attrs(() => ({
    className: ""
}))`
    position: absolute;
    left: 0;
    right; 0;
    width: 100%;
`

export const QuoteContainer = styled.div.attrs(() => ({
    className: "bg-dark rounded-4 my-5"
}))`
`

export const SourceLogo = styled.img.attrs(() => ({
    className: "mx-auto position-absolute translate-middle top-0 start-50 rounded-6"
}))`
    width: 16%;
`;
