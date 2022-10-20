import { useContext, useState, useEffect } from "react";
import { CartContext } from "../components/CartContext";
import { ColorsContext } from "../components/ColorsContext";
import { AuthContext } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { dataUpdate } from "../funciones/firebaseHLP";
import uuid from "react-uuid";

const initialUserState = { name: "", lastName: "", mail: "", phoneNumber: "" };

function useCart() {
  //CONTEXTOS Y ESTADOS
  const [cartData, , , clearCart] = useContext(CartContext);
  const [colors] = useContext(ColorsContext);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userState, setUserState] = useState(initialUserState);
  const [quota, setQuota] = useState("1");
  const [priceState, setPriceState] = useState(0);

  //TOSTIFY
  const orderFinalized = (text) => {
    toast.success(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const isNotLogued = (text) => {
    toast.warning(text, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    setPriceState(0);
    cartData.forEach((item) => {
      setPriceState(
        (prevState) =>
          prevState + parseFloat(item.price) * 300 * parseInt(item.quantity)
      );
    });
  }, [cartData]);

  //FUNCIONES

  const intrests = (price, quotas) => {
    let montlyFee = (price * 60) / 100 / 12;
    let totalFee = price + montlyFee * quotas;
    return parseInt(totalFee / quotas);
  };

  const handleQuotasChange = (e) => setQuota(e.target.value);

  const dataBaseUpdate = () => {
    if (auth.mail !== "") {
      const newOrder = {
        items: { ...cartData },
        total: priceState,
        date: new Date(),
        user: {
          ...auth,
          name: userState.name,
          mail: userState.mail,
          phoneNumber: userState.phoneNumber,
          lastName: userState.lastName,
        },
        paymentMethod: {
          quotas: quota,
          quotaValue: intrests(priceState, quota),
          finalPrice: intrests(priceState, quota) * quota,
        },
      };
      const orderId = uuid();
      let products = [];
      cartData.forEach((product) =>
        products.push({ id: product.id, quantity: product.quantity })
      );
      dataUpdate(orderId, newOrder, auth, products);
      orderFinalized(`Compra realizada su numero de orden es : ${orderId}`);
      clearCart();
      setTimeout(() => {
        navigate("/");
      }, 5000);
    } else {
      isNotLogued("Debes ingresar al sitio para comprar redirigiendo...");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };
  return {
    cartData,
    colors,
    userState,
    setUserState,
    setQuota,
    handleQuotasChange,
    dataBaseUpdate,
    priceState,
  };
}

export default useCart;
