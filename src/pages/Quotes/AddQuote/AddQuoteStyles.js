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

export const MDBTabs = styled(originalMDBTabs).attrs(() => ({
    className: "my-3"
}))`

`;

export const MDBTabsLink = styled(originalMDBTabsLink).attrs(() => ({
    className: "text-white bg-transparent"
}))`

`;