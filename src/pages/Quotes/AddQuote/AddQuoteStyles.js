import styled from 'styled-components'
import { device } from '../../../CommonStyles/device';
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
    margin-top: -10rem;
`;

export const MDBTabsLink = styled(originalMDBTabsLink).attrs(() => ({
    className: "text-white bg-transparent"
}))`

`;