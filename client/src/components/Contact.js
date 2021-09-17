import React from "react";

function Contact({ src, name }) {
  return (
    <div className='flex items-center space-x-3 mb-2 relative hover:bg-gray-200 cursor-pointer p-2 rounded-xl'>
      <img className='rounded-full object-cover h-12 w-12' src={src} alt='' />
      <p className=''>{name}</p>
      <div className='absolute bottom-2 left-2 bg-green-400 h-3 w-3 rounded-full animate-bounce'></div>
    </div>
  );
}

export default Contact;
