import styled from 'styled-components'
import { device } from '../../GlobalStyles/device'

export const MinimalQuoteContainer = styled.div.attrs(() => ({
    className: "py-1 mb-5 mx-auto"
}))`
    width: 100%;
    font-size: 1.1rem;
    background-color: rgb(40, 40, 40);
    border-radius: 20px 20px 20px 20px;
    @media ${device.laptopL} {
        width: 75%;
    }
`