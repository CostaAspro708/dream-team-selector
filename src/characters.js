import './App.css';
import {useState, useEffect} from "react";
import { useCharacters } from "./api.js";

export function CharacterSearch(){
    const [string, setString] = useState(null);
    //Used for tracking which position a user has selected.
    //Takes an int between 0-4. 0 representing Goalkeeper, 1 Defender and so on...
    const [Position, setPosition] = useState(0);
    //The array of positions that are printed.
    const [positionSelected, SetPositionSelected] =  useState(["Goalkeeper", "Defender", "Midfielder", "STK/MID/DEF Midfielder", "Striker"]);
    //Used for tracking character data.
    const [selected2, setSelected2] = useState([{"name":"", "thumbnail":""},{"name":"", "thumbnail":""},{"name":"", "thumbnail":""},{"name":"", "thumbnail":""},{"name":"", "thumbnail":""}]);

    //Call api and wait for loading.
    var {loading, data, error} = useCharacters(string);
    if(loading) return <div> Loading... </div>

     //Use to print selected players and there position.
     const positionlist = (
            <div className="soccerBackground">
                 {positionSelected.map((p, index) =>

                   <div className="Players" key={p} id={p} onClick={() => setPosition(index)}>{p}:
                   <Players position={positionSelected[index]} character={selected2[index].name} thumbnail={selected2[index].thumbnail}/>
                   </div>
                 )}

                 </div>
           );

           //Used to print selectable list of characters.
     const list = (
         <ul className="CharacterList">
              {data.map((d) =>
                <li key={d.name} onClick={() => {
                let old2 = [...selected2];
                old2[Position] = d;
                setSelected2(old2);
               }}>
                  {d.name}
                </li>
              )}
            </ul>
        );

        //Handles user selection from dropdown box.
        function userSelection(){
           var input = document.getElementById("dropdown").value;
           let buffer = [...positionSelected];
           buffer[3] = input;
           SetPositionSelected(buffer);
           console.log(positionSelected);
        }
    return (
            <div>
            <div class="Selector">
            Select a position for 5th player <select id="dropdown" onChange={e => userSelection()}>
             <option value="STK/MID/DEF Midfielder">Midfielder</option>
              <option value="STK/MID/DEF Defender">Defender</option>
              <option value="STK/MID/DEF Striker">Striker</option>
            </select>
            </div>

            <div className="Soccer">
            {positionlist}
            <div className="Search">
                        <input type="text" placeholder="Search" onChange={e => setString(e.target.value)} />
                         {list}
                         </div>
            </div>

             </div>
      );
}

//A reusable react component, that print the name and image of a character.
//Parameters, props.thumbnail the thumbnail url for a character,
//            props.name the name of a character
function Players(props){
    const thumbnailUrl = props.thumbnail;
    if(thumbnailUrl.length == 0){
        return(
        <div>
                                   {props.character}<br />
                               </div>
            );
    }
    return(
                       <div>
                           {props.character}<br />
                           <img
                                 src={props.thumbnail+"/portrait_small.jpg"}
                                 />
                       </div>
                   );

}


