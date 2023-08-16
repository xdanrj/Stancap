import styled from 'styled-components'
import { device } from '../../GlobalStyles/device'
import { MDBContainer as originalMDBContainer, MDBRow as originalMDBRow, MDBTypography as originalMDBTypography, MDBCard as originalMDBCard } from 'mdb-react-ui-kit';

export const QuoteContainerBody = styled.div.attrs(() => ({
    className: "mx-auto text-center"
}))`
    width: 100vw;
    margin-top: 8vh;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media ${device.laptopL} {
        width: 100vw;
        margin-top: 8vh;
    }
    
`;
export const Paragraph = styled.p.attrs(() => ({
    className: "mb-0 mt-2 font-italic"
}))`

`;
export const SecondaryParagraph = styled.p.attrs((props) => ({
    className: `mb-0 mt-2 font-italic ${props.isEven ? 'text-start' : 'text-end'}`
}))`
    background-color: ${({ isEven }) => (isEven ? 'blue' : 'red')};
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
    className: "mx-auto py-5 h-100 position-relative text-center"
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
export const MDBCard = styled(originalMDBCard).attrs(() => ({
    className: "bg-dark text-white"
}))`
`;


