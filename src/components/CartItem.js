import React,{useContext} from 'react'
import { CartContext } from './CartContext'
import styled from 'styled-components'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Price from './Price';
import { ColorsContext } from './ColorsContext';

const ItemData = styled.tr`
display: flex;
width: 100%;
flex-grow: column wrap;
list-style: none;
justify-content: space-around;
align-items: center;
padding:1rem;
margin-top:0.5rem;
box-shadow:2px 2px 15px #333;
min-height: 80px;
>td {
  align-items: center;
  align-content: center;
  justify-content: center;
  font-family:"Roboto",sans-serif;
}
`;
const Trash =styled(DeleteForeverIcon)`
color: ${props=>props.color};
&:hover{
  transform: scale(1.05);
  filter: saturate(180%) ;
  transition: all 0.3s ease;
}
`;
function CartItem({title,price,quantity,id}) {
   const [,,removeItem] =useContext(CartContext)
   const handleDelete = id =>removeItem(id)
   const [colors]=useContext(ColorsContext)
  return (
        <ItemData id={id}>
            <td style={{width:"40%"}}  > {title}</td>
            <td style={{width:"20%"}} ><Price price={price*300} isMarginZero={true} color="#333" /></td>
            <td style={{width:"20%",textAlign:'right'}} > {quantity} unidades</td>
            <td style={{width:"20%",textAlign:'right'}} ><Trash color={colors.background} onClick={()=>handleDelete(id)}/></td>
        </ItemData>

  )
}

export default CartItem