import React, { useState, useContext } from "react";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import Stars from "./Stars";
import { Itemcounter } from "./itemcount";
import { Button } from "@mui/material";
import Price from "./Price";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { CartContext } from "./CartContext";
import { ColorsContext } from "./ColorsContext";
import { toast, ToastContainer } from "react-toastify";

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
  @media (max-width: 410px) {
    width: 100%;
    margin: 0.5rem 0;
  }
  @media (max-width: 1200px) {
    align-items: flex-start;
    margin: 2rem 1;
  }
`;
const StyledImage = styled.img`
  padding: 2rem;
  margin: 1rem;
  max-height: 450px;
  max-width: 350px;
  box-shadow: 2px 2px 15px #333;
  background-color: #fff;
  @media (max-width: 410px) {
    width: 100%;
    margin: 0;
  }
`;
const DetailsWraper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  text-align: right;
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
  @media (max-width: 410px) {
    > h6 {
      font-size: 1.2rem;
    }
  }
`;

function ItemDetail({ datos }) {
  const [cartData, addItem] = useContext(CartContext);
  const actualPage = useParams();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(0);
  const [colors] = useContext(ColorsContext);
  let condicion = false;
  const addedToCart = (text) => {
    toast.success(text, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  // funcion que agrega el item al carrito
  const onAdd = () => {
    addedToCart("Agregado al carrito");
    addItem(id, datos.price, datos.title, quantity);
  };
  //aca se verifica si el item en la vista esta en el carrito para evaluar el render condicional del boton
  if (cartData.length > 0) {
    cartData.forEach((item) => {
      if (item.id === id) {
        condicion = true;
      }
    });
  }
  return (
    <ItemDetailWraper color={colors.lightBackground}>
      <ToastContainer
        position="top-right"
        autoClose={4500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ImageWraper>
        <StyledImage src={datos.image} />
      </ImageWraper>
      <DetailsWraper style={{ flexDirection: "nowrap" }}>
        <Typography variant="h6" color={"#333"}>
          {datos.title}
        </Typography>
        <Stars
          firebaseStars={datos.rating.rate.toString().trim()}
          color="#FFBF00"
        />

        <Price
          price={parseInt(datos.price) * 300}
          color={colors.strongAccent}
        />
        {datos ? (
          <Itemcounter
            datos={datos}
            style={{ marginTop: "2rem", justifyContent: "right" }}
            setQuantity={setQuantity}
            quantity={quantity}
          />
        ) : null}
        <Link
          to={condicion ? "/cart" : actualPage}
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="contained"
            size="large"
            style={{ alignSelf: "center" }}
            onClick={!condicion ? onAdd : null}
          >
            {condicion ? "Finalizar Compra" : "Agregar al carrito"}
          </Button>
        </Link>
      </DetailsWraper>
    </ItemDetailWraper>
  );
}

export default ItemDetail;
