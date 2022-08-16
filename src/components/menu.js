import React from "react";
import { useRef } from "react";
import styled from "styled-components";
import { useResize } from "../hooks/useresize";
import { BsCart4 } from "react-icons/bs";


///////////////////////////////
//  STYLED COMPONENTS STYLES //
///////////////////////////////
const DivLogo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0;
  margin: 0;
  height: 100%;
`;
const DivImage = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  > img {
    justify-content: flex-start;
    align-items: center;
    height: 75px;
  }
`;
////////////
// TITULO //
////////////
const TitleH1 = styled.h1`
  display: ${(props) => (props.logoImage !== "" ? 'none' : 'flex')};
  font-weight: bold;
`;

///////////////////
//HAMBURGUER ICON//
///////////////////
const HamburguerStyled = styled.div`
  display: block;
  background-color: #fff;
  position: absolute;
  height: 4px;
  width: 30px;
  transition: transform 400ms cubic-bezier(0.23, 1, 0.32, 1);
  border-radius: 2px;
  &::before,
  &::after {
    display: block;
    background-color: #fff;
    position: absolute;
    height: 4px;
    width: 30px;
    transition: transform 400ms cubic-bezier(0.23, 1, 0.32, 1);
    border-radius: 2px;
  }
  &::before {
    content: "";
    margin-top: -8px;
    transform: rotate(${(props) => (props.isActive ? "405deg" : "0deg")});
  }
  &::after {
    content: "";
    margin-top: 8px;
    transform: rotate(${(props) => (props.isActive ? "-405deg" : "0deg")});
  }
`;
//////////////////////
//HAMBURGUER BUTTON //
//////////////////////
const HamburguerButton = styled.button`
  display: none;
  background: transparent;
  z-index: 1;
  border: none;
  height: 30px;
  width: 30px;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 700px) {
    display: flex;
  }
`;

///////////////////
// HEADER STYLES //
///////////////////
const HeaderStyled = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  background-color: ${(props) => props.colorBackground};
  background: linear-gradient(
    to left,
    ${(props) => props.gradient1},
    ${(props) => props.gradient2}
  );
  color: ${(props) => props.foreColor};
  height: ${(props) => props.headerHeight} !important;
  padding: 1em;
`;

////////////////
//MENU STYLES //
////////////////
const MenuStyled = styled.ul`
  display: flex;
  flex-direction: row;
  list-style-type: none;
  margin: 0;
  padding: 0;
  opacity: 0;
  transition: opacity 0.8s ease;
  align-self: flex-end;
  @media (max-width: 700px) {
    position: absolute;
    top: 0;
    margin-top: ${(props) => props.headerHeight};
    left: 0;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    background: ${(props) => props.colorBackground};
    color: ${(props) => props.foreColor};
    border: 4px ${(props) => props.colorBackground}60 solid;
    box-shadow: 5px 5px 15px ${(props) => props.colorBackground}20;
    opacity: 0;
  }
`;

///////////////////
//MENUITEM STYLES//
///////////////////

const StyledLi = styled.li`
  margin: 0 1rem;
  overflow: hidden;
  background-color: ${(props) => props.colorBackground};
  color: ${(props) => props.foreColor};
  &:hover {
    background-color: ${(props) => props.colorBackground}80;
    color: ${(props) => props.foreColor}80;
  }
`;
const StyledItemButton = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  font-size: 1.1rem;
  font-weight: bold;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: transparent;
  color: ${(props) => (props.foreColor ? props.foreColor : "#FFFFFF")};
  &:hover {
    color: ${(props) => (props.foreColor ? props.foreColor : "#FFFFFF")}80;
    transition: color 0.7s ease;
  }
`;
const CartWrap = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-end;
padding-left: 1em;
margin-left: 1em;
button{
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
const MenuWraper = styled.div`
display: flex;
flex-direction: column;
align-items: flex-end;
text-align: end;
div{

  margin-bottom: 2rem;
  margin-right: 1em;

}
`;
const HamburguerWraper =styled.div`
display: flex;
flex-direction: column-reverse;
align-items: flex-end;
button{
  margin-right: 1rem;
}
`;
////////////////////////
// MenuItem Component //
////////////////////////
export const MenuItem = ({ children, foreColor, colorBackground }) => {
  return (
    <>
      <StyledLi foreColor={foreColor} colorBackground={colorBackground}>
        <StyledItemButton
          foreColor={foreColor}
          colorBackground={colorBackground}
        >
          {" "}
          {children}{" "}
        </StyledItemButton>{" "}
      </StyledLi>{" "}
    </>
  );
};
/////////////////////////
//    Menu Component   //
/////////////////////////
export default function Menu({
  logoImage,
  imageText,
  children,
  colorBackground = "#00BAF0",
  gradient1 = "#f46b45",
  gradient2 = "#eea849",
  foreColor = "#FFFFFF",
  headerHeight = "50px",
  titleHeader = "",
}) {
  const hamburguerIcon = useRef(0);
  const menuReference = useRef(0);
  const toggleMenu = () => {
    menuReference.current.classList.toggle("show");
    hamburguerIcon.current.classList.toggle("rotate");
  };
  useResize(menuReference, hamburguerIcon);
  return (
    <HeaderStyled
      colorBackground={colorBackground}
      gradient1={gradient1}
      gradient2={gradient2}
      foreColor={foreColor}
      headerHeight={headerHeight}>
      <DivLogo>
        <DivImage>
          <img src={logoImage} alt={imageText} />
        </DivImage>
        <TitleH1> {titleHeader} </TitleH1>
      </DivLogo>
      <HamburguerWraper>
      <HamburguerButton onClick={toggleMenu}>
        <HamburguerStyled ref={hamburguerIcon} isActive={false} />
      </HamburguerButton>
      {/* <div> */}
<MenuWraper> 
<CartWrap>
<button>ingresar</button>

         <BsCart4 style={{}}/>
         </CartWrap>
      <MenuStyled
        ref={menuReference}
        colorBackground={colorBackground}
        foreColor={foreColor}
        headerHeight={headerHeight}
      >
       {children}
      </MenuStyled>
      </MenuWraper>
</HamburguerWraper>
      {/* </div> */}
    </HeaderStyled>
  );
}
