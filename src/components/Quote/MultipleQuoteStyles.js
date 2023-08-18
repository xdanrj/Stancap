import styled from 'styled-components'
import { device } from '../../GlobalStyles/device'

export const QuoteContainer = styled.div.attrs(() => ({
    className: "my-5"
}))`
    
    left: 0;
    right; 0;
    width: 100%;
`

export const BallonContainer = styled.div.attrs(() => ({
    className: ""
}))`
background-color: ${({ iseven }) => (iseven ? 'blue' : 'red')};
width: 100%;

`

export const Ballon = styled.div.attrs(() => ({
    className: ""

}))`

`

export const Paragraph = styled.p.attrs((props) => ({
    className: `mb-0 mt-2 font-italic rounded-4 ${props.iseven ? 'text-start' : 'text-end'}`
}))`
    
`;

export const ParagraphAutor = styled.p.attrs((props) => ({
    className: `mb-0 mt-2 font-italic rounded-4 ${props.iseven ? 'text-start' : 'text-end'}`
}))`
    
`;