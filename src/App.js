import "./App.css";
import ItemDetailContainer from "./components/ItemDetailContainer";
import { ItemListContainer } from "./components/ItemListContainer";
import NavBar, { MenuItem } from "./components/NavBar";
import logo from "./images/miologo.png";
import imagenDetalle from "./images/detalles.jpg";
import React, { useState } from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Cart from './components/cart'
import CartProvider from "./components/CartContext";
import CartImage from './images/cart.jpg'
import ColorsContextProvider from "./components/ColorsContext";

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
const [cart, setCart] = useState([])
  const men = encodeURIComponent("men's clothing");
 const woman =encodeURIComponent("women's clothing")
  return (
    <ColorsContextProvider>
    <CartProvider>
    <div className="App">
      <BrowserRouter>
      <NavBar
        titleHeader="Mio Sublimacion"
        logoImage={logo}
        colorBackground={colors.background}
        gradient1={colors.primary}
        gradient2={colors.secondary}
        foreColor={colors.accent}
        headerHeight="120px"
      >
        <MenuItem pathName="/">Home</MenuItem>
        <MenuItem pathName="/category/electronics">Electronics</MenuItem>
        <MenuItem pathName="/category/jewelery">Jewelery</MenuItem>
        <MenuItem pathName={`/category/${men}`}>Men's clothing</MenuItem>
        <MenuItem pathName={`/category/${woman}`}>Women's clothing</MenuItem>

      </NavBar>
<Routes>
     <Route path="/"element={<ItemListContainer
        greeting="Bienvenidos a MIO Sublimacion"
        shadow={colors.primary}
        slogan="Diseños personalizados segun tus necesidades"
        color={colors.lightBackground}
        datosSetter={setid}
        datos={id}
      />}/>
           <Route path="/category/:category" element={<ItemListContainer
        greeting="Bienvenidos a MIO Sublimacion"
        shadow={colors.primary}
        slogan="Diseños personalizados segun tus necesidades"
        color={colors.lightBackground}
        datosSetter={setid}
        datos={id}
      />}/>
     <Route path="/item/:id" element={<ItemDetailContainer
        imagen={imagenDetalle}
        datos={id}
        datosSetter={setid}
        cartSetter={setCart}
        cartData={cart}
        shadow={colors.primary}
        color={colors.lightBackground}
        greeting="Detalles del producto"
      />}/>
      <Route path="/cart" element={<Cart image={CartImage} priceColor={colors.accent}/>} />
      </Routes>
    </BrowserRouter>
    </div>
    </CartProvider>
    </ColorsContextProvider>
  );
}

export default App;
