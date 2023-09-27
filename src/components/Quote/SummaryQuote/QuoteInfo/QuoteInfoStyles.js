import styled from 'styled-components'
import { device } from '../../../../CommonStyles/device'
import { MDBIcon as originalMDBIcon } from 'mdb-react-ui-kit'
import { Modal as originalModal } from 'react-bootstrap'

export const ModalTitle = styled(originalModal.Title).attrs(() => ({
    className: ""
}))`
    color: black;
`

export const ModalBody = styled(originalModal.Body).attrs(() => ({
    className: ""
}))`
    color: black;

`