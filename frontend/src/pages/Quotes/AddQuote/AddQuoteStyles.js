import styled from 'styled-components'
import { sizes } from '../../../CommonStyles/screenSizes';
import {
    MDBTabs as originalMDBTabs,
    MDBTabsItem as originalMDBTabsItem,
    MDBTabsLink as originalMDBTabsLink,
    MDBTabsContent as originalMDBTabsContent,
    MDBTabsPane as originalMDBTabsPane, 
    MDBIcon as originalMDBIcon
} from 'mdb-react-ui-kit';

export const AddQuoteDiv = styled.div.attrs((props) => ({
    className: ``
}))`
    margin-top: 5rem;
`;

export const MDBTabs = styled(originalMDBTabs).attrs(() => ({
    className: "mb-3"
}))`
    margin-top: 0rem;
`;

export const MDBTabsLink = styled(originalMDBTabsLink).attrs(() => ({
    className: "text-white bg-transparent"
}))`

`;