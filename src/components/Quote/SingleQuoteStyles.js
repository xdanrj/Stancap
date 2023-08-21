import styled from 'styled-components'
import { device } from '../../GlobalStyles/device'

export const QuoteContainer = styled.div.attrs(() => ({
    className: ""
}))`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 95vw;
    background-color: rgb(51, 51, 0);
    border-radius: 20px 20px 20px 20px;
`

export const Paragraph = styled.p.attrs(() => ({
    className: "mb-0 mt-2 font-italic"
}))`

`;

export const ParagraphAutor = styled.p.attrs((props) => ({
    className: `mt-2 px-2`
}))`
    color: rgba(64, 64, 64, 0.5);
    margin-bottom: 0;
    font-weight: bold;
`;

export const ParagraphDate = styled.p.attrs((props) => ({
    className: `mt-2 px-2`
}))`
    margin-bottom: 0;
    font-weight: bold;
`;

export const FooterLine = styled.div.attrs((props) => ({
    className: "mx-3 mt-3"
}))`
    
    height: 1px;
    background-color: rgba(128, 128, 128, 0.5)
`;



