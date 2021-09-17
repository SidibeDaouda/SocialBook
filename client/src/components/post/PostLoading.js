import React from "react";

function PostLoading() {
  return (
    <div className='border border-gray-200 shadow rounded-md p-4  w-full mx-auto mb-4'>
      <div className='animate-pulse flex items-center space-x-4'>
        <div className='rounded-full bg-gray-200 h-12 w-12'></div>
        <div className='flex-1 space-y-4 py-1'>
          <div className='h-4 bg-gray-200 rounded w-3/4'></div>
        </div>
      </div>

      <div className='animate-pulse mt-2'>
        <div className='mb-2 h-4 bg-gray-200 rounded w-5/6'></div>
        <div className='h-10 w-full bg-gray-200 rounded'></div>
      </div>
    </div>
  );
}

export default PostLoading;
