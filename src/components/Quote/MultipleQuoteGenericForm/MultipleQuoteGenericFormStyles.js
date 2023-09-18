import styled from 'styled-components'
import { device } from '../../../CommonStyles/device';
import { MDBIcon as originalMDBIcon } from 'mdb-react-ui-kit';
import { Form as originalForm } from 'react-bootstrap';

export const FormGroupMultipleQuote = styled(originalForm.Group).attrs(() => ({
    className: ""
  }))`
   
  `;

export const AddIcon = styled(originalMDBIcon).attrs(() => ({
    className: "my-3"
}))`

`;