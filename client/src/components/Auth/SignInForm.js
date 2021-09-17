import axios from "axios";
import React, { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";

function SignInForm({ setShowModalSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".emailError");
    const passwordError = document.querySelector(".passwordError");
    emailError.innerHTML = "";
    passwordError.innerHTML = "";

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          if (res.data.errors.email)
            emailError.innerHTML = `${res.data.errors.email}`;

          if (res.data.errors.password)
            passwordError.innerHTML = `${res.data.errors.password}`;
        } else {
          window.location = "/home";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleShowModal = useCallback(() => {
    setShowModalSignUp(true);
  }, [setShowModalSignUp]);

  return (
    <form
      onSubmit={handleLogin}
      className='shadow-lg w-72 md:w-80 p-4 flex flex-col bg-white rounded-lg -mt-5'
    >
      <div className='registerSucces'></div>

      {/* email */}
      <input
        type='text'
        name='email'
        id='email'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder='Email'
        className='py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500'
        // required
      />
      <p className='emailError p-1 bg-white text-red-700 rounded-md my-1'></p>

      {/* Password */}
      <input
        type='password'
        name='password'
        id='password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder='Mot de passe'
        className='py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500'
        // required
      />
      <p className='passwordError p-1 bg-white text-red-700 rounded-md my-1'></p>
      {/* submit */}
      <button className='w-full bg-blue-500 text-white p-3 rounded-lg font-semibold text-lg'>
        Se connecter
      </button>
      {/* forget password button */}
      <NavLink to='#' className='text-blue-400 text-center my-2'>
        Mot de passe oublié?
      </NavLink>
      <hr />
      {/* open signup modal */}
      <div
        className='w-full bg-green-400 mt-6 text-white p-3 rounded-lg font-semibold text-lg text-center cursor-pointer'
        onClick={handleShowModal}
      >
        Créer un compte
      </div>
    </form>
  );
}

export default SignInForm;
