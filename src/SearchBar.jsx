import React, { useState, useEffect} from 'react';
import "./header.css";

function Search(){
    let [parcelID, setParcelID] = useState("");
    let [data, setData] = useState([]);
    let [found, setFound] = useState();
    let [searched, setSearch] = useState(false);
    
    useEffect((data) => {
        const urlAPI = 'https://my.api.mockaroo.com/orders.json?key=e49e6840';
        fetch(urlAPI).then(response => response.json())
        .then( item => setData(item));
    }, []);

    const getInput = (event) => {
        const inputID = event.target.value;
        setParcelID(inputID);
    }

    const handleSearch = () =>{
        const parcel = data.filter(item => item.id === parcelID);
        setFound(parcel);
        PresentParcel(found);
        setSearch(true);
    }

    const PresentParcel =()=> {
        if(searched){
            data.map(item => console.log(item.id));
            console.log(found);
            if(found.length === 0){
                return (
                <div>
                    The Package {parcelID} is NOT found, please check the parcel ID and try again.
                </div>);
            }else
            {   
                return (
                    <div>
                        <label>ID: </label>
                        <p>{found[0].id}</p>
                        <label>ETA: </label>
                        <p>{found[0].eta}</p>
                        <label>Location: </label>
                        <p>{found[0].location_name}</p>
                        <label>status: </label>
                        <p>{found[0].status}</p>
                    </div>
                )
            }
        }else{
            return null;    
        }
        
    }

    return (
        <div className="header">
            <legend>Enter the Parcel ID(4 digits number):</legend>
            <input placeholder="Enter parcel ID" value = {parcelID} onChange = {getInput}/>
            <button onClick = {handleSearch}>Search</button>
            <PresentParcel />
        </div>
    );
}

export default Search;