import styled from 'styled-components'
import { device } from '../../GlobalStyles/device'

export const QuoteContainer = styled.div.attrs(() => ({
    className: "my-5"
}))`
    position: absolute;
    width: 100vw;
    background-color: rgb(51, 51, 0);
    left: 0;
    right; 0;
    
`

export const Ballon = styled.div.attrs((props) => ({
    className: `mb-3 ${props.ballonside ? 'text-start': 'text-end'}` 
}))`
    ${({ ballonside }) => (ballonside ?
         'background-color: rgb(0, 102, 0); margin-left: auto;' 
          :
          'background-color: rgb(0, 51, 102); margin-right: auto;')};
    
    border-radius: 20px 20px 3px 20px;
    
    width: 80%;
`
//
export const Paragraph = styled.p.attrs((props) => ({
    className: `mb-0 mt-2 font-italic `
}))`
`;

export const ParagraphAutor = styled.p.attrs((props) => ({
    className: `mb-0 mt-2 font-weight-bold`
}))`
    
`;