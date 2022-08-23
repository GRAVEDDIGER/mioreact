import React from 'react';
import styled from 'styled-components';

const StyledH2=styled.h2`
display: flex;
flex-wrap: wrap;
text-align: center;
justify-content: center;
font-size:22px;
margin:1rem;
color: ${(props)=>props.color};

`
export const ItemListContainer = ({greeting,children,color}) => {
  return (
    <>
    <StyledH2 color={color}>{greeting}</StyledH2>
   {children}
    
   </>

  )
}
