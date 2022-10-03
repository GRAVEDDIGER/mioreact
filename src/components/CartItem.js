import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import styled from "styled-components";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Price from "./Price";
import { ColorsContext } from "./ColorsContext";

const ItemData = styled.tr`
  display: flex;
  width: 100%;
  flex-grow: column wrap;
  list-style: none;
  justify-content: space-around;
  align-items: center;
  padding: 1rem;
  margin-top: 0.5rem;
  box-shadow: 2px 2px 15px #333;
  min-height: 80px;

  > td {
    align-items: center;
    align-content: center;
    justify-content: center;
    font-family: "Roboto", sans-serif;
  }
  .itemTitle {
    width: 40%;
  }
  .itemPrice {
    width: 20%;
  }
  .temQuantity {
    width: 20%;
    text-align: right;
  }
  .trashItem {
    width: 20%;
    text-align: right;
  }

  @media (max-width: 1000px) {
    flex-wrap: nowrap;
    flex-direction: column;
    text-align: center;
    padding: 0 1rem;
    > td {
      text-align: center;
      padding: 0 1rem;
    }
    .itemTitle {
      width: 100% !important;
      font-size: 1.2rem;
      margin: 1rem;
      font-weight: bolder;
      flex-wrap: nowrap;
    }
    .itemPrice {
      margin-bottom: 1rem;
      text-align: center;
      width: 100%;
      > div {
        text-align: center;
      }
    }
    .temQuantity {
      width: 30% !important;
      margin-bottom: 1rem;
      font-size: 1rem;
      font-weight: normal;
      text-align: center;
    }
    .trashItem {
      width: 30% !important;
      text-align: center;
      margin: 1rem 0;
      font-size: 2rem;
    }
  }
  @media (max-width: 550px) {
    padding: 0.2rem 0.5rem;
    margin: 0;
    margin-bottom: 0.5rem;
  }
`;
const Trash = styled(DeleteForeverIcon)`
  color: ${(props) => props.color};
  &:hover {
    transform: scale(1.05);
    filter: saturate(180%);
    transition: all 0.3s ease;
  }
`;
function CartItem({ title, price, quantity, id }) {
  const [, , removeItem] = useContext(CartContext);
  const handleDelete = (id) => removeItem(id);
  const [colors] = useContext(ColorsContext);
  return (
    <ItemData id={id}>
      <td className="itemTitle"> {title}</td>
      <td className="itemPrice">
        <Price price={price * 300} isMarginZero={true} color="#333" />
      </td>
      <td className="itemQuantity"> {quantity} unidades</td>
      <td className="trashItem">
        <Trash color={colors.background} onClick={() => handleDelete(id)} />
      </td>
    </ItemData>
  );
}

export default CartItem;
