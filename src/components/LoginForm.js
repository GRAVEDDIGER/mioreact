import React, { useContext } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "./AuthContext";
import { useLogin } from "../hooks/useLogin";

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
    > div > a {
      text-align: center;
    }
  }
  @media (max-width: 450px) {
    width: 100%;
    margin: 0 1rem;
    padding: 0.5rem 1.5rem;
    > div > a {
      text-align: center;
    }
  }
  @media (max-width: 400px) {
    width: 100%;
    padding: 0;
    margin: 0;
    > div > a {
      text-align: center;
    }
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
`;
const LoginAnchor = styled.a`
  color: ${(props) => props.foreColor.strongAccent};
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.foreColor.secondary};
    font-weight: bold;
  }
`;
const ForgetRegisterDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem 1rem;
  justify-content: space-around;
`;
const ValidationError = styled.p`
  margin-top: 0;
  font-weight: bold;
  color: #ff0000;
  padding: 0.5rem 0;
  margin: 0.5rem 0;
`;
function LoginFormComponent({ colors, handleNewRegister }) {
  const { loginData, loginError, loginHandleBlur, loginHandleChange } =
    useContext(AuthContext);
  const { signInHandle, googleLogin } = useLogin();
  //Si se hace click en el boton nuevo registro llama a la funcion  handleNewRegister que pasa por prop desde login component y eso genera un flag que activa el condicional
  // render del form de registro
  //en el caso de que el google auth no encuentre el mail automaticamente abrira el form de registro completando los datos provistos por google
  return (
    <LoginForm color={colors} onSubmit={signInHandle}>
      <ToastContainer
        position="top-right"
        autoClose={4500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h2>Ingrese su Usuario y Contraseña</h2>
      <LoginInputBox
        type="text"
        backgroundColor={colors.lightBackground}
        required
        onBlur={loginHandleBlur}
        placeholder="e-Mail"
        name="mail"
        value={loginData.mail}
        onChange={loginHandleChange}
      />
      <ValidationError>
        {" "}
        &nbsp;
        {loginError.mail ? loginError.mail : ""}
      </ValidationError>
      <LoginInputBox
        type="password"
        backgroundColor={colors}
        required
        placeholder="Contraseña"
        name="pass"
        value={loginData.pass}
        onChange={loginHandleChange}
        onBlur={loginHandleBlur}
      />
      <ValidationError>
        &nbsp;
        {loginError.pass ? loginError.pass : ""}
      </ValidationError>
      <Button
        variant="contained"
        type="submit"
        style={{ marginBottom: "1rem" }}
        onClick={signInHandle}
      >
        Ingresar
      </Button>
      <ForgetRegisterDiv>
        <LoginAnchor foreColor={colors}>Olvide mi contraseña</LoginAnchor>
        <LoginAnchor foreColor={colors} onClick={handleNewRegister}>
          Registrar nuevo Usuario
        </LoginAnchor>
      </ForgetRegisterDiv>
      <Button
        variant="outlined"
        style={{ marginTop: "1rem", marginBottom: "1rem" }}
        onClick={googleLogin}
      >
        Google Login
      </Button>
    </LoginForm>
  );
}

export default LoginFormComponent;
