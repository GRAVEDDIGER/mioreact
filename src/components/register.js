import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { getFirestore, getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "../funciones/firebase";
import { useNavigate } from "react-router-dom";

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 80%;
  background-color: ${(props) => props.color.lightBackground};
  box-shadow: 3px 3px 15px #333;
  padding-bottom: 2rem;

  > h2 {
    padding-top: 0.5rem;
    margin-top: 0;
    font-size: 1.7rem;
    font-weight: bold;
    font-family: "Roboto", sans-serif;
    text-align: center;
    text-shadow: 1px 0px 2rem ${(props) => props.color.secondary};
  }
`;
const LoginInputBox = styled.input`
  border-radius: 10px;
  outline: 0;
  border: 2px solid ${(props) => props.backgroundColor.primary};
  background-color: ${(props) => props.backgroundColor.lightBackground};
  width: 300px;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 0;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
const RegisterDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem 1rem;
  justify-content: space-between;
  margin: 0;
  > input {
    margin: 0 0.5rem;
  }
`;
const RegisterDivCol = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0.5rem;
  padding: 0;
`;
const ValidationError = styled.p`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 0;
  font-weight: bold;
  color: #ff0000;
  font-size: 12px;
  padding: 1px 0;
  margin: 3px 0;
`;
function InputRegister({
  colors,
  placeholder,
  onBlur,
  value,
  name,
  onChangeHandle,
  error,
  style,
}) {
  return (
    <RegisterDivCol style={style}>
      <LoginInputBox
        type="text"
        backgroundColor={colors}
        placeholder={placeholder}
        onBlur={onBlur}
        value={value[name]}
        name={name}
        onChange={onChangeHandle}
        style={style}
      />
      <ValidationError>
        &nbsp;
        {error ? error : ""}
      </ValidationError>
    </RegisterDivCol>
  );
}
function RegisterForm({
  colors,
  onChangeHandle,
  onBlurHandle,
  formData,
  error,
  onSubmitForm,
  setAuth,
}) {
  const navigate = useNavigate();
  const handleRegister = (e) => {
    onSubmitForm(e);
    if (error) {
      addDoc(collection(db, "users"), formData);
      setAuth(formData);
      navigate("/");
    }
  };
  // crear funcion para el boton de registro que llame a onSubmit form y que luego si valida pase a guardar los
  //datos en Firebase
  return (
    <>
      <br />
      <LoginForm color={colors} onSubmit={handleRegister}>
        <h2>Registro</h2>
        <RegisterDivCol>
          <RegisterDiv>
            <InputRegister
              colors={colors}
              placeholder="Nombre"
              onBlur={onBlurHandle}
              name="name"
              value={formData}
              error={error.name}
              onChangeHandle={onChangeHandle}
            />
            <InputRegister
              colors={colors}
              placeholder="Apellido"
              name="lastName"
              onBlur={onBlurHandle}
              value={formData}
              error={error.lastName}
              onChangeHandle={onChangeHandle}
            />
          </RegisterDiv>
          <RegisterDiv>
            <InputRegister
              colors={colors}
              placeholder="Codigo de Area"
              name="areaCode"
              onBlur={onBlurHandle}
              value={formData}
              error={error.areaCode}
              onChangeHandle={onChangeHandle}
            />
            <InputRegister
              colors={colors}
              placeholder="Numero de telefono"
              name="phoneNumber"
              onBlur={onBlurHandle}
              value={formData}
              error={error.phoneNumber}
              onChangeHandle={onChangeHandle}
            />
          </RegisterDiv>
          <RegisterDiv>
            <InputRegister
              colors={colors}
              placeholder="Calle"
              name="street"
              onBlur={onBlurHandle}
              value={formData}
              error={error.street}
              onChangeHandle={onChangeHandle}
            />
            <InputRegister
              colors={colors}
              placeholder="Altura"
              name="number"
              onBlur={onBlurHandle}
              value={formData}
              error={error.number}
              onChangeHandle={onChangeHandle}
            />
          </RegisterDiv>
          <RegisterDiv>
            <InputRegister
              colors={colors}
              placeholder="Localidad"
              name="department"
              onBlur={onBlurHandle}
              value={formData}
              error={error.department}
              onChangeHandle={onChangeHandle}
            />
            <InputRegister
              colors={colors}
              placeholder="Codigo Postal"
              name="zipCode"
              onBlur={onBlurHandle}
              value={formData}
              error={error.zipCode}
              onChangeHandle={onChangeHandle}
            />
          </RegisterDiv>
          <RegisterDiv>
            <InputRegister
              colors={colors}
              placeholder="e-Mail"
              name="mail"
              onBlur={onBlurHandle}
              value={formData}
              error={error.mail}
              onChangeHandle={onChangeHandle}
              style={{ width: "100%" }}
            />
          </RegisterDiv>
        </RegisterDivCol>
        <br />
        <Button variant="contained" onClick={handleRegister}>
          Registrar Datos
        </Button>
      </LoginForm>
    </>
  );
}

export default RegisterForm;
