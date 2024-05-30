import styled from 'styled-components'
import { sizes } from '../../../CommonStyles/screenSizes';
import { MDBIcon as originalMDBIcon } from 'mdb-react-ui-kit';
import { Form as originalForm } from 'react-bootstrap';

export const FormGroupMultipleQuote = styled(originalForm.Group).attrs(() => ({
    className: "my-2"
  }))`
   
  `;

export const MdbIcon = styled(originalMDBIcon).attrs(() => ({
    className: "my-3 mx-2"
}))`

`;