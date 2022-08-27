import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {  CardActionArea, CardActions, colors } from "@mui/material";
import { Itemcounter } from "./itemcount";
import styled from "styled-components";
const ActionsWraper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-content: center;
align-items: center;
`;
const BotonComprar =styled.button`
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
&:hover{
  color: #1976d2;
  border: 1px solid #d5d5d5;
  transition: border,color 1s ease;
  
}
`

export default function ProductCard({color}) {
  return (
    <Card sx={{ maxWidth: 345 }} style={{margin:'1rem'}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="http://placekitten.com/300/200"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Pequeño gatito
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Animal de compania, domestico, cariñoso y de buen sabor.
          </Typography>
        </CardContent>

      </CardActionArea>
      <CardActions style={{justifyContent:"center"}}>
        <ActionsWraper>
        <Itemcounter />
    <BotonComprar>Comprar</BotonComprar>
        </ActionsWraper>

      </CardActions>
    </Card>
  );
}
