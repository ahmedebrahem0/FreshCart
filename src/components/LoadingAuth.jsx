import React from 'react'
import { MoonLoader } from 'react-spinners';

export default function LoadingAuth() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <MoonLoader size={20} color="#FFFFFF" />
    </div>
  );
}
