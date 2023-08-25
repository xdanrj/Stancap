import styled from 'styled-components'
import { Form as originalForm, ButtonGroup as originalButtonGroup, ToggleButton as originalToggleButton} from 'react-bootstrap';
import { device } from '../../../GlobalStyles/device';

export const FormLabel = styled(originalForm.Label).attrs(() => ({
    className: "text-white"
}))`

`;

export const ButtonGroup = styled(originalButtonGroup).attrs(() => ({
    className: "text-white"
}))`

`;

export const ToggleButton = styled(originalToggleButton).attrs(() => ({
    className: "text-white"
}))`

`;