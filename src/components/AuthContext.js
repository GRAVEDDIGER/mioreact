import { useState, createContext } from "react";

export const AuthContext = createContext();
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
};

function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState(registerFormObject);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
