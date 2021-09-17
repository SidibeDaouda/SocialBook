import React, { useCallback, useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import axios from "axios";

function SingUpForm({ ...props }) {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const closeModal = useCallback(() => {
    props.setShowModalSignUp(false);
  }, [props]);

  const handleRegister = async (e) => {
    e.preventDefault();
    const registerSucces = document.querySelector(".registerSucces");
    const pseudoError = document.querySelector(".pseudoError");
    const registerEmailError = document.querySelector(".registerEmailError");
    const registerPasswordError = document.querySelector(
      ".registerPasswordError"
    );
    const terms = document.getElementById("terms");
    const termsError = document.querySelector(".termsError");
    const confirmPasswordError = document.querySelector(
      ".confirmPasswordError"
    );

    pseudoError.innerHTML = "";
    registerEmailError.innerText = "";
    registerPasswordError.innerHTML = "";
    confirmPasswordError.innerHTML = "";
    termsError.innerHTML = "";

    if (password !== controlPassword || !terms.checked) {
      if (password !== controlPassword) {
        confirmPasswordError.innerHTML =
          "Les mots de passe ne correspondent pas";
      }

      if (!terms.checked)
        termsError.innerHTML = "Veuillez valider les conditions générales";
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          pseudo,
          email,
          password,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            pseudoError.innerHTML = res.data.errors.pseudo;
            registerEmailError.innerHTML = res.data.errors.email;
            registerPasswordError.innerHTML = res.data.errors.password;
          } else {
            closeModal();
            // button present in signInForm
            registerSucces.innerHTML = `<p class='border border-green-100 bg-green-100 text-green-700 p-2 rounded-md mb-3'>
            Enregistrement réussi, veuillez-vous connecter </p>`;
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div
      className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity flex flex-col items-center justify-center
     duration-700 ease-in-out'
    >
      <form
        onSubmit={handleRegister}
        className='absolute shadow-lg w-full sm:w-96 p-4 flex flex-col bg-white rounded-lg z-50'
      >
        <XIcon
          className='absolute h-6 text-gray-600 top-2 right-2 cursor-pointer'
          onClick={closeModal}
        />
        <h1 className='text-2xl font-semibold'>S'inscrire</h1>

        {/* pseudo */}
        <input
          type='text'
          name='pseudo'
          id='pseudo'
          onChange={(e) => setPseudo(e.target.value)}
          value={pseudo}
          placeholder='Pseudo'
          className='mt-5 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500'
        />
        <p className='pseudoError p-1 bg-white text-red-700 rounded-md my-1'></p>
        {/* <br /> */}

        {/* email */}
        <input
          type='text'
          name='email'
          id='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder='Email'
          className='py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500'
        />
        <p className='registerEmailError p-1 bg-white text-red-700 rounded-md my-1'></p>

        {/* password */}
        <input
          type='password'
          id='password'
          name='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder='Mot de passe'
          className='py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500'
        />
        <p className='registerPasswordError p-1 bg-white text-red-700 rounded-md my-1'></p>

        {/* confirm password  */}
        <input
          type='password'
          name='password'
          onChange={(e) => setControlPassword(e.target.value)}
          value={controlPassword}
          placeholder='Confirmer mot de passe'
          className='py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500'
        />
        <p className='confirmPasswordError p-1 bg-white text-red-700 rounded-md my-1'></p>

        {/* terms */}
        <div className='flex mt-6'>
          <label className='flex items-center'>
            <input
              type='checkbox'
              id='terms'
              className='text-green-400 w-5 h-5 mr-1 focus:ring-transparent border border-gray-300 rounded'
            />
            <span className='ml-2'>
              J'accepte les{" "}
              <span
                className='underline text-green-400'
                rel='noopener noreferrer'
              >
                conditions générales
              </span>
            </span>
          </label>
        </div>
        <p className='termsError p-1 bg-white text-red-700 rounded-md mt-1'></p>

        <br />
        <hr />

        <div className='flex items-center justify-evenly text-sm md:text-lg'>
          <div
            className=' w-40 bg-red-500 mt-6 mr-2 text-white p-3 rounded-lg font-semibold transition-colors duration-150  hover:bg-red-600 text-center cursor-pointer'
            onClick={closeModal}
          >
            Annuler
          </div>
          <button className='w-40 bg-green-500 hover:bg-green-600 mt-6 ml-2 text-white p-3 rounded-lg font-semibold transition-colors duration-150'>
            S'inscrire
          </button>
        </div>
      </form>
    </div>
  );
}

export default SingUpForm;
