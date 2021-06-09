import React, { useState, useEffect, useRef } from 'react';
import Compressor from 'compressorjs';
import './App.css';

function App() {
  const contentRef = useRef();

  const handleMenu = (e) => {
    const { name } = e.target;
    console.log(name)
    if( name === "b"){
      insertStyle("bold");
    } else if ( name === "i"){
      insertStyle("italic");
    } else if ( name === "u"){
      insertStyle("underline");
    } else if (name === "s"){
      insertStyle("strikeThrough");
    } else if ( name === "ol"){
      insertStyle("insertOrderedList");
    } else if ( name === "ul"){
      insertStyle("insertUnorderedList");
    } 
  }

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

  const insertStyle = (style) => {
      document.execCommand(style);
      contentRef.current.focus({ preventScroll: true });
  }

  const insertImage = (result) => {
      contentRef.current.focus();
      document.execCommand('insertHTML', false, `<img className = "content-image" src = ${result} />`);
  }

  const contentChange = (e) =>{
    const { innerHTML } = e.target;
    console.log(innerHTML);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if( name === "title" ){
      console.log(value);
    } 
  }

  const handleFont = (e) => {
    const { value } = e.target;
    contentRef.current.focus();
    document.execCommand("fontName", false, value);
    console.log(value)
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
        <div class="menu"> 
          <button className = "bold" name = "b" onClick = { handleMenu }> 
            <b>B</b>
          </button> 
          <button className = "italic" name = "i" onClick = { handleMenu }>
            <i>I</i>
          </button> 
          <button className = "underline" name = "u" onClick = { handleMenu }>
            <u>U</u>
          </button> 
          <button className = "strike" name = "s" onClick = { handleMenu }>
            <s>S</s>
          </button> 
          <button className = "ordered-list" name = "ol" onClick = { handleMenu }>
            OL
          </button> 
          <button className = "unordered-list" name = "ul" onClick = { handleMenu }>
            UL
          </button>
          <select onChange = { handleFont }>
            <option value = "Arial">Arial</option>
            <option value = "Helvetica">Helvetica</option>
            <option value = "Courier New">Courier New</option>
          </select>
        </div>
        <div className = "content" name = "content" contentEditable="true" ref = { contentRef }></div>
      </div>
    </div>
  );
}

export default App;