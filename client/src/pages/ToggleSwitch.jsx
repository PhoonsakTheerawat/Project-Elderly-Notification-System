import React, { useState } from 'react';

const ToggleSwitch = () => {
  const [isOn, setIsOn] = useState(true);

  const toggleSwitch = () => {
    const newIsOn = !isOn;
    setIsOn(newIsOn);
    console.log(newIsOn ? "on" : "off");
  };

  return (
    <div 
      className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer ${isOn ? 'bg-green-500' : 'bg-gray-300'}`}
      onClick={toggleSwitch}
    >
      <div
        className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${isOn ? 'translate-x-8' : ''}`}
      ></div>
    </div>
  );
};

export default ToggleSwitch;
