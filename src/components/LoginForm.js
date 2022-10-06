import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../funciones/firebaseHLP";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
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
  const successLogin = (text) => {
    toast.success(text, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const navigate = useNavigate();
  const errorsOnSubmit = (texto) => {
    toast.warning(texto, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  //funcion asincrona que utiliza primero valida usando la funcion onSubmitHandle que se toma desde el hook useFomr
  //luego realiza un query en firebase buscando el mail introducido. Si lo encuentra compara la contraseña si no lo encuentra emite un
  //error en el dialogo y dispara un tostify con un warning si la clave no coincide lo mismo
  // si coincide guarda en el contexto Auth los datos del usuario y el id del documento de fierbase , notifica el loguin con un tostify y navega a la pagina desde donde llego
  //el cambio del contexto auth genera un condicional render que  modifica el texto ingreso/registro por una bienvenida al user
  const signInHandle = async (e) => {
    onSubmitForm(e);
    if (!loginError.length) {
      const q = query(
        collection(db, "users"),
        where("mail", "==", formData.mail)
      );
      const userData = await getDocs(q);

      if (userData.docs.length === 0) {
        errorsOnSubmit("El mail no esta registrado");
        setError({ mail: "El mail no esta registrado" });
      } else {
        const userRegister = userData.docs[0].data();
        if (userRegister.pass !== formData.pass) {
          errorsOnSubmit("La clave es incorrecta");
          setError({ pass: "Clave incorrecta" });
        } else {
          setAuth({ ...userRegister, id: userData.docs[0].id });
          successLogin("Ingreso Correcto");
          setTimeout(() => navigate(-1), 2500);
        }
      }
    } else errorsOnSubmit("Los datos no son correctos");
  };

  //mismo que la funcion anterior pero usa el OAuth de firebase para el login
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
          errorsOnSubmit("Usuario no registrado, complete los datos");
          setRegisterForm({
            ...registerFormData,
            name: firstName,
            lastName: lastName,
            mail: email,
          });
          setAuth({});
        } else {
          setAuth({ ...response.docs[0].data(), id: response.docs[0].id });

          navigate(-1);
        }
      });
    });
  };
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
