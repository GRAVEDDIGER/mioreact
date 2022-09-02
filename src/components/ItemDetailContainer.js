import React from "react";
import styled from "styled-components";
import ItemDetail from "./ItemDetail";

const ItemDetailWraper = styled.div`
  background-color: ${(props) => props.color};
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  overflow: auto;
`;
const StyledDetailsImage = styled.div`
  background-image: url(${(prop) => prop.imagen});
  display: flex;
  flex-direction: column;
  max-width: 100vw;
  width: 100%;
  height: 300px;
  box-shadow: 3px 3px 15px ${(prop) => prop.shadow};
  font-size: 2.5rem;
  font-smooth: inherit;
  text-shadow: 3px 3px 5px black;
  text-shadow: 1px 1px 3px black inset;
  padding: 1rem;
  font-weight: bold;
  color: ${(props) => props.color};
  font-family: "Roboto", sans-serif;
  background-repeat: no-repeat;
  background-size: cover;
  justify-content: space-between;
  > p {
    margin-bottom: 0;
    text-align: right;
    font-size: 2rem;
  }
  @media (max-width: 900px) {
    background-size: cover;
    min-height: 300px;
    text-align: center;
    align-content: center;
    justify-content: center;
    font-size: 3rem;
    p {
      display: none;
      font-size: 1.5rem;
    }
    @media (max-width: 650px) {
      text-align: center;
      align-content: center;
      justify-content: center;
      font-size: 3.5rem;
    }
  }
  @media (max-width: 400px) {
    width: 100%;
  }
`;
const ItemDescription = styled.div`
  font-size: 22px;
  margin: 1.5rem;
  text-align: justify;
  padding: 1rem;
  > h5 {
    font-size: 30px;
    font-weight: bold;
  }
`;
function ItemDetailContainer({
  imagen,
  datos,
  datosSetter,
  greeting,
  color,
  shadow,
}) {
  if (datos) {
    return (
      <ItemDetailWraper color={color}>
        <StyledDetailsImage imagen={imagen} color={color} shadow={shadow}>
          {greeting}
        </StyledDetailsImage>
        <ItemDetail datos={datos} color={color} />
        <ItemDescription>
          <h3>Descripcion</h3>
          {datos.description}
        </ItemDescription>
      </ItemDetailWraper>
    );
  }
}

export default ItemDetailContainer;
