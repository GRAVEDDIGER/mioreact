export function pesosArgentinos(price){
    let priceString=price.toString().split("");
    let counter =1;
    let result = priceString.reverse().map((letra) => {
        if (counter > 2) {
          counter = 1;
          return "." + letra;
        } else {
          counter++;
          return letra;
        }
      });

      result =result.reverse().join("");
      if  (result.substring(0,1)=== ".") {
        result =result.substring(1);}
        return result
}