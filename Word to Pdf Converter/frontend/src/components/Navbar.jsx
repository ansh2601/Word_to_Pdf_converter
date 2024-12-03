import React from 'react'

function navbar() {
  return (
   <>
   <div className='max-w-screen-2xl mx-auto container px-6 py-3 mid:px-40 shadow-lg h-16 fixed'>
    <div className='flex justify-between'>
        <h1 className='text-2xl cursor-pointer font-bold'>
            WORD<span className='text-3xl text-blue-500'>to</span>PDF
        </h1>
        <h1 className='mt-1 text-2xl cursor-pointer hover:scale-125 duration-300 font-bold'>
            HOME
        </h1>
    </div>
   </div>
   </>
  )
}

export default navbar