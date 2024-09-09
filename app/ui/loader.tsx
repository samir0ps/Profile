  import React from 'react';

  interface LoaderProps {
    size?: 'small' | 'medium' | 'large';
  }

  const Loader: React.FC<LoaderProps> = ({ size = 'medium' }) => {
    const sizeClasses = {
      small: 'w-16 h-16',
      medium: 'w-24 h-24',
      large: 'w-32 h-32',
    };

    return (
      <div className={`absolute right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 ${sizeClasses[size]}`}>
        <div className="relative w-full h-full">
          <div className="absolute inset-0 animate-spin">
            <div className="h-full w-full rounded-full border-4 border-t-transparent border-r-transparent border-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          </div>
          
          
        </div>
      </div>
    );
  };

  export default Loader;