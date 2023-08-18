import styled from 'styled-components'
import { device } from '../../GlobalStyles/device'

export const QuotesPageGeral = styled.div.attrs(() => ({
    className: ""
}))`
    justify-content: space-between
`

export const OLDQuoteContainer = styled.div.attrs(() => ({
    className: "bg-dark rounded-4 my-5"
}))`
`

export const SourceLogo = styled.img.attrs(() => ({
    className: "mx-auto position-absolute translate-middle top-0 start-50 rounded-6"
}))`
    width: 16%;
`;
