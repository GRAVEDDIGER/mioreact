import { useState, createContext } from "react";
import { useForm } from "../hooks/useForm";

export const AuthContext = createContext();

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
function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState(registerFormObject);
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
    setRegisterData,
  ] = useForm(registerFormObject);
  const [registerFlag, setRegisterFlag] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loginData,
        loginError,
        loginHandleBlur,
        loginHandleChange,
        onSubmitForm,
        setError,
        registerData,
        registerError,
        registerHandleBlur,
        registerHandleChange,
        onRegisterSubmit,
        setRegisterData,
        registerFlag,
        setRegisterFlag,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
