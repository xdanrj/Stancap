import styled from "styled-components";
import { device } from "../../CommonStyles/device";
import { InputGroup as originalInputGroup } from "react-bootstrap";

export const InputGroup = styled(originalInputGroup).attrs(() => ({
    className: `mb-5`
}))`
    
`