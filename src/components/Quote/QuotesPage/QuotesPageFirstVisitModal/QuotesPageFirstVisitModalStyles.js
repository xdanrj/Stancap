import styled from 'styled-components'
import { device } from '../../../../CommonStyles/device';

export const LogoDemo = styled.img.attrs(() => ({
    className: "rounded-6"

}))`
    width: 3rem;
`;

export const ParagraphAuthorDemo = styled.p.attrs((props) => ({
    className: `mb-0`
}))`
    color: rgba(255, 255, 255, 0.7);
    font-weight: bold;
    &:hover{
        color: rgb(40, 150, 190);
        transition: 0.5s;
    }
`;

export const ParagraphDateDemo = styled.p.attrs((props) => ({
    className: `mt-0`
}))`
    font-size: 0.6em;
    color: rgba(255, 255, 255, 0.5);
    font-weight: bold;
`;