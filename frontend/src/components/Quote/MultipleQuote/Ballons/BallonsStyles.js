import styled from 'styled-components'
import { MDBIcon as originalMDBIcon } from 'mdb-react-ui-kit'

export const Ballon = styled.div.attrs((props) => ({
    className: "text-start"
    //https://imagecolorpicker.com/color-code/2596be
    // antigo bg color: background-color: ${({ $ballonside }) => ($ballonside ? '#145369' : '#541469')};
}))`
    background-color: #4c4c4c;
    border-radius: ${({ $ballonside }) => ($ballonside ? '20px 20px 3px 20px' : '20px 20px 20px 3px')};
    margin-left: ${({ $ballonside }) => ($ballonside ? 'auto' : 'initial')};
    margin-right: ${({ $ballonside }) => ($ballonside ? 'initial' : 'auto')};
    width: fit-content;
    max-width: 80%;
`;

export const Paragraph = styled.p.attrs((props) => ({
    className: `font-italic px-2`
}))`

`;

export const ParagraphAuthor = styled.p.attrs((props) => ({
    className: `mt-2 px-2`
}))`
    color: ${({ $authorcolor }) => ($authorcolor ? $authorcolor : "#071e26")};
    margin-bottom: 0;
    font-weight: bold;
`;

export const MdbIcon = styled(originalMDBIcon).attrs(() => ({
    className: ""
}))`
&:hover{
    cursor: pointer;
    font-size: 2rem;
    transition: 0.2s;
`;