import React, { useEffect, useState } from "react";
import styled from "styled-components";
import bannerImage from "../images/baner.png";
import { httpRequest } from "../funciones/consultaaapi";
import { ItemList } from "./itemlist";
const ItemListWraper = styled.div`
  background-color: ${(props) => props.color};
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  justify-content: center;
`;

const StyledImage = styled.div`
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
  background-size: 100%, auto;
  justify-content: space-between;
  > p {
    margin-bottom: 0;
    text-align: right;
    font-size: 2rem;
  }
  @media (max-width: 900px) {
    background-size: auto;
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

export const ItemListContainer = ({
  greeting,
  color,
  slogan,
  shadow,
  datosSetter,
  datos,
}) => {
  const [dataBase, setdataBase] = useState([]);
  const [stock, setstock] = useState(12);
  useEffect(() => {
    const url = "https://fakestoreapi.com/products";
    httpRequest()
      .get(url)
      .then((res) => {
        if (!res.error) setdataBase(res);
      });
  }, []);
  if (!datos) {
    return (
      <ItemListWraper color={color}>
        <StyledImage color={color} imagen={bannerImage} shadow={shadow}>
          {greeting} <p>{slogan}</p>
        </StyledImage>
        <ItemList dataBase={dataBase} stock={stock} datosSetter={datosSetter} />
      </ItemListWraper>
    );
  }
};
