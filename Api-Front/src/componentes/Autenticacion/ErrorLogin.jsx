import React from 'react';

export const ErrorLogin = ({ message }) => {
  return (
    <div style={{ color: 'red', marginTop: '10px' }}>
      {message}
    </div>
  );
};

export default ErrorLogin;
