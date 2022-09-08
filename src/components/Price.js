import React from "react";
import styled from "styled-components";
const StyledPrice = styled.div`
font-size: 1.5rem;
color: ${(props)=>props.color};
margin-top: 1rem;
font-weight: bold;
font-family: sans-serif;
`;
function Price({ price,color }) {
  let priceString = price.toString().split("");
let counter=1;
let result=  priceString.reverse().map(letra=>{
console.log(letra,counter)
    if (counter>2){
  counter=1
  return "."+letra;
}else {
  counter++
  return letra;}
})
 result.reverse().join("")
 return <StyledPrice color={color}>{result}$</StyledPrice>;
}
export default Price;
