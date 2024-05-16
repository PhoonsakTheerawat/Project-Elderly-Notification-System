import React, { useState, useEffect } from 'react';


function Navbar() {
  const [user, setUser] = useState(null);

  // Fetch user data immediately on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className='fixed top-0 w-screen'>
      <div className='flex justify-between w-full h-auto bg-sky-400'>
        <img onClick={handleLogout} className='w-20 h-20 self-center' src="images/exit.png" alt="exit" />
        {user ? ( // Display email if user is available
          <p className='self-center  mr-10 text-white font-black font-sans text-xl'>Email : {user}</p>
        ) : (
          <p className='self-center  mr-10 text-white font-black font-sans text-xl'>กำลังโหลดข้อมูลผู้ใช้...</p> // Display loading message
        )}
      </div>
    </div>
  );
}

export default Navbar;
