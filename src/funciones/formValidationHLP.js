export const ValidationObject = {
  name: {
    response: "El nombre debe contener solo letras y espacios.",
    regEx: /[a-zA-Z\s]{2,50}/g,
  },
  lastName: {
    response: "El apellido debe contener solo letras y espacios.",
    regEx: /[a-zA-Z\s]{2,50}/g,
  },
  areaCode: {
    response: "El codigo de area debe tener al menos 2 digitos",
    regEx: /\d{2,4}$/gm,
  },
  phoneNumber: {
    response: 'Deben ser 6 digitos minimo puede incluir "-"',
    regEx: /[0-9\-]{6,11}$/gm,
  },
  street: {
    response: "Debe incluir letas o numeros minimo 3 letras",
    regEx: /[a-zA-Z0-9\s]{3,30}/gm,
  },
  department: {
    response: "La localidad puede incluir letras y numeros minimo 3 letras",
    regEx: /[a-zA-Z0-9\s]{3,30}/gm,
  },
  zipCode: {
    response: "El codigo postal debe contar de 4 digitos",
    regEx: /[0-9]{4}/gm,
  },
  mail: {
    response: "Debes ingresar un mail valido",
    regEx:
      /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i,
  },
};

function formValidationHLP(
  formData,
  setError,
  error,
  { name },
  ValidationObject = ValidationObject
) {
  const regExp = ValidationObject[name].regEx;
  if (regExp.test(formData[name]))
    setError({ ...error, [name]: ValidationObject[name].response });
  return error;
}

export default formValidationHLP;
