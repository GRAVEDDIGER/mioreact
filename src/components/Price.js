import React from "react";
import styled from "styled-components";
const StyledPrice = styled.div`
  font-size: 1.5rem;
  color: ${(props) => props.color};
  margin-top: ${(props) => props.marginT};
  font-weight: bold;
  font-family: sans-serif;
  ${(props) => props.align}
`;
function Price({ price, color, isMarginZero }) {
  let priceString = price.toString().split("");
  let counter = 1;
  let result = priceString.reverse().map((letra) => {
    if (counter > 2) {
      counter = 1;
      return "." + letra;
    } else {
      counter++;
      return letra;
    }
  });
  result =result.reverse().join("");
if  (result.substring(0,1)=== ".") {
  result =result.substring(1);}
return (
    <StyledPrice
      marginT={isMarginZero ? "0px" : "1rem"}
      align={isMarginZero ? "text-align:right" : null}
      color={color}
    >
      {result}$
    </StyledPrice>
  );
}
export default Price;
