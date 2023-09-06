import styled from 'styled-components'
import { device } from '../../../CommonStyles/device';

export const QuoteContainer = styled.div.attrs(() => ({
    className: "py-1 mb-5 mx-auto"
}))`
    width: 100%;
    font-size: 1.1rem;
    background-color: rgb(40, 40, 40);
    border-radius: 20px 20px 20px 20px;
    @media ${device.laptopL} {
        width: 75%;
    }
`

export const Paragraph = styled.p.attrs(() => ({
    className: "mb-0 mt-2 font-italic"
}))`
    font-style: italic;
`;

export const ParagraphAutor = styled.p.attrs((props) => ({
    className: `mt-2 px-2`
}))`
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 0;
    font-weight: bold;
    text-align: right;
`;

export const ParagraphDate = styled.p.attrs((props) => ({
    className: `px-2`
}))`
    font-size: 0.6em;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 0;
    font-weight: bold;
    text-align: right;
`;

export const FooterLine = styled.div.attrs((props) => ({
    className: "mx-3 mt-3"
}))`
    height: 1px;
    background-color: rgba(128, 128, 128, 0.5)
`;

export const SourceLogo = styled.img.attrs(() => ({
    className: "position-absolute translate-middle rounded-6"
}))`
    margin-top: -1vh;
    width: 5.5vh;
`;