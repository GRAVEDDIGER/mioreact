import { useState, useEffect } from "react";

export const useResize = (referenciaMenu, referenciaHamburguesa) => {
  const [windowSize, setWidowSize] = useState(window.innerWidth);
  window.onresize = () => setWidowSize(window.innerWidth);

  useEffect(() => {
    if (windowSize > 700) {
      referenciaMenu.current.classList.add("show");
      referenciaHamburguesa.current.classList.add("rotate");
    } else {
      referenciaMenu.current.classList.remove("show");
      referenciaHamburguesa.current.classList.remove("rotate");
    }
  }, [windowSize, referenciaHamburguesa, referenciaMenu]);
};
