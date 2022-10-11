import React, { useContext } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "./AuthContext";
import { useLogin } from "../hooks/useLogin.js";
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
  @media (max-width: 720px) {
    width: 90%;
    padding: 0.5rem 1.5rem;
  }
  @media (max-width: 550px) {
    width: 90%;
    margin: 0;
  }
  @media (max-width: 450px) {
    width: 100%;
    margin: 0 1rem;
    padding: 0.5rem 1.5rem;
  }
`;
const LoginInputBox = styled.input`
  border-radius: 10px;
  outline: 0;
  border: 2px solid ${(props) => props.backgroundColor.primary};
  background-color: ${(props) => props.backgroundColor.lightBackground};
  width: 100%;
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
  @media (max-width: 950px) {
    flex-wrap: wrap;
  }
  @media (max-width: 550px) {
    flex-wrap: wrap;
    margin: 0;
    > input {
      margin: 0;
    }
  }
`;
const RegisterDivCol = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1.5rem;
  padding: 0;
  width: 100%;
  min-width: 300px;
  @media (max-width: 550px) {
    margin: 0;
  }
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
//COMPONENTE INPUT QUE TIENE ASOCIADO UN <P> </p> PARA PODER GENEREAR NOTIFICACION DE ERRORES , TOMA LOS DATOS QUE PASASN DESDE EL LOGIN COMPONENT
//SON CAMPOS CONTROLADOS POR UN STATE Y UN ONCHANGE HANDLER. USAN ONBLUR PARA VERIFICAR LA VALIDACION
function InputRegister({
  colors,
  placeholder,
  onBlur,
  value,
  name,
  onChangeHandle,
  error,
  style,
  password,
}) {
  return (
    <RegisterDivCol style={style}>
      <LoginInputBox
        type={password ? "password" : "text"}
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

//FORMULARIO DE REGISTRO
function RegisterForm({ colors }) {
  const {
    registerError,
    registerData,
    registerHandleBlur,
    registerHandleChange,
  } = useContext(AuthContext);

  const { handleRegister } = useLogin();

  return (
    <>
      <br />
      <LoginForm color={colors} onSubmit={handleRegister}>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <h2>Registro</h2>
        <RegisterDivCol>
          <RegisterDiv>
            <InputRegister
              colors={colors}
              placeholder="Nombre"
              onBlur={registerHandleBlur}
              name="name"
              value={registerData}
              error={registerError.name}
              onChangeHandle={registerHandleChange}
            />
            <InputRegister
              colors={colors}
              placeholder="Apellido"
              name="lastName"
              onBlur={registerHandleBlur}
              value={registerData}
              error={registerError.lastName}
              onChangeHandle={registerHandleChange}
            />
          </RegisterDiv>
          <RegisterDiv>
            <InputRegister
              colors={colors}
              placeholder="Codigo de Area"
              name="areaCode"
              onBlur={registerHandleBlur}
              value={registerData}
              error={registerError.areaCode}
              onChangeHandle={registerHandleChange}
            />
            <InputRegister
              colors={colors}
              placeholder="Numero de telefono"
              name="phoneNumber"
              onBlur={registerHandleBlur}
              value={registerData}
              error={registerError.phoneNumber}
              onChangeHandle={registerHandleChange}
            />
          </RegisterDiv>
          <RegisterDiv>
            <InputRegister
              colors={colors}
              placeholder="Calle"
              name="street"
              onBlur={registerHandleBlur}
              value={registerData}
              error={registerError.street}
              onChangeHandle={registerHandleChange}
            />
            <InputRegister
              colors={colors}
              placeholder="Altura"
              name="number"
              onBlur={registerHandleBlur}
              value={registerData}
              error={registerError.number}
              onChangeHandle={registerHandleChange}
            />
          </RegisterDiv>
          <RegisterDiv>
            <InputRegister
              colors={colors}
              placeholder="Localidad"
              name="department"
              onBlur={registerHandleBlur}
              value={registerData}
              error={registerError.department}
              onChangeHandle={registerHandleChange}
            />
            <InputRegister
              colors={colors}
              placeholder="Codigo Postal"
              name="zipCode"
              onBlur={registerHandleBlur}
              value={registerData}
              error={registerError.zipCode}
              onChangeHandle={registerHandleChange}
            />
          </RegisterDiv>
          <RegisterDiv>
            <InputRegister
              colors={colors}
              placeholder="e-Mail"
              name="mail"
              onBlur={registerHandleBlur}
              value={registerData}
              error={registerError.mail}
              onChangeHandle={registerHandleChange}
              style={{ width: "100%" }}
            />
          </RegisterDiv>
          <RegisterDiv>
            <InputRegister
              colors={colors}
              password={true}
              placeholder="Password"
              name="pass"
              onBlur={registerHandleBlur}
              value={registerData}
              error={registerError.pass}
              onChangeHandle={registerHandleChange}
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
