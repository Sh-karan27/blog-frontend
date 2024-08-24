import React, { useState } from 'react';
import background from '../assets/Login-background.jpg';
import Singup from './Singup';
import Signin from './Signin';

const Login = () => {
  const [signUp, setSignUp] = useState(false);

  return (
    <div
      className='w-full min-h-screen flex items-center justify-center p-4'
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
      }}>
      {signUp ? (
        <Singup setSignUp={setSignUp} />
      ) : (
        <Signin setSignUp={setSignUp} />
      )}
    </div>
  );
};

export default Login;
