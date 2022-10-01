import { useState } from "react";
const defaultValidationObject = {
  name: {
    response: "El nombre debe contener solo letras y espacios.",
    regEx: /[a-zA-Z\s]{2,50}/,
  },
  lastName: {
    response: "El apellido debe contener solo letras y espacios.",
    regEx: /[a-zA-Z\s]{2,50}/,
  },
  areaCode: {
    response: "El codigo de area debe tener al menos 2 digitos",
    regEx: /\d{2,4}$/,
  },
  phoneNumber: {
    response: 'Deben ser 6 digitos minimo puede incluir "-"',
    regEx: /[0-9-]{6,11}$/,
  },
  street: {
    response: "Debe incluir letas o numeros minimo 3 letras",
    regEx: /[a-zA-Z0-9\s]{3,30}/,
  },
  department: {
    response: "Solo letras y numeros minimo 3 caracteres",
    regEx: /[a-zA-Z0-9\s]{3,30}/,
  },
  zipCode: {
    response: "El codigo postal debe contar de 4 digitos",
    regEx: /[0-9]{4}/,
  },
  mail: {
    response: "Debes ingresar un mail valido",
    regEx:
      /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,63}$/i,
  },
  pass: {
    response: "Debe tener entre 6 y 50 caracteres sin espacios",
    regEx: /[\S]{6,50}/,
  },
  number: { response: "Debe ser un numero", regEx: /[0-9]/ },
};
export function useForm(form) {
  const [formData, setFormData] = useState(form);
  const [formError, setFormError] = useState(form);
  const [isFormLoading, setIsFormLoading] = useState(false);
  // objeto de validacion inicial

  const formValidation = (
    { target: { name, value } },
    ValidationObject = defaultValidationObject
  ) => {
    let error = {};
    const regExp = ValidationObject[name].regEx;
    if (!regExp.test(value)) {
      error = { [name]: ValidationObject[name].response };
    }
    return error;
  };

  const submitValidation = (
    formData,
    ValidationObject = defaultValidationObject
  ) => {
    let error = {};
    let keys = Object.keys(formData);
    keys.pop();
    keys.forEach((name) => {
      const regExp = ValidationObject[name].regEx;
      const evaluation = regExp.test(formData[name]);
      if (!evaluation) {
        error = { ...error, [name]: ValidationObject[name].response };
      }
    });
    return error;
  };
  function handleBlur(e) {
    handleChange(e);
    setFormError(formValidation(e, defaultValidationObject));
  }
  const handleChange = (e) => {
    if (Object.keys(e).length > 0) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };
  const onSubmitForm = (e, callback) => {
    e.preventDefault();
    setFormError(form);
    setFormError(submitValidation(formData, defaultValidationObject));
  };
  return [
    formData,
    formError,
    isFormLoading,
    handleBlur,
    handleChange,
    onSubmitForm,
    setIsFormLoading,
    setFormError,
    setFormData,
  ];
}
