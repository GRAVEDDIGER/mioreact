import { initializeApp } from "firebase/app";
import {
  getFirestore,
  query,
  where,
  collection,
  writeBatch,
  getDoc,
  doc,
  increment,
  getDocs,
} from "firebase/firestore";

//Toma el APIconfig desde una variable de entorno
const apiKey = JSON.parse(process.env.REACT_APP_API_KEY);

export const firebaseConfig = apiKey;
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const productsCollection = collection(db, "products");
export const usersCollection = collection(db, "users");
//Genera la Query segun la category que se pasa. por default tira un home
export const categoryQueryProducts = (category = "/") => {
  let q;
  if (category !== "/") {
    q = query(productsCollection, where("category", "==", category));
  } else {
    q = productsCollection;
  }
  return q;
};
// utiliza writeBatch esto guarda la orden en un nuevo documento con un id generado por react-uuid
// guarda la orden dentro del usuario logueado
// y atomicamente decrementa el valor del producto en la base de datos
export const dataUpdate = (id, orderData, userData, productsId) => {
  const docRef = doc(db, "orders", id);
  const batch = writeBatch(db);
  const userRef = doc(db, "users", userData.id);
  productsId.forEach((product) => {
    const prodRef = doc(db, "products", product.id);
    const decrement = -1 * parseInt(product.quantity);
    batch.update(prodRef, "rating.count", increment(decrement));
  });
  getDoc(userRef).then((user) => {
    const userData = [];
    userData.push(user.data());

    if (!userData[0].hasOwnProperty("orders")) userData[0]["orders"] = [];
    let newArray = {
      date: orderData.date,
      items: orderData.items,
      paymentMethod: orderData.paymentMethod,
      total: orderData.total,
    };

    let ordersArray = userData[0].orders;

    ordersArray.push(newArray);
    // userData[0].orders.forEach((order) => ordersArray.push(order));
    batch.update(userRef, "orders", ordersArray);
    batch.set(docRef, orderData);
    batch.commit();
  });
};
//funcion que retorna una promise con un objeto que continene los usuarios que coinciden con el mail y el lenght de ese array.
//se usa para evitar mails duplicados
export const getUserData = (mail) => {
  let userData = [];
  let response;
  const q = query(usersCollection, where("mail", "==", mail));
  const output = getDocs(q).then((documents) => {
    documents.forEach((doc) => {
      const objeto = { ...doc.data(), id: doc.id };
      userData.push(objeto);
    });
    const longitud = userData.length;
    // return [userData, userData.length];
    response = new Promise((resolve, reject) => {
      resolve({ ...userData, usersLength: longitud });
      reject("error");
    });
    return response;
  });
  return output;
};
