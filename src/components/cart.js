import React from "react";
import { Button } from "@mui/material";
import styled from "styled-components";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import Price from "./Price";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartUserForm from "./CartUserForm";
import QuotaController from "./QuotaControler";
import useCart from "../hooks/useCart";

const StyledImageContainer = styled.div`
  display: flex;
  background-size: cover;
  background-clip: content-box;
  background-position: 0px -250px;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.image});
  height: 300px;
  min-height: 300px;
  overflow: hidden;
  width: 100%;
  > h3 {
    font-family: "Roboto", sans-serif;
    margin-top: 0.5rem;
    color: #fff;
    text-shadow: 1px 1px 15px #333;
    margin-left: 1rem;
    font-size: 2.5rem;
    font-weight: bold;
    text-align: left;
  }
  @media (max-width: 900px) {
    background-position: 0px -200px;
  }
  @media (max-width: 800px) {
    background-position: 0px -150px;
  }
  @media (max-width: 700px) {
    background-position: 0px -100px;
  }
  @media (max-width: 600px) {
    background-position: 0px 0px;
  }
`;
const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  padding: 1rem;
`;

const Holder = styled.div`
  display: flex;
  background-color: ${(props) => props.backColor};
  box-shadow: 3px 0px 15px #333;
  padding: 1rem 2rem;
  border-radius: 15%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: space-around;
  font-family: "Roboto" sans-serif;
  color: #fff;
  text-shadow: 2px 2px 15px #333;
  font-weight: bold;
  font-size: 1.5em;
  margin: 1rem 0.5rem;
  > ul {
    font-family: "Roboto";
    font-weight: 600;
    margin: 0;
    padding: 0;
    font-size: 1rem;
    > li {
      font-family: "Roboto" sans-serif;
      text-decoration: none;
      list-style: none;
      margin: 0;
      padding: 0;
    }
  }
`;
const BubbleWrapper = styled.div`
  display: flex;
  margin: 1rem 0.5rem;
  width: 80%;
  justify-content: space-between;
  @media (max-width: 700px) {
    width: 100%;
  }
  @media (max-width: 550px) {
    flex-direction: column;
  }
`;
const StyledTable = styled.table`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-top: 1rem;

  padding: 2rem;
  box-shadow: 3px 3px 15px #333;

  @media (max-width: 700px) {
    width: 100%;
  }
  @media (max-width: 550px) {
    padding: 0;
    margin: 0.3rem 0.2rem;
    box-shadow: none;
  }
`;
const ItemsTitle = styled.h2`
  font-size: 2rem;

  font-family: "Roboto" sans-serif;
  font-weight: bold;
  text-align: center;
`;
const EmptyCart = styled.h3`
  font-size: 2rem;
  font-weight: bold;
  font-family: "Roboto" sans-serif;
`;
function CartItems({ cartData }) {
  return (
    <>
      {cartData.length ? <ItemsTitle>Lista de Compras</ItemsTitle> : null}
      {cartData.length ? (
        <StyledTable>
          <tbody>
            {cartData.map((item) => {
              return (
                <CartItem
                  title={item.title}
                  price={item.price}
                  quantity={item.quantity}
                  id={item.id}
                  key={item.id}
                />
              );
            })}
          </tbody>
        </StyledTable>
      ) : (
        <EmptyCart style={{ alignSelf: "center", textAlign: "center" }}>
          Carrito Vacio
        </EmptyCart>
      )}
    </>
  );
}
function PriceHolder({ priceState, colors }) {
  return (
    <Holder backColor={colors.primary} priceColor={colors.strongAccent}>
      <strong>Precio Total: </strong>{" "}
      <Price price={priceState} color={colors.accent} />
    </Holder>
  );
}
function Cart({ image }) {
  const {
    cartData,
    colors,
    userState,
    setUserState,
    setQuota,
    handleQuotasChange,
    dataBaseUpdate,
    priceState,
  } = useCart();

  return (
    <>
      <StyledImageContainer image={image}>
        <h3>CARRITO DE COMPRAS</h3>
      </StyledImageContainer>
      <StyledWrapper>
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
        <ToastContainer />
        <CartItems cartData={cartData} />

        <br />
        {cartData.length ? (
          <BubbleWrapper>
            <PriceHolder colors={colors} priceState={priceState} />
            <Holder backColor={colors.primary}>
              <CartUserForm userState={userState} setUserState={setUserState} />
            </Holder>
            <QuotaController
              handleQuotasChange={handleQuotasChange}
              setQuota={setQuota}
              colors={colors}
              priceState={priceState}
            />
          </BubbleWrapper>
        ) : null}

        {cartData.length &&
        userState.name !== "" &&
        userState.lastName !== "" &&
        userState.email !== "" &&
        userState.phone !== "" ? (
          <Button variant="contained" onClick={dataBaseUpdate}>
            Finalizar Compra
          </Button>
        ) : (
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="secondary">
              Volver a Home
            </Button>
          </Link>
        )}
      </StyledWrapper>
    </>
  );
}

export default Cart;
