import React from 'react';
import './Preloader.css';

const Preloader = () => {
  return (
    <div className="preloader-overlay">
      <div className="preloader">
        <div className="crack crack1"></div>
        <div className="crack crack2"></div>
        <div className="crack crack3"></div>
        <div className="crack crack4"></div>
        <div className="crack crack5"></div>
      </div>
    </div>
  );
};

export default Preloader;
