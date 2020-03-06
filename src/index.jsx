import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
/* ------------- Reset Default CSS ------------- */
import './reset.css';

function Coddit() {
  const settingsChanged = (event) => {
    console.log('local storage settings changed', event);
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Add event to listen for local storage changes
      window.addEventListener('storage', settingsChanged)
      return function cleanup() {
         // Clean-up event listeners
        window.removeEventListener('storage', settingsChanged);
      };
    }
  });

  return (
    <div>coddit</div>
  )
}

ReactDOM.render(<Coddit />, document.getElementById('root'));