import React, { useContext, useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import bannerImage from "../images/baner.png";
// import { httpRequest } from "../funciones/consultaaapi";
import { ItemList } from "./itemlist";
import { useParams } from "react-router-dom";
import { ColorsContext } from "./ColorsContext";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { DataContext } from "./dataContext";
const firebaseConfig = {
  apiKey: "AIzaSyA_TpKjxfrKGsNESMwsyB-ymtS0BtMvqpc",
  authDomain: "miodata-d53a3.firebaseapp.com",
  projectId: "miodata-d53a3",
  storageBucket: "miodata-d53a3.appspot.com",
  messagingSenderId: "668742994113",
  appId: "1:668742994113:web:d08190b9c591db7a8cec40",
  measurementId: "G-D5G6PT3D6E",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const ItemListWraper = styled.div`
  background-color: ${(props) => props.color};
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  justify-content: center;
`;

const StyledImage = styled.div`
  background-image: url(${(prop) => prop.imagen});
  display: flex;
  flex-direction: column;
  height: 300px;
  box-shadow: 3px 3px 15px ${(prop) => prop.shadow};
  font-size: 2.5rem;
  font-smooth: inherit;
  text-shadow: 3px 3px 5px black;
  text-shadow: 1px 1px 3px black inset;
  padding: 1rem;
  font-weight: bold;
  color: ${(props) => props.color};
  font-family: "Roboto", sans-serif;
  background-repeat: no-repeat;
  background-size: 100%, auto;
  justify-content: space-between;
  > p {
    margin-bottom: 0;
    text-align: right;
    font-size: 2rem;
  }
  @media (max-width: 900px) {
    background-size: auto;
    text-align: center;
    align-content: center;
    justify-content: center;
    font-size: 3rem;
    p {
      display: none;
      font-size: 1.5rem;
    }
    @media (max-width: 650px) {
      text-align: center;
      align-content: center;
      justify-content: center;
      font-size: 3.5rem;
    }
  }
  @media (max-width: 400px) {
    width: 100%;
  }
`;

export const ItemListContainer = ({
  greeting,
  slogan,
  shadow,
  datosSetter,
}) => {
  const [, setDataContext] = useContext(DataContext);
  const [colors] = useContext(ColorsContext);
  const [dataBase, setdataBase] = useState([]);
  const { category } = useParams();

  const loadItems = useCallback(
    async (category) => {
      let dataContextArray = [];
      let firebaseId;
      let q;
      if (category) {
        q = query(
          collection(db, "products"),
          where("category", "==", category)
        );
      } else {
        q = query(collection(db, "products"), where("category", "!=", null));
      }
      const firebaseData = await getDocs(q);
      firebaseData.forEach((firebaseDoc) => {
        firebaseId = firebaseDoc.id;
        let documentData = firebaseDoc.data();
        documentData.id = firebaseId;
        dataContextArray = [...dataContextArray, documentData];
      });
      let filtredData = Object.values(dataContextArray);
      setdataBase(filtredData);
      setDataContext(filtredData);
    },
    [setdataBase, setDataContext]
  );
  useEffect(() => {
    loadItems(category);
  }, [loadItems, category]);
  return (
    <ItemListWraper color={colors.lightBackground}>
      <StyledImage
        color={colors.lightBackground}
        imagen={bannerImage}
        shadow={shadow}
      >
        {greeting} <p>{slogan}</p>
      </StyledImage>
      <ItemList dataBase={dataBase} />
    </ItemListWraper>
  );
};
