import styled from 'styled-components'
import { device } from '../../GlobalStyles/device'

export const QuoteContainer = styled.div.attrs(() => ({
    className: "my-5 px-2"
}))`
    position: absolute;
    width: 100vw;
    background-color: rgb(51, 51, 0);
    left: 0;
    right; 0;
`;

export const Ballon = styled.div.attrs((props) => ({
    className: `mb-3 ${props.ballonside ? 'text-start' : 'text-end'}`
}))`
    background-color: ${({ ballonside }) => (ballonside ? 'rgb(0, 102, 0)' : 'rgb(0, 51, 102)')};
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