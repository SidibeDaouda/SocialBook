import React from "react";

function SidebarRow({ src, Icon, title, email }) {
  return (
    <div className=' flex items-center space-x-2 p-4 hover:bg-gray-200 rounded-xl cursor-pointer'>
      {src && (
        <img className='rounded-full h-8 w-8 object-cover' src={src} alt='' />
      )}
      {Icon && <Icon className='h-8 w-8 text-blue-500' />}
      <div>
        <p className='hidden sm:inline-block font-medium'>{title}</p>
        <p className='text-sm'>{email}</p>
      </div>
    </div>
  );
}

export default SidebarRow;
