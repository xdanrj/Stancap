import styled from 'styled-components'
import { device } from '../../CommonStyles/device'
import { MDBIcon as originalMDBIcon } from 'mdb-react-ui-kit'

export const MinimalQuoteContainer = styled.div.attrs(() => ({
    className: "py-2 px-2 mb-5 mx-auto"
}))`
    width: 100%;
    font-size: 0.85rem;
    background-color: rgb(40, 40, 40);
    border-radius: 12px;
`

export const Paragraph = styled.p.attrs(() => ({
    className: "mb-0font-italic text-start"
}))`
    width: 60%;
    float: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const ParagraphAutor = styled.p.attrs(() => ({
    className: ``
}))`
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 0;
    font-weight: bold;
`;

export const MdbIcon = styled(originalMDBIcon).attrs(() => ({
    className: `mx-2`
}))`
    float: right;
`