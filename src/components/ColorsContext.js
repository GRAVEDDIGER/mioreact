import { createContext ,useState} from "react";

export const ColorsContext = createContext();
const colorsPalette = {
    primary: "#9C805C", //marron oscuro
    secondary: "#E8C9A0", //marron claro
    accent: "#B189E8", //violeta
    strongAccent: "#7B649C", //violeta fuerte
    background: "#f46b45", //naranjoso
    lightBackground: "#f5f5f5", //gris ultra claro
  };

  
  function ColorsContextProvider({children}) {
    const [colors,setColors]=useState(colorsPalette)
    return (
<ColorsContext.Provider value={[colors,setColors]}>
{children}
</ColorsContext.Provider>    )
  }
  
  export default ColorsContextProvider