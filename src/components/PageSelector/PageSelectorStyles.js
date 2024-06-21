import styled from 'styled-components'
import { Button as originalButton } from 'react-bootstrap';


export const MainDiv = styled.div.attrs((props) => ({
    className: ``
}))`
position: fixed;
left: 0;
bottom: 0;
width: 100%;
padding: 10px;
`;

export const PageInput = styled.input.attrs((props) => ({
  className: ``
}))`
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
`