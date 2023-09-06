import styled from 'styled-components'
import { device } from '../../CommonStyles/device'

export const MinimalQuoteContainer = styled.div.attrs(() => ({
    className: "py-1 mb-5 mx-auto"
}))`
    width: 100%;
    font-size: 1.1rem;
    background-color: rgb(40, 40, 40);
    border-radius: 20px 20px 20px 20px;
`

export const Paragraph = styled.p.attrs(() => ({
    className: "mb-0 mt-2 font-italic"
}))`
    
`;

export const ParagraphAutor = styled.p.attrs((props) => ({
    className: `mt-2 px-2`
}))`
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 0;
    font-weight: bold;
    text-align: right;
`;