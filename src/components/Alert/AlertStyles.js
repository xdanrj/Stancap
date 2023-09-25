import styled from 'styled-components'
import { device } from '../../CommonStyles/device';
import { MDBIcon as originalMDBIcon } from 'mdb-react-ui-kit';
import { Toast as originalToast, ToastContainer as originalToastContainer } from 'react-bootstrap';


export const ToastContainer = styled(originalToastContainer).attrs(() => ({
    className: "mb-3 position-fixed"
}))`
    border: 16px red;
    width: fit-content;
  `;

export const MdbIcon = styled(originalMDBIcon).attrs(() => ({
    className: "mx-2"
}))`
  `;