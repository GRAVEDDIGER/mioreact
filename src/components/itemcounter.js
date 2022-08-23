import React, { useState } from "react";
import styled from "styled-components";

const ItemCounter = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  > h6 {
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
  font-size: 1.5rem;
  box-shadow: 3px 3px 15px gray;
`;
export const Itemcounter = () => {
  const [counter, setcounter] = useState(0);
  const handleMinusButtonClick = () => {
    setcounter(counter - 1);
  };
  const handlePlusButtonClick = () => {
    setcounter(counter + 1);
  };
  return (
    <ItemCounter>
      <CounterButton onClick={handleMinusButtonClick}>-</CounterButton>
      <h6>{counter}</h6>
      <CounterButton onClick={handlePlusButtonClick}>+</CounterButton>
    </ItemCounter>
  );
};
