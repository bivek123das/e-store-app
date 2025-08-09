import React from 'react';

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full border-4 border-blue-400 border-b-transparent"></div>
    </div>
  );
}

