import styled, { createGlobalStyle } from 'styled-components'
import { FormControl as originalFormControl, FloatingLabel as originalFloatingLabel, Form as originalForm, ButtonGroup as originalButtonGroup, ToggleButton as originalToggleButton} from 'react-bootstrap';
import { sizes } from './screenSizes';

// esse GlobalStyles é inútil, creio eu \/
export const GlobalStyles = createGlobalStyle`
  body {
    font-family: Arial, Century Gothic
  }
`

export const FormControl = styled(originalForm.Control).attrs(() => ({
  className: ""
}))`
  
`;

export const ButtonsFormGroup = styled(originalForm.Group).attrs(() => ({
  className: ""
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

export const QuoteContainer = styled.div.attrs(() => ({
  className: "py-2 px-2 mb-5 mx-auto"
}))`
  width: 100%;
  background-color: rgb(50, 50, 50);
  border-radius: 20px;
`;

export const QuoteHeader = styled.div.attrs(() => ({
  className: "position-relative"
}))`
`;

export const SourceLogo = styled.img.attrs(() => ({
  className: "position-absolute top-0 start-50 translate-middle rounded-6"
}))`
  margin-top: -0.5rem;
  width: 2.4rem;
}
`; // não usando: &:hover{width: 2.9rem;transition: 0.2s ease-in-out;

export const ClickableText = styled.p.attrs(() => ({
  className: ""
}))`;
  font-size: 2rem;
  margin: 0;
  &:hover{
   cursor: pointer;
   font-size: 2.5rem;
   transition: 0.2s ease-in-out;
}
`;

export const InfoIconStyles = styled.i.attrs(() => ({
  className: "bi bi-info-square-fill position-absolute top-0 start-100 translate-middle"
}))`
  margin-top: -1vh;
  margin-left: -0.2vw;
  font-size: 3vh;
  color: grey;
`;