import './App.css';
import {useState, useEffect} from "react";
import { useCharacters } from "./api.js";
import { CharacterSearch } from "./characters.js";

function App() {
  return (
    <div className="App">
    <div class="header">
      <h1>Marvel Dream Team Selector</h1>
      <p>Select characters by clicking the position container then clicking the name of the character on the left</p>
    </div>
      <div>
        <CharacterSearch/>
      </div>
    </div>
  );
}

export default App;
