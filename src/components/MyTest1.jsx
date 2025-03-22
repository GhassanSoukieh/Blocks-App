
import React from 'react';
import { useState } from 'react'

function MyTest1() {
  const [name, setName] = useState('No name yet'); 

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <>
      <h1>MyTest1</h1>
      <p>My name is {name}</p>
      <input type="text" value={name} onChange={handleChange} />
    </>
  )
}

export default MyTest1;