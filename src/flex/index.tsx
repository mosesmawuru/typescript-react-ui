import React, { forwardRef } from "react";
import Box from "../box";

const Flex = forwardRef(({ align, justify, wrap, direction, ...rest }, ref) => (
  <Box
    ref={ref}
    display="flex"
    flexDirection={direction}
    alignItems={align}
    justifyContent={justify}
    flexWrap={wrap}
    {...rest}
  />
));

export default Flex;
