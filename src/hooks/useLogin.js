import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { db } from "../funciones/firebaseHLP";
import { collection, where, query, getDocs, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../funciones/firebaseHLP";
const provider = new GoogleAuthProvider();
const auth = getAuth();
auth.languageCode = "es";

export function useLogin() {
  // const [registerFlag, setRegisterFlag] = useState(false);

  const navigate = useNavigate();

  const {
    onSubmitForm,
    loginData,
    setError,
    setAuth,
    setRegisterData,
    registerData,
    loginError,
    registerFlag,
    setRegisterFlag,
    onRegisterSubmit,
    registerError,
  } = useContext(AuthContext);

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
  //mudando la funcion signInHandle
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

  const signInHandle = async (e) => {
    onSubmitForm(e);
    if (!loginError.length) {
      const q = query(
        collection(db, "users"),
        where("mail", "==", loginData.mail)
      );
      const userData = await getDocs(q);

      if (userData.docs.length === 0) {
        errorsOnSubmit("El mail no esta registrado");
        setError({ mail: "El mail no esta registrado" });
      } else {
        const userRegister = userData.docs[0].data();
        if (userRegister.pass !== loginData.pass) {
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

  const googleLogin = async () => {
    signInWithPopup(auth, provider).then((result) => {
      setAuth(result["_tokenResponse"]);
      const q = query(
        collection(db, "users"),
        where("mail", "==", result["_tokenResponse"].email)
      );
      getDocs(q).then((response) => {
        if (response.docs.length === 0) {
          setRegisterFlag(result["_tokenResponse"]);
          const { email, firstName, lastName } = result["_tokenResponse"];
          errorsOnSubmit("Usuario no registrado, complete los datos");
          setRegisterData({
            ...registerData,
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

  const handleRegister = async (e) => {
    onRegisterSubmit(e);
    if (!registerError.lenght) {
      getUserData(registerData.mail).then((response) => {
        if (parseInt(response.usersLength) === 0) {
          addDoc(collection(db, "users"), registerData);
          setAuth(registerData);
          successLogin("El usuario se ha registrado con exito");
          setTimeout(() => navigate("/"), 2500);
        } else errorsOnSubmit("El correo ya existe");
      });
    } else errorsOnSubmit("No se pudo registrar");
  };
  return { signInHandle, googleLogin, registerFlag, handleRegister };
}
