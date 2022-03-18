import md5 from "md5"
import {useState, useEffect} from "react";
const API_PUBLIC_KEY = "803d9f7c29069a049f60fb2588e1266f";
const API_PRIVATE_KEY = "224531fd4ee73adddf727ca69b78a1765ec6efbd";



//A function that calls the MARVEL API.
//Parameters, Optional parameter string startsWith used for searching for characters that start with the variable startsWith.
function getCharacters(startsWith){
    const currentDate = new Date();
    var URL = "";
    var timestamp = String(currentDate.getTime());
    //Creates a hash that is used to call the marvel api.
    var API_HASH_KEY = md5(timestamp + API_PRIVATE_KEY + API_PUBLIC_KEY);
    if (startsWith == null || startsWith.length === 0){
        URL = "http://gateway.marvel.com/v1/public/characters?ts="+timestamp+"&apikey="+API_PUBLIC_KEY+"&hash="+API_HASH_KEY;
    }else{
        URL = "http://gateway.marvel.com/v1/public/characters?nameStartsWith="+startsWith+"&ts="+timestamp+"&apikey="+API_PUBLIC_KEY+"&hash="+API_HASH_KEY;
    }

    return fetch(URL)
        .then((res) => res.json())
        .then((res) =>
            //Just get name and thumbnail url.
            res.data.results.map((res) => ({
                name: res.name,
                thumbnail: res.thumbnail.path,
            })),
        )
}

//A function that parses data from the getCharacters.
//Parameters, startsWith a string used for searching for characters that start with the variable.
//Returns, an object {loading, data, error} where loading is a boolean value, data is the data from the API and error is errors caught.
export function useCharacters(startsWith){
     const [loading, setLoading] = useState(true);
     const [data, setData] = useState(true);
     const [error, setError] = useState(null);

    useEffect(() => {
                getCharacters(startsWith).then((data) => {
                setData(data);
                setLoading(false);
                }).catch((e) => {
                    setError(e);
                    setLoading(false);
                })
    }, [startsWith]);
    return {
            loading,
            data,
            error,
        }
}
