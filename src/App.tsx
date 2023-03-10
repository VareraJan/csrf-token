import React, { SyntheticEvent, useEffect, useState } from 'react';
import './App.css';
import { getCookie, setCookie } from './helpers/cookie';

const cookieName = 'CSRF';
// document.cookie = "CSRF=1234567890qwerty; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT"
setCookie(cookieName, Math.random().toString(), {'max-age': 3600 });

function App() {
  const [csrfToken, setCsrfToken] = useState('');

  

  const handleSubmit = async (event: SyntheticEvent ) => {
    event.preventDefault();
    
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
      body: JSON.stringify({title: 'foo', content: 'bla-bla-bla', userId: 1})
    };
    
    const response = await fetch('http://localhost:3000/api/posts', requestOptions)
    const data = await response.json()
    console.log('data => ', data);
  }

  useEffect(() => {
    setCsrfToken(getCookie(cookieName));
  }, []);

  return (
    <div className="App">
      <h1>CSRF token learning</h1>
      <form onSubmit={handleSubmit}>
      <input type="text" name="title" />
      <input type="text" name="content" />
      <button type="submit">Submit</button>
    </form>
    </div>
  );
}

export default App;
