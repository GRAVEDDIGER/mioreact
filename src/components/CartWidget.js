import React, { useContext } from "react";
import styled from "styled-components";
import { BsCart4 } from "react-icons/bs";
import Badge from "@mui/material/Badge";
import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";
const CartWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-left: 1em;
  margin-left: 1em;
  cursor: pointer;
  button {
    cursor: pointer;
    margin-right: 1em;
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

    width: 24px;
    height: 24px;
    &:hover {
      color: #ffffff80;
    }
  }
`;

const CartWidget = () => {
  const [cartData] = useContext(CartContext);
  return (
    
    <CartWrap>
      <button>ingresar</button>
      {cartData.length ?( 
      <Link to="/cart" style={{ textDecoration: "none" ,color:"#fff"}}>
           <Badge badgeContent={cartData.length} color="secondary">
          <BsCart4  />
        </Badge>
      </Link>):null}
    </CartWrap>
  );
};
export default CartWidget;
