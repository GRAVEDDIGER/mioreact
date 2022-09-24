import React, { useContext, useState } from "react";
import { Button } from "@mui/material";
import styled from "styled-components";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import Price from "./Price";
import { CartContext } from "./CartContext";
import { ColorsContext } from "./ColorsContext";
import { pesosArgentinos } from "../funciones/pesosargentinos";
const StyledImageContainer = styled.div`
  display: flex;
  background-size: cover;
  background-clip: content-box;
  background-position: 0px -250px;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.image});
  height: 300px;
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
`;
const StyledTable = styled.table`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-top: 1rem;

  padding: 2rem;
  box-shadow: 3px 3px 15px #333;
`;
const TituloItems = styled.h2`
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
function Cart({ image }) {
  const [cartData] = useContext(CartContext);
  const [colors] = useContext(ColorsContext);
  let priceState = 0;
  cartData.forEach((item) => {
    priceState += parseFloat(item.price) * 300 * parseInt(item.quantity);
  });
  const [, setCuotas] = useState(1);
  const handleCuotasChange = (e) => setCuotas(e.target.value);
  const intrests = (price, cuotas) => {
    let interesesMensuales = (price * 60) / 100 / 12;
    let totalConIntereses = price + interesesMensuales * cuotas;
    return parseInt(totalConIntereses / cuotas);
  };
  return (
    <>
      <StyledImageContainer image={image}>
        <h3>CARRITO DE COMPRAS</h3>
      </StyledImageContainer>
      <StyledWrapper>
      {cartData.length ? <TituloItems>Lista de Compras</TituloItems>:null}
        {cartData.length ? (
          <StyledTable><tbody>
            {cartData.map(item =>{
              return(<CartItem
                title={item.title}
                price={item.price}
                quantity={item.quantity}
                id={item.id}
                key={item.id}
              />);
            })}
            </tbody>
          </StyledTable>
        ) : (
          <EmptyCart style={{ alignSelf: "center", textAlign: "center" }}>
            Carrito Vacio
          </EmptyCart>
        )}
     
        <br />
        {cartData.length ? (
          <BubbleWrapper>
            <Holder
              backColor={colors.secondary}
              priceColor={colors.strongAccent}
            >
              <strong>Precio Total: </strong>{" "}
              <Price price={priceState} color={colors.strongAccent} />
            </Holder>
            <Holder backColor={colors.secondary}>
              <ul>
                <li>
                  <input
                    type="radio"
                    name="cuotas"
                    value="1"
                    onChange={(e) => handleCuotasChange(e)}
                  />
                  <label htmlFor="cuotas">
                    1 pago
                    {pesosArgentinos(priceState)}$
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    name="cuotas"
                    value="3"
                    onChange={(e) => handleCuotasChange(e)}
                  />
                  <label htmlFor="cuotas">
                    3 cuotas con tarjeta
                    {pesosArgentinos(intrests(priceState, 3))}$
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    name="cuotas"
                    value="6"
                    onChange={(e) => handleCuotasChange(e)}
                  />
                  <label htmlFor="cuotas">
                    6 cuotas con tarjeta{" "}
                    {pesosArgentinos(intrests(priceState, 6))}$
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    name="cuotas"
                    value="9"
                    onChange={(e) => handleCuotasChange(e)}
                  />
                  <label htmlFor="cuotas">
                    9 cuotas con tarjeta
                    {pesosArgentinos(intrests(priceState, 9))}$
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    name="cuotas"
                    value="12"
                    onChange={(e) => handleCuotasChange(e)}
                  />
                  <label htmlFor="cuotas">
                    12 cuotas con tarjeta
                    {pesosArgentinos(intrests(priceState, 12))}$
                  </label>
                </li>
              </ul>
            </Holder>
          </BubbleWrapper>
        ) : null}
        {cartData.length ? (
          <Button variant="contained">Finalizar Compra</Button>
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
