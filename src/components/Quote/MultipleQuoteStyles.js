import styled from 'styled-components'
import { device } from '../../GlobalStyles/device'

export const BallonContainer = styled.div.attrs(() => ({
    className: "w-75"
}))`
background-color: ${({ iseven }) => (iseven ? 'blue' : 'red')};
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