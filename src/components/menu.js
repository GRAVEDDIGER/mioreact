import React from "react";
import { useRef } from "react";
import styled from "styled-components";
import { useResize1 } from "../hooks/useresize";

// import "./menu.css";
const DivLogo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;
  const DivImage = styled.div`
    height: 0;
  `;
  const TitleH1 = styled.h1`
    font-weight: bold;
  `;
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
    }
    &::after {
      content: "";
      margin-top: 8px;
    }
  `;
 
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
    @media (max-width: 700px){
    display:flex;
    }
    
  `;



export default function Menu({
  logo,
  imageText,
  children,
  colorBackground = "#00BAF0",
  gradient1 = "#f46b45",
  gradient2 = "#eea849",
  foreColor = "#FFF",
  headerHeight = "50px",
  titleHeader=""
}) {
  const HeaderStyled = styled.header`
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: center;
    justify-content: space-between;
    background-color: ${colorBackground};
    background: linear-gradient(to left, ${gradient1}, ${gradient2});
    color: ${foreColor};
    height: ${headerHeight};
    padding: 1em;
  `;

  const MenuStyled = styled.ul`
  display: flex;
  flex-direction: row;
  list-style-type: none;
  margin: 0;
  padding: 0;
opacity:0;  
transition opacity 0.8s ease;
@media (max-width: 700px){
  position: absolute;
    top: 0;
    margin-top: ${headerHeight};
    left: 0;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    background:${colorBackground};
    color:${foreColor};
   }`
  const menuReference=useRef(0)
  const toggleMenu =()=>{
    console.log(menuReference)
    const Opacity =menuReference.current.style.opacity
    menuReference.current.style.opacity=(Opacity==1) ? 0 :1

  }
  useResize1(menuReference)
  return (
    <HeaderStyled>
      <DivLogo>
        <DivImage>
          <img src={logo} alt={imageText} />
        </DivImage>
        <TitleH1>{titleHeader}</TitleH1>
      </DivLogo>
      <HamburguerButton onClick={toggleMenu} >
        <HamburguerStyled />
      </HamburguerButton>
      {/* <CheckboxToggler id="menu-toggle" type="checkbox" /> */}
      {/* <label className="menu-button-container" htmlFor="menu-toggle">
        <div className="menu-button"></div>
      </label> */}
      <MenuStyled  ref={menuReference}>
        <li className="item">One</li>
        <li className="item">Two</li>
        <li className="item">Three</li>
        <li className="item">Four</li>
        <li className="item">Five</li>
      </MenuStyled>
    </HeaderStyled>
  );
}
