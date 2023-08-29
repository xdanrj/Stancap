import styled from 'styled-components'
import { FloatingLabel as originalFloatingLabel, Form as originalForm, ButtonGroup as originalButtonGroup, ToggleButton as originalToggleButton} from 'react-bootstrap';
import { device } from '../../../GlobalStyles/device';

export const FormGroup = styled(originalForm.Group).attrs(() => ({
    className: "mb-4"
}))`
   
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

export const ToggleButton = styled(originalToggleButton).attrs(() => ({
    className: "text-white"
}))`

`;