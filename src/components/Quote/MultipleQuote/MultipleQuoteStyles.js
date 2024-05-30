import styled from 'styled-components'
import { MDBIcon as originalMDBIcon } from 'mdb-react-ui-kit';
import { sizes } from '../../../CommonStyles/screenSizes';

export const QuoteHeader = styled.div.attrs(() => ({
    className: "position-relative"
}))`
`;

export const SourceLogo = styled.img.attrs(() => ({
    className: "position-absolute top-0 start-50 translate-middle rounded-6"
}))`
    margin-top: -1vh;
    width: 5.5vh;
`;

export const InfoIcon = styled.i.attrs(() => ({
    className: "bi bi-info-square-fill position-absolute top-0 start-100 translate-middle"
}))`
    margin-top: -1vh;
    margin-left: -0.2vw;
    font-size: 3vh;
    color: grey;
`;


