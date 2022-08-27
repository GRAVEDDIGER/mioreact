import React from "react";
import styled from "styled-components";
import { Loader } from "./loader";
import Item from "./item";
import uuid from "react-uuid";

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
        dataBase.map((item) => (
          <Item
            image={item.image}
            description={item.description}
            title={item.title}
            key={uuid()}
            stock={stock}
          />
        ))
      ) : (
        <Loader />
      )}
    </StyledDiv>
  );
};
