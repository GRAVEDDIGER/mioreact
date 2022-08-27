import React, { useEffect, useState } from "react";
import styled from "styled-components";
import bannerImage from "../images/baner.png";
import { httpRequest } from "../funciones/consultaaapi";
import ProductCard from "./card";
import { Loader } from "./loader";
import uuid from "react-uuid";
const ItemListWraper = styled.div`
  @font-face {
    font-family: Roboto;
    src: url("../fonts/Roboto-Bold.ttf");
  }
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
`;
const StyledChildren = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;
export const ItemListContainer = ({ greeting, color, slogan, shadow }) => {
  const [dataBase, setdataBase] = useState([]);
  useEffect(() => {
    const url = "https://fakestoreapi.com/products";

    httpRequest()
      .get(url)
      .then((res) => {
        if (!res.error) setdataBase(res);
      });
  }, []);

  return (
    <ItemListWraper color={color}>
      <StyledImage color={color} imagen={bannerImage} shadow={shadow}>
        {greeting} <p>{slogan}</p>
      </StyledImage>
      <StyledChildren>
                {dataBase.length > 0 ? (
          dataBase.map((item) => (
            <ProductCard
              image={item.image}
              description={item.description}
              title={item.title}
              key={uuid()}
            />
          ))
        ) : (
          <Loader />
        )}
      </StyledChildren>
    </ItemListWraper>
  );
};
