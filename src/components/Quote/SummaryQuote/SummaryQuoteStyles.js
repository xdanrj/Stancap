import styled from 'styled-components'
import { device } from '../../../CommonStyles/device'
import { MDBIcon as originalMDBIcon } from 'mdb-react-ui-kit'

export const MinimalQuoteContainer = styled.div.attrs(() => ({
    className: "pt-4 px-4 mb-5"
}))`
    font-size: 0.85rem;
    background-color: rgb(40, 40, 40);
    border-radius: 12px;
`

export const InternalContainer = styled.div.attrs(() => ({
    className: "row"
}))`
`
export const IconContainer = styled.div.attrs(() => ({
    className: "row"
}))`
`

export const Paragraph = styled.p.attrs(() => ({
    className: "font-italic text-start col-6 text-truncate"
}))`
    background-color: rgb(40, 40, 40);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const ParagraphAutor = styled.p.attrs(() => ({
    className: `col-3 text-start text-truncate`
}))`
    background-color: rgb(40, 40, 40);
    color: rgba(255, 255, 255, 0.7);
    font-weight: bold;
`;

export const MdbIcon = styled(originalMDBIcon).attrs(() => ({
    className: `col-1`
}))`
    
`