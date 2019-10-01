import styled from "styled-components";
import Box from "../box";

const VisuallyHidden = styled(Box)`
  border: 0px;
  clip: rect(0px, 0px, 0px, 0px);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0px;
  overflow: hidden;
  white-space: nowrap;
  position: absolute;
`;

export default VisuallyHidden;
