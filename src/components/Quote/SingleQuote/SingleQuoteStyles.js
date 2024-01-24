import styled from 'styled-components'
import { device } from '../../../CommonStyles/device';

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

export const InfoIcon = styled.i.attrs(() => ({
    className: "bi bi-info-square-fill position-absolute top-0 start-100 translate-middle"
}))`
    margin-top: -1vh;
    margin-left: -0.2vw;
    font-size: 3vh;
    color: grey;
`;