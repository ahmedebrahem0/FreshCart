import React from 'react'
import notFound from '../assets/images/error.svg'
export default function NotFound() {
  return (
    <>
      <div className='flex justify-center items-center p-3 dark:bg-slate-900'>
        <img src={notFound} alt="" />
      </div>
    </>
  )
}












