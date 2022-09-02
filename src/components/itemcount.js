import { Typography } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";

const ItemCounterDiv = styled.div`
  display: flex;

  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  align-self: center;
  align-content: center;
  margin: 2rem;

  > div > h6 {
    margin: 1rem;
    font-family: sans-serif;
    text-align: center;
    font-weight: bold;
    color: blue;
    font-size: 1.5rem;
  }
`;
const CounterButton = styled.button`
  outline: none;
  color: blue;
  margin: 0.5rem;
  font-size: 1.5rem;
  box-shadow: 3px 3px 15px gray;
`;
export const Itemcounter = ({ stockItem }) => {
  const [counter, setcounter] = useState(0);
  const handleMinusButtonClick = () => {
    if (counter - 1 > -1) setcounter(counter - 1);
  };
  const handlePlusButtonClick = () => {
    if (counter < parseInt(stockItem)) setcounter(counter + 1);
  };

  return (
    <ItemCounterDiv>
      <Typography
        variant="h6"
        component="div"
      >{`Stock disponible ${stockItem}`}</Typography>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <CounterButton onClick={handleMinusButtonClick}>-</CounterButton>
        <h6>{counter}</h6>
        <CounterButton onClick={handlePlusButtonClick}>+</CounterButton>
      </div>
    </ItemCounterDiv>
  );
};
