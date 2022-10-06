import React, { useState, useContext } from "react";
import styled from "styled-components";
import image from "../images/ingreso.jpg";
import { ColorsContext } from "./ColorsContext";
import { AuthContext } from "./AuthContext";
import LoginFormComponent from "./LoginForm";
import { useForm } from "../hooks/useForm";
import RegisterForm from "./register";
//trabajando en validaciones en la rama de google auth incompleta

const StyledImageContainer = styled.div`
  display: flex;
  background-size: cover;
  background-clip: content-box;
  background-position: 0px -120px;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.image});
  height: 300px;
  overflow: hidden;
  width: 100%;
  > h3 {
    font-family: "Roboto", sans-serif;
    margin-top: 0.5rem;
    color: #fff;
    text-shadow: 1px 1px 15px #333;
    margin-left: 1rem;
    font-size: 3rem;
    font-weight: bold;
    text-align: left;
  }
`;
const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  padding: 1rem;
  @media (max-width: 400px) {
    width: 100%;
    margin: 0;
    padding: 0;
  }
`;

//ESTADOS INICIALES
const initialForm = { mail: "", pass: "" };
const registerFormObject = {
  name: "",
  lastName: "",
  areaCode: "",
  phoneNumber: "",
  street: "",
  number: "",
  department: "",
  zipCode: "",
  mail: "",
  pass: "",
};
function Login() {
  const [colors] = useContext(ColorsContext);
  const [, setAuthData] = useContext(AuthContext);
  //esta flag marca si hay que mostrar o no al formulario de registro
  const [registerFlag, setRegisterFlag] = useState(false);
  //se toman las funciones establecidas en el hook useForm para los 2 formularios que hay en esta vista
  //login form
  //registerForm
  const [
    loginData,
    loginError,
    ,
    loginHandleBlur,
    loginHandleChange,
    onSubmitForm,
    ,
    setError,
  ] = useForm(initialForm);
  const [
    registerData,
    registerError,
    ,
    registerHandleBlur,
    registerHandleChange,
    onRegisterSubmit,
    ,
    ,
    setRegister,
  ] = useForm(registerFormObject);
  const handleNewRegister = () => setRegisterFlag(true);
  //debo revisar como refactorizar las props que paso a loginFOrmComponent porque son demasiadas despues evaluare generar otro hook
  return (
    <>
      <StyledImageContainer image={image}>
        <h2>Ingreso - Registro</h2>
      </StyledImageContainer>
      <StyledWrapper>
        <LoginFormComponent
          colors={colors}
          setGoogleLogin={setAuthData}
          onChangeHandle={loginHandleChange}
          onBlurHandle={loginHandleBlur}
          formData={loginData}
          loginError={loginError}
          onSubmitForm={onSubmitForm}
          setError={setError}
          setAuth={setAuthData}
          setRegister={setRegisterFlag}
          setRegisterForm={setRegister}
          registerFormData={registerData}
          handleNewRegister={handleNewRegister}
        />
        {registerFlag ? (
          <RegisterForm
            colors={colors}
            onChangeHandle={registerHandleChange}
            onBlurHandle={registerHandleBlur}
            formData={registerData}
            error={registerError}
            onSubmitForm={onRegisterSubmit}
            setAuth={setAuthData}
          />
        ) : null}
      </StyledWrapper>
    </>
  );
}

export default Login;
