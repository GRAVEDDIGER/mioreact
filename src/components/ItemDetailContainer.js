import React from 'react'
import styled from 'styled-components';
import ItemDetail from './ItemDetail';

const ItemDetailWraper = styled.div`
  background-color: ${(props) => props.color};
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  justify-content: center;
`;
const StyledDetailsImage = styled.div`
  background-image: url(${(prop) => prop.imagen});
  display: flex;
  flex-direction: column;
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
function ItemDetailContainer({imagen,datos,datosSetter,greeting,color,shadow}) {
 if (datos) { 
    return (
    <ItemDetailWraper>
    <StyledDetailsImage imagen={imagen} color={color} shadow={shadow}>{greeting}  </StyledDetailsImage>
    <ItemDetail datos={datos} />
    </ItemDetailWraper>
  )}
}

export default ItemDetailContainer