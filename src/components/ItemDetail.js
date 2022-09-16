import React, { useState,useContext } from "react";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import Stars from "./Stars";
import { Itemcounter } from "./itemcount";
import { Button } from "@mui/material";
import Price from "./Price";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { CartContext } from "./CartContext";
const ItemDetailWraper = styled.div`
  width: 100%;
  background-color: ${(prop) => prop.color};
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  @media (max-width: 1000px) {
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
    text-align: center;
    align-content: center;
  }
`;
const ImageWraper = styled.div`
  margin: 1rem 1rem;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  width: auto;
`;
const StyledImage = styled.img`
  padding: 2rem;
  margin: 1rem;
  max-height: 450px;
  max-width: 350px;
  box-shadow: 2px 2px 15px #333;
  background-color: #fff;
  @media (max-width: 450px) {
    height: 380px;
  }
`;
const DetailsWraper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  text-align: left;
  margin: 5rem;
  flex-wrap: nowrap;
  height: auto;
  > h6 {
    font-size: 30px;
    display: flex;
    flex-wrap: nowrap;
  }
  @media (max-width: 1200px) {
    > h6 {
      font-size: 25px;
      text-align: end;
    }
    margin: 2rem 1rem;
  }
  @media (max-width: 1000px) {
    align-items: center;
    > h6 {
      text-align: center;
    }
  }
  @media (max-width: 700px) {
    > h6 {
      font-size: 22px;
    }
    > button {
      width: 350px;
    }
  }
  @media (max-width: 500px) {
    > button {
      width: 250px;
    }
  }
`;

function ItemDetail({ datos, color, setData, data }) {
  const [cartData,cartSetter] =useContext(CartContext)
  const actualPage=useParams();
  const estrellas = Math.trunc(parseInt(datos.rating.rate));
  const fraccion = Math.round((parseFloat(datos.rating.rate) - estrellas) * 10);
  console.log("Estrellas", estrellas, "fraccion", fraccion);
  const [stockItem, setStockItem] = useState(data.rating.count);
  
  const [quantity, setQuantity] = useState(0);
  // const [condicion, setCondicion] = useState(false);
let condicion=false;
  const onAdd = () => {
    cartSetter([
      ...cartData,
      {
        id: datos.id,
        title: datos.title,
        price: datos.price,
        quantity: quantity,
      },
    ]);
  };
  if (cartData.length > 0) {
    cartData.forEach((item) => {
      if (item.id === datos.id) {
        condicion=true;
        console.log("adrian",condicion)
      }
    });
  }
  console.log("itemDetail", datos.rating);
  console.log("decicion", condicion);
  return (
    <ItemDetailWraper color={color}>
      <ImageWraper>
        <StyledImage src={datos.image} />
      </ImageWraper>
      <DetailsWraper style={{ flexDirection: "nowrap" }}>
        <Typography variant="h6" color={"#333"}>
          {datos.title}
        </Typography>
        <Stars stars={estrellas} fraction={fraccion} color="#FFBF00" />

        <Price price={parseInt(datos.price) * 300} color="#2d572c" />
        <Itemcounter
          stockItem={stockItem}
          setStockItem={setStockItem}
          style={{ marginTop: "2rem" }}
          setQuantity={setQuantity}
          quantity={quantity}
        />
        <Link to={(condicion) ? "/cart":actualPage}>
          <Button
            variant="contained"
            size="large"
            style={{ alignSelf: "center" }}
            onClick={onAdd}
          >
            {(condicion) ? "Finalizar Compra": "Agregar al carrito"}
          </Button>
        </Link>
      </DetailsWraper>
    </ItemDetailWraper>
  );
}

export default ItemDetail;
