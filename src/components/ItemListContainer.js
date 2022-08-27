import React from 'react';
import styled from 'styled-components';
import bannerImage from '../images/baner.png'

const ItemListWraper =styled.div`
@font-face {
  font-family: Roboto;
  src: url('../fonts/Roboto-Bold.ttf');
}
display: flex;
flex-wrap: wrap;
flex-direction: column;
`;

const StyledImage = styled.div`
background-image: url(${prop=>prop.imagen});
display: flex;
flex-direction: column;
height: 300px;

font-size: 2.5rem;
font-smooth: inherit;
text-shadow: 3px 3px 5px black;
text-shadow: 1px 1px 3px black inset;
padding: 1rem;
font-weight: bold;
color: ${props=>props.color};
font-family: "Roboto" , sans-serif ;
background-repeat: no-repeat;
background-size: 100%,auto;
justify-content: space-between;
>p{
margin-bottom: 0;
  text-align: right;
  font-size: 2rem;

}
@media (max-width:900px){
  background-size:auto;
  text-align: center;
  align-content: center;
 justify-content:center;
 font-size: 3rem;

  p{
    display:none;
  font-size: 1.5rem;
}
@media (max-width:650px) {
 text-align: center;
 align-content: center;
 justify-content:center;
font-size:3.5rem;}


}
`;
const StyledChildren =styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;


`;
export const ItemListContainer = ({greeting,children,color}) => {
  return (
    <ItemListWraper>
      <StyledImage color={color} imagen={bannerImage}>{greeting} <p>Diseños personalizados segun tus necesidades</p> </StyledImage>
    <StyledChildren> {children}</StyledChildren>
    
   </ItemListWraper>

  )
}
