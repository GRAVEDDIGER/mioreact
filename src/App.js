import "./App.css";
import NavBar, { MenuItem } from "./components/NavBar";
import logo from "./images/miologo.png";

const colors={
  primary:'#9C805C',
  secondary:'#E8C9A0',
  accent:'#B189E8',
  strongAccent:'#7B649C',
  background:'#f46b45'
}
function App() {
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
        
        <MenuItem >
          Home
        </MenuItem>
        <MenuItem>Quienes somos?</MenuItem> 
        <MenuItem>Catalogo</MenuItem>
        <MenuItem>Contacto</MenuItem>
      </NavBar>
    </div>
  );
}

export default App;
