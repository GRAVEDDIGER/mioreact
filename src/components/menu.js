import React from "react";
import styled from "styled-components";

// import "./menu.css";
export default function Menu({logo,imageText,children,colorBackground='#00BAF0',gradient1='#f46b45',gradient2='#eea849',foreColor='#FFF',headerHeight='50px'}) {
const sectionStyled = styled.section`
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
`

  return (
<sectionStyled> 
<div className="logo-title">
        <div>
          <img src={logo} alt={imageText} />
        </div>
        <h1>{children}</h1>
      </div>
      <input id="menu-toggle" type="checkbox" />
      <label className="menu-button-container" htmlFor="menu-toggle">
        <div className="menu-button"></div>
      </label>
      <ul className="menu">
        <li className="item">One</li>
        <li className="item">Two</li>
        <li className="item">Three</li>
        <li className="item">Four</li>
        <li className="item">Five</li>
      </ul>
</sectionStyled>
);
}
