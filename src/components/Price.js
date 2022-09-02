import React from "react";
import styled from "styled-components";
function Price({ price }) {
  let priceString = price.toString();
  let result = "";
  let i = priceString.length - 1;
  console.log(priceString);
  for (i = 0; i < priceString.length; i++) {
    let letra = priceString.splice(0, 1);
    const condicion = (i + 3) % 3;
    if (condicion === 0) {
      result = result + "." + letra;
    } else result = result + letra;
  }
  console.log("longitud", i);
  console.log("resultado", result);

  return <div style={{ fontSize: 40 }}>{result}</div>;
}

export default Price;
