

import React from "react";

const LoadingComponent = () => {
  return (
    <>
      <div className="container w-100 mt-5">
        <div class="d-flex justify-content-center">
          <div class="spinner-border " role="status">
            <span class="visually-hidden">Loading...</span>
            
          </div>
        </div>
        <p className='text-center mt-2 lead'>Loading...</p>
      </div>
    </>
  );
};

export default LoadingComponent;
