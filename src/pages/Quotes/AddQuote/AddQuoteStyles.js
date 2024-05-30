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

export const MDBTabsLink = styled(originalMDBTabsLink).attrs(() => ({
    className: "text-white bg-transparent"
}))`

`;