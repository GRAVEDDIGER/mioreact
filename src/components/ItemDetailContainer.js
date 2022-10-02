import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ItemDetail from "./ItemDetail";
import { Loader } from "./loader";
import { ColorsContext } from "./ColorsContext";
import { DataContext } from "./dataContext";
const ItemDetailWraper = styled.div`
  background-color: ${(props) => props.color};
  margin: 10rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  overflow: auto;
  box-shadow: 3px 3px 15px #333;
  margin-top: 2rem;
  @media (max-width: 1200px) {
    margin: 3rem 3rem;
  }
  @media (max-width: 500px) {
    margin: 3rem 0.5rem;
  }
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
  margin-right: 5rem;
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
    font-size: 2.5rem;
  }
`;
const ItemDescription = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  flex-direction: column;
  flex-wrap: wrap;
  font-size: 22px;
  align-items: center;
  text-align: justify;
  padding: 1rem;
  > p {
    margin: 1.5rem;
  }
  > h5 {
    font-size: 30px;
    font-weight: bold;
  }
`;
function ItemDetailContainer({ imagen, greeting, shadow }) {
  let { id } = useParams();
  const [dataContext] = useContext(DataContext);
  const [colors] = useContext(ColorsContext);
  const [data, setData] = useState(null);
  useEffect(() => {
    const temp = dataContext.filter((item) => {
      console.log(item, "items");
      if (item.id.trim() === id.trim()) return item;
    });
    console.log("id", id, temp);
    setData(temp[0]);
  }, [id, data, dataContext]);

  return (
    <ItemDetailWraper color={colors.lightBackground}>
      <StyledDetailsImage
        imagen={imagen}
        color={colors.lightBackground}
        shadow={shadow}
      >
        {greeting}
      </StyledDetailsImage>
      {data ? <ItemDetail datos={data} /> : <Loader />}
      {data ? (
        <ItemDescription>
          <h3>Descripcion</h3>
          <p>{data.description}</p>
        </ItemDescription>
      ) : (
        <Loader />
      )}
    </ItemDetailWraper>
  );
}

export default ItemDetailContainer;
