import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../funciones/firebase";
import { useNavigate } from "react-router-dom";
const provider = new GoogleAuthProvider();
const auth = getAuth();
auth.languageCode = "es";

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
function LoginFormComponent({
  colors,
  setGoogleLogin,
  onChangeHandle,
  onBlurHandle,
  formData,
  loginError,
  onSubmitForm,
  setError,
  setAuth,
  setRegister,
  setRegisterForm,
  registerFormData,
  handleNewRegister,
}) {
  const navigate = useNavigate();

  const signInHandle = async (e) => {
    onSubmitForm(e);
    const q = query(
      collection(db, "users"),
      where("mail", "==", formData.mail)
    );
    const userData = await getDocs(q);
    if (userData.docs.length === 0)
      setError({ mail: "El mail no esta registrado" });
    else {
      const userRegister = userData.docs[0].data();
      if (userRegister.pass !== formData.pass)
        setError({ pass: "Clave incorrecta" });
      else {
        setAuth(userRegister);
        navigate(-1);
      }
    }
  };
  const googleLogin = async () => {
    signInWithPopup(auth, provider).then((result) => {
      setGoogleLogin(result["_tokenResponse"]);
      const q = query(
        collection(db, "users"),
        where("mail", "==", result["_tokenResponse"].email)
      );
      getDocs(q).then((response) => {
        if (response.docs.length === 0) {
          setRegister(result["_tokenResponse"]);
          const { email, firstName, lastName } = result["_tokenResponse"];

          setRegisterForm({
            ...registerFormData,
            name: firstName,
            lastName: lastName,
            mail: email,
          });
          setAuth({});
        } else {
          setAuth(response.docs[0].data());
          navigate("/");
        }
      });
    });
  };
  return (
    <LoginForm color={colors} onSubmit={signInHandle}>
      <h2>Ingrese su Usuario y Contraseña</h2>
      <LoginInputBox
        type="text"
        backgroundColor={colors.lightBackground}
        required
        onBlur={onBlurHandle}
        placeholder="e-Mail"
        name="mail"
        value={formData.mail}
        onChange={onChangeHandle}
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
        value={formData.pass}
        onChange={onChangeHandle}
        onBlur={onBlurHandle}
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
