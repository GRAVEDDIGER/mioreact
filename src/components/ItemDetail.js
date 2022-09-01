import React,{useState} from 'react'
import styled from 'styled-components'
import Typography from '@mui/material/Typography'
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import uuid from 'react-uuid';

const ItemDetailWraper=styled.div`
width: 100%;
background-color: ${prop=>prop.color};
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: space-between;
`;
const ImageWraper =styled.div`
margin: 1rem 2rem;
max-height: 350px ;
width: auto;

`;
const StyledImage=styled.img`
padding: 2rem;
height: 350px;
`;
const DetailsWraper =styled.div`
display: flex;
flex-direction: column;
justify-content:flex-start;
align-items: flex-end;
text-align: left;
margin: 2rem;

`;
const StarsWraper=styled.div`
display: flex;
flex-direction:row;
margin: 0.5em;;
`;
function ItemDetail({datos,color}) {
    const starsComplete = Math.trunc(parseInt(datos.rating.rate));
    const starsIncomplete = (parseInt(datos.rating.rate)-starsComplete) ?true:false;
 const [estrellas, setestrellas] = useState([])
    for (let i=0;i<starsComplete;i++){
setestrellas([...estrellas,<StarIcon key={uuid()}/>])    
}
if (starsIncomplete) setestrellas([...estrellas,<StarHalfIcon key={uuid()} />])

  return (
    <ItemDetailWraper color={color}>
<ImageWraper>
<StyledImage src={datos.image}/>
</ImageWraper>
<DetailsWraper >
   <Typography variant="h5" color={"#333"} >{datos.title} </Typography>
   <StarsWraper>{estrellas.map(e=>e) }</StarsWraper>

 <Typography variant="h6" color={"green"} >{`${parseInt(datos.price)*300}$`} </Typography>
</DetailsWraper>
    </ItemDetailWraper>
  )
}

export default ItemDetail