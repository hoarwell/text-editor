import React, { useState, useEffect, useRef } from 'react';
import Compressor from 'compressorjs';
import './App.css';

function App() {
  const contentRef = useRef();

  const fileChange = (e) => {
    const { files } = e.target;
    const file = files[0];
    new Compressor(file, {
      quality: 0.6,
      success: (converted) => {
        const reader = new FileReader();
        reader.readAsDataURL(converted);
        reader.onloadend = (finishedEvent) => {
          const { currentTarget : { result } } = finishedEvent;
          console.log(result);
          insertImage(result)
        }
      }
    })
  }

  const insertImage = (result) => {
      contentRef.current.focus();
      document.execCommand('insertHTML', false, `<img className = "content-image" src = ${result} />`);
  }

  const contentChange = (e) =>{
    const { value, innerHTML } = e.target;
    console.log(innerHTML);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if( name === "title" ){
      console.log(value);
    } 
  }

  useEffect(() => {
    contentRef.current.addEventListener('input', contentChange);
  })

  return (
    <div className="App">
      <div className = "container">
        <p>wysiwyg text editor</p>
        <input className = "title" name = "title" type = "text" placeholder = "title" onChange = { handleChange } require/>
        <input className = "file" name = "file" type = "file" accept = "image/*" onChange = { fileChange }/>
        <div className = "content" name = "content" contentEditable="true" ref = { contentRef }></div>
      </div>
    </div>
  );
}

export default App;