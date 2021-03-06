import './App.css';
import { CharacterSearch } from "./characters.js";

function App() {
  return (
    <div className="App">
    <div class="header">
      <h1>Marvel Dream Team Selector</h1>
      <p>Select characters by clicking the containers on the football field then clicking the name of the character on the right.</p>
    </div>
      <div>
        <CharacterSearch/>
      </div>
    </div>
  );
}

export default App;
