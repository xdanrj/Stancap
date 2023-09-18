import styled, { createGlobalStyle } from 'styled-components'
import { FormControl as originalFormControl, FloatingLabel as originalFloatingLabel, Form as originalForm, ButtonGroup as originalButtonGroup, ToggleButton as originalToggleButton} from 'react-bootstrap';
import { device } from './device';

// esse primeiro aqui é inútil por enquanto \/
export const GlobalStyles = createGlobalStyle`
  body {
    font-family: Arial, Century Gothic
  }
`;
// /\

export const FormGroup = styled(originalForm.Group).attrs(() => ({
  className: "mb-4"
}))`
`;

export const CenteredFormControl = styled(originalFormControl).attrs(() => ({
  className: "w-50"
}))`
  
`;

export const DisabledFormControl = styled(originalFormControl).attrs(() => ({
  className: "mb-3"
}))`
  color: grey;
`;

export const FloatingLabel = styled(originalFloatingLabel).attrs(() => ({
  className: ""
}))`
  color: black;
`;

export const ButtonGroup = styled(originalButtonGroup).attrs(() => ({
  className: "text-white"
}))`

`;
