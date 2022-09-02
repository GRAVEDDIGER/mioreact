import "./App.css";
import ItemDetailContainer from "./components/ItemDetailContainer";
import { ItemListContainer } from "./components/ItemListContainer";
import NavBar, { MenuItem } from "./components/NavBar";
import logo from "./images/miologo.png";
import imagenDetalle from "./images/detalles.jpg";
import React, { useState } from "react";
import Price from "./components/Price";
const colors = {
  primary: "#9C805C",
  secondary: "#E8C9A0",
  accent: "#B189E8",
  strongAccent: "#7B649C",
  background: "#f46b45",
  lightBackground: "#f5f5f5",
};
function App() {
  const [id, setid] = useState(null);
  function handleHome(e) {
    setid(null);
  }
  return (
    <div className="App">
      <NavBar
        titleHeader="Mio Sublimacion"
        logoImage={logo}
        colorBackground={colors.background}
        gradient1={colors.primary}
        gradient2={colors.secondary}
        foreColor={colors.accent}
        headerHeight="120px"
      >
        <MenuItem handleClick={handleHome}>Home</MenuItem>
        <MenuItem>Quienes somos?</MenuItem>
        <MenuItem>Catalogo</MenuItem>
        <MenuItem>Contacto</MenuItem>
      </NavBar>

      <ItemListContainer
        greeting="Bienvenidos a MIO Sublimacion"
        shadow={colors.primary}
        slogan="Diseños personalizados segun tus necesidades"
        color={colors.lightBackground}
        datosSetter={setid}
        datos={id}
      />
      <ItemDetailContainer
        imagen={imagenDetalle}
        datos={id}
        datosSetter={setid}
        shadow={colors.primary}
        color={colors.lightBackground}
        greeting="Detalles del producto"
      />
    </div>
  );
}

export default App;
