import React from 'react';
import styled from 'styled-components';
import { BsCart4 } from "react-icons/bs";
const CartWrap = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-end;
padding-left: 1em;
margin-left: 1em;
cursor:pointer;
button{
  cursor:pointer;
  margin-right: 1em;
  background-color: transparent;
  color:#ffffff;
  font: 18px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
  border: none;
  &:hover{
    color:#ffffff80;

  }}
 > svg {
    color:#ffffff;
    color:'#FFF';
    width:24px;
    height:24px;
    &:hover{
      color:#ffffff80
    }
  }

`

const CartWidget = ()=>{
    return (
        <CartWrap>
        <button>ingresar</button>
                 <BsCart4/>
                 </CartWrap>
        
    )
}
export default CartWidget;