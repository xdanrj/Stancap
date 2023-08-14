import styled from 'styled-components'
import { MDBContainer as originalMDBContainer, MDBRow as originalMDBRow, MDBTypography as originalMDBTypography } from 'mdb-react-ui-kit';

export const QuoteContainerBody = styled.div.attrs(() => ({
    className: "mt-4"
}))`
    
`;

export const Paragraph = styled.p.attrs(() => ({
    className: "mb-0 mt-2 font-italic"
}))`
    font-family: system-ui
`;

export const Footer = styled.footer.attrs(() => ({
    className: "blockquote-footer pt-4 mt-4 border-top text-white"
}))`
    
`;

export const SourceLogo = styled.img.attrs(() => ({
    className: "mx-auto position-absolute translate-middle top-0 start-50 rounded-6"
}))`
    width: 16%;
`;

export const MDBContainer = styled(originalMDBContainer).attrs(() => ({
    className: "py-5 h-100 position-relative text-center"
}))`
`;

export const MDBRow = styled(originalMDBRow).attrs(() => ({
    className: "justify-content-center align-items-center h-100"
}))`

`;

export const MDBTypography = styled(originalMDBTypography).attrs(() => ({
    className: "blockquote-custom pt-4 rounded-5 fs-6"
}))`

`;



