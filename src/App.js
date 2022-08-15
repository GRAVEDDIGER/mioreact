import "./App.css";
import Menu, { MenuItem } from "./components/menu";
import logo from "./images/miologo.png";

function App() {
  return (
    <div className="App">
      <Menu
        titleHeader="Mio Sublimacion"
        logoImage={logo}
        colorBackground="#f46b45"
        gradient1="#f46b45"
        gradient2="#eea849"
        foreColor="#FFFFFF"
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
