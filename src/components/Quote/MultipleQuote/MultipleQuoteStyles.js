import styled from 'styled-components'
import { MDBIcon as originalMDBIcon } from 'mdb-react-ui-kit';
import { device } from '../../../CommonStyles/device';

export const QuoteContainer = styled.div.attrs(() => ({
    className: "py-2 px-2 mb-5"
}))`
    width: 100%;
    background-color: rgb(50, 50, 0);
    border-radius: 20px;
`;
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

export const Ballon = styled.div.attrs((props) => ({
    className: "text-start"
}))`
    background-color: ${({ ballonside }) => (ballonside ? 'rgb(0, 100, 0)' : 'rgb(0, 50, 100)')};
    border-radius: ${({ ballonside }) => (ballonside ? '20px 20px 3px 20px' : '20px 20px 20px 3px')};
    margin-left: ${({ ballonside }) => (ballonside ? 'auto' : 'initial')};
    margin-right: ${({ ballonside }) => (ballonside ? 'initial' : 'auto')};
    width: fit-content;
    max-width: 80%;
`;

export const Paragraph = styled.p.attrs((props) => ({
    className: `font-italic px-2`
}))`

`;

export const ParagraphAutor = styled.p.attrs((props) => ({
    className: `mt-2 px-2`
}))`
    margin-bottom: 0;
    font-weight: bold;
`;

