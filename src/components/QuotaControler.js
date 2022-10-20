import { pesosArgentinos } from "../funciones/pesosargentinos";
import styled from "styled-components";
const Holder = styled.div`
  display: flex;
  background-color: ${(props) => props.backColor};
  box-shadow: 3px 0px 15px #333;
  padding: 1rem 2rem;
  border-radius: 15%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: space-around;
  font-family: "Roboto" sans-serif;
  color: #fff;
  text-shadow: 2px 2px 15px #333;
  font-weight: bold;
  font-size: 1.5em;
  margin: 1rem 0.5rem;
  > ul {
    font-family: "Roboto";
    font-weight: 600;
    margin: 0;
    padding: 0;
    font-size: 1rem;
    > li {
      font-family: "Roboto" sans-serif;
      text-decoration: none;
      list-style: none;
      margin: 0;
      padding: 0;
    }
  }
`;
function QuotaController({ handleQuotasChange, colors, priceState }) {
  const intrests = (price, quotas) => {
    let montlyFee = (price * 60) / 100 / 12;
    let totalFee = price + montlyFee * quotas;
    return parseInt(totalFee / quotas);
  };
  return (
    <Holder backColor={colors.primary}>
      <ul>
        <li>
          <input
            type="radio"
            name="cuotas"
            value="1"
            onChange={(e) => handleQuotasChange(e)}
          />
          <label htmlFor="cuotas">
            1 pago de{" "}
            <strong style={{ color: "#333", fontWeight: "bold" }}>
              {pesosArgentinos(priceState)}$
            </strong>
          </label>
        </li>
        <li>
          <input
            type="radio"
            name="cuotas"
            value="3"
            onChange={(e) => handleQuotasChange(e)}
          />
          <label htmlFor="cuotas">
            3 cuotas de{" "}
            <strong style={{ color: "#333", fontWeight: "bold" }}>
              {pesosArgentinos(intrests(priceState, 3))}$
            </strong>
          </label>
        </li>
        <li>
          <input
            type="radio"
            name="cuotas"
            value="6"
            onChange={(e) => handleQuotasChange(e)}
          />
          <label htmlFor="cuotas">
            6 cuotas de{" "}
            <strong style={{ color: "#333", fontWeight: "bold" }}>
              {pesosArgentinos(intrests(priceState, 6))}$
            </strong>
          </label>
        </li>
        <li>
          <input
            type="radio"
            name="cuotas"
            value="9"
            onChange={(e) => handleQuotasChange(e)}
          />
          <label htmlFor="cuotas">
            9 cuotas de{" "}
            <strong style={{ color: "#333", fontWeight: "bold" }}>
              {pesosArgentinos(intrests(priceState, 9))}$
            </strong>
          </label>
        </li>
        <li>
          <input
            type="radio"
            name="cuotas"
            value="12"
            onChange={(e) => handleQuotasChange(e)}
          />
          <label htmlFor="cuotas">
            12 cuotas de{" "}
            <strong style={{ color: "#333", fontWeight: "bold" }}>
              {pesosArgentinos(intrests(priceState, 12))}$
            </strong>
          </label>
        </li>
      </ul>
    </Holder>
  );
}
export default QuotaController;
