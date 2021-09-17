import React, { useState } from "react";
import SignInForm from "../components/Auth/SignInForm";
import SignUpForm from "../components/Auth/SignUpForm";

function AuthForm() {
  const [showModalSignUp, setShowModalSignUp] = useState(false);

  return (
    <section className={`overflow-hidden h-screen`}>
      {/* top */}
      <div className='p-2 bg-white text-center'>
        Réveillez-vous avec détermination, endormez-vous avec satisfaction.
      </div>

      {/* Container */}
      <div className='relative p-20 h-screen w-screen flex flex-col-reverse md:flex-row items-center justify-center md:justify-evenly bg-gray-200'>
        {/* left */}
        <div className='text-center md:text-left mr-0 md:mr-8'>
          <h1 className='text-2xl md:text-5xl mt-5 text-blue-500 font-bold'>
            TrainingBook
          </h1>
          <p className='text-sm md:text-2xl md:w-3/4 text-center md:text-left'>
            Avec TrainingBook, Partagez vos entrainements et restez en contact
            avec vos fans.
          </p>
          <br />
        </div>
        {/* Right */}
        <SignInForm setShowModalSignUp={setShowModalSignUp} />

        {/* Modal */}
        {showModalSignUp && (
          <SignUpForm setShowModalSignUp={setShowModalSignUp} />
        )}
      </div>
    </section>
  );
}

export default AuthForm;
