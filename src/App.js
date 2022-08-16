import "./App.css";
import Menu, { MenuItem } from "./components/menu";
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
      <Menu
        titleHeader="Mio Sublimacion"
        logoImage={logo}
        colorBackground={colors.background}
        gradient1={colors.primary}
        gradient2={colors.secondary}
        foreColor={colors.accent}
        headerHeight="120px"
      >
        <MenuItem colorBackground="#f46b45" foreColor="#FFFFFF">
          {" "}
          ONE{" "}
        </MenuItem>{" "}
        <MenuItem> TWO </MenuItem> <MenuItem> THREE </MenuItem>{" "}
      </Menu>{" "}
    </div>
  );
}

export default App;
