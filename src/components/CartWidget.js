import React, { useContext } from "react";
import styled from "styled-components";
import { BsCart4 } from "react-icons/bs";
import Badge from "@mui/material/Badge";
import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
const CartWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-left: 1em;
  margin-left: 0.5em;
  cursor: pointer;
  button {
    margin: 0;
    padding: 0;
    cursor: pointer;
    background-color: transparent;
    color: #ffffff;
    font: 18px;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 1px;
    border: none;
    &:hover {
      color: #ffffff80;
    }
  }
  > svg {
    color: #ffffff;
    padding-left: 0.5rem;
    width: 24px;
    height: 24px;
    &:hover {
      color: #ffffff80;
    }
  }
  @media (max-width: 410px) {
    button {
      font-size: 12px;
      display: flex;
      flex-wrap: wrap;
      margin-right: 0;
    }
  }
`;

const CartWidget = () => {
  const [cartData] = useContext(CartContext);
  const { auth } = useContext(AuthContext);
  //evalua los contextos de cart y de auth para generar el widget con los render condicionales
  return (
    <CartWrap>
      <Link to="/login" style={{ textDecoration: "none", color: "#fff" }}>
        <button>
          {auth.name ? `Bienvenidx ${auth.name}` : "Ingresar/Registrarse"}
        </button>
      </Link>
      {cartData.length ? (
        <Link to="/cart" style={{ textDecoration: "none", color: "#fff" }}>
          <Badge
            style={{ marginLeft: "1rem" }}
            badgeContent={cartData.length}
            color="secondary"
          >
            <BsCart4 />
          </Badge>
        </Link>
      ) : null}
    </CartWrap>
  );
};
export default CartWidget;
