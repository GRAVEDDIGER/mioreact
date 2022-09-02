import React from "react";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import Stars from "./Stars";
import { Itemcounter } from "./itemcount";
import { Button } from "@mui/material";
const ItemDetailWraper = styled.div`
  width: 100%;
  background-color: ${(prop) => prop.color};
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
`;
const ImageWraper = styled.div`
  margin: 1rem 2rem;

  width: auto;
`;
const StyledImage = styled.img`
  padding: 2rem;
  margin: 1rem;
  height: 450px;
  box-shadow: 2px 2px 15px #333;
  background-color: #fff;
`;
const DetailsWraper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  text-align: left;
  margin: 2rem;
  flex-wrap: nowrap;
  height: auto;
`;

function ItemDetail({ datos, color }) {
  let estrellas = Math.trunc(parseInt(datos.rating.rate));
  let fraccion = Math.trunc((parseFloat(datos.rating.rate) - estrellas) * 10);
  return (
    <ItemDetailWraper color={color}>
      <ImageWraper>
        <StyledImage src={datos.image} />
      </ImageWraper>
      <DetailsWraper style={{ flexDirection: "nowrap" }}>
        <Typography
          variant="h6"
          style={{ display: "flex", flexWrap: "nowrap", fontSize: 30 }}
          color={"#333"}
        >
          {datos.title}
        </Typography>
        <Stars stars={estrellas} fraction={fraccion} />
        <Typography variant="h5" color={"green"} style={{ marginTop: "1rem" }}>
          {`${parseInt(datos.price) * 300}$`}
        </Typography>
        <Itemcounter
          stockItem={datos.rating.count}
          style={{ marginTop: "2rem" }}
        />
        <Button
          variant="contained"
          size="large"
          style={{ alignSelf: "center" }}
        >
          Agregar al carrito
        </Button>
      </DetailsWraper>
    </ItemDetailWraper>
  );
}

export default ItemDetail;
