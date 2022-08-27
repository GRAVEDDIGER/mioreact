import React from "react";
import styled from "styled-components";
import { Loader } from "./loader";
import Item from "./item";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;
export const ItemList = ({ dataBase,stock }) => {

  return (
    <StyledDiv>
      {dataBase.length > 0 ? (
        dataBase.map((item) => {
          return <Item
            image={item.image}
            description={item.description}
            title={item.title}
            stock={stock}
            key={item.id}
            id={item.id}
          />
        }
        ))
       : (
        <Loader />
      )}
    </StyledDiv>
  );
};
