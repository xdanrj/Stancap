import styled, { createGlobalStyle } from 'styled-components'
import { FormControl as originalFormControl, FloatingLabel as originalFloatingLabel, Form as originalForm, ButtonGroup as originalButtonGroup, ToggleButton as originalToggleButton} from 'react-bootstrap';
import { device } from './device';

// esse GlobalStyles é inútil, creio eu \/
export const GlobalStyles = createGlobalStyle`
  body {
    font-family: Arial, Century Gothic
  }
`;
// /\

export const ButtonsFormGroup = styled(originalForm.Group).attrs(() => ({
  className: "d-flex justify-content-evenly"
}))`
  
`;

export const FormGroup = styled(originalForm.Group).attrs(() => ({
  className: "mb-4"
}))`
`;

export const CenteredFormGroup = styled(originalForm.Group).attrs(() => ({
  className: "mb-4 wd-50 mx-auto"
}))`
`;

//à fazer (centeredformcontrol) ainda \/
export const CenteredFormControl = styled(originalFormControl).attrs(() => ({
  className: "mx-auto"
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

export const QuoteHeader = styled.div.attrs(() => ({
  className: "position-relative"
}))`
`;

export const SourceLogo = styled.img.attrs(() => ({
  className: "position-absolute top-0 start-50 translate-middle rounded-6"
}))`
  margin-top: -1vh;
  width: 5.5vh;
`;

export const InfoIcon = styled.i.attrs(() => ({
  className: "bi bi-info-square-fill position-absolute top-0 start-100 translate-middle"
}))`
  margin-top: -1vh;
  margin-left: -0.2vw;
  font-size: 3vh;
  color: grey;
`;

export const FooterLine = styled.div.attrs(() => ({
  className: ""
}))`
`