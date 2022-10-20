import React from "react";
import styled from "styled-components";
const UserForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > input {
    border-radius: 15px;
    padding: 0.2rem;
    margin: 0.5rem;
    border: none;
    width: 250px;
    outline: 2px solid #333;
  }
`;

function CartUserForm({ setUserState, userState }) {
  const handleUserChange = (e) => {
    setUserState({ ...userState, [e.target.name]: e.target.value });
  };
  return (
    <UserForm>
      <input
        type="text"
        placeholder="Introduzca su nombre"
        onChange={handleUserChange}
        name="name"
      />
      <input
        type="text"
        placeholder="Introduzca su apellido"
        onChange={handleUserChange}
        name="lastName"
      />
      <input
        type="email"
        onChange={handleUserChange}
        name="mail"
        placeholder="Introduzca su e-Mail"
      />
      <input
        type="tel"
        onChange={handleUserChange}
        name="phoneNumber"
        placeholder="Introduzca su telefono"
      />
    </UserForm>
  );
}

export default CartUserForm;
