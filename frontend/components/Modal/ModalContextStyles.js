import styled from 'styled-components'
import { device } from '../../CommonStyles/device';
import { Button as originalButton, ModalBody as originalModalBody, ModalTitle as originalModalTitle } from "react-bootstrap"

export const ModalTitle = styled(originalModalTitle).attrs(() => ({
    className: "text-black"
}))`
`;

export const ModalBody = styled(originalModalBody).attrs(() => ({
    className: "text-white text-center"
}))`
background-color: rgb(40, 40, 40);
`;

export const ButtonContainer = styled.div.attrs(() => ({
    className: "d-flex justify-content-center"
}))`
    background-color: rgb(40, 40, 40);
`;

export const Button = styled(originalButton).attrs(() => ({
    className: "mx-2 mb-2"
}))`
    background-color: rgb(59, 113, 202);
`;

