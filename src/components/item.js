import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import { Itemcounter } from "./itemcount";
import styled from "styled-components";
import {httpRequest} from '../funciones/consultaaapi'
const ActionsWraper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
`;
const BotonComprar = styled.button`
  background-color: transparent;
  color: #42a5f5;
  padding: 1rem;
  box-shadow: 4px 4px 10px #d5d5d5;
  outline: none;
  border: 1px solid transparent;
  border-radius: 15%;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.3rem;
  text-align: center;
  align-self: center;
  font-family: sans-serif;
  &:hover {
    color: #1976d2;
    border: 1px solid #d5d5d5;
    transition: border, color, background-color 1s ease;
    background-color: #f1f1f1;
  }
  &:active {
    box-shadow: inset 3px 3px 15px ${(props) => props.color};
  }
`;
const StyledCard = styled(Card)`
  box-shadow: 2px 2px 10px ${(props) => props.color};
  margin: 1rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  max-width: 350px;
  @media (max-width: 400px) {
    margin: 0.5rem 0.5rem;
  }
`;

const StyledCardActionArea = styled(CardActionArea)`
  display: flex !important;
  justify-content: center;
  flex-direction: column;
`;
const StyledCardMedia = styled(CardMedia)`
  height: 180px;
  text-align: center;
  margin: 2rem 1rem;
  object-fit: scale-down;
  width: auto !important;
  @media (max-width: 400px) {
    margin: 1rem 0.5rem;
  }
`;
const StyledCardActions = styled(CardActions)`
  justify-content: center;
  align-content: space-between;
`;
const StockDisponible=styled(Typography)`
font-weight: bold;
text-align: center;
justify-content: center;
align-items: center;
align-content: center;
margin-top: 1rem;
`;
export default function Item({ color, title, description, image ,stock,id}) {
 const handleClick= async (e)=>{
try {
  const data = await httpRequest().get("https://fakestoreapi.com/products/"+e.target.id)  
  console.log(data)
  if (data.error) throw Error(data.statusText)
  else {
//aca va la logica que generara el modal. (debere crear una variable de estado para esto)
  }

} catch (error) {console.log(error);
  
}

 };
  return (
    <StyledCard
      color={color}
      title={title}
      description={description}
      image={image}
    >
      <StyledCardActionArea image={image}>
        <StyledCardMedia component="img" image={image} alt={title} />
        <CardContent title={title}>
          <Typography title={title} gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography
            description={description}
            variant="body2"
            color="text.secondary"
          >
            {description}
          </Typography>
        </CardContent>
      </StyledCardActionArea>
      <StyledCardActions>
        <ActionsWraper>
        <StockDisponible variant="body2">{`Stock disponible ${stock} `}</StockDisponible>

          <Itemcounter />
          <BotonComprar id={id} onClick={handleClick}>Comprar</BotonComprar>

        </ActionsWraper>
      </StyledCardActions>
    </StyledCard>
  );
}
