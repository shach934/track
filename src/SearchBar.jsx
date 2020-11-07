import React, { useState, useEffect} from 'react';
import "./header.css";

function Search(){
    let [parcelID, setParcelID] = useState("");
    let [data, setData] = useState([]);
    let [found, setFound] = useState([]);
    
    useEffect(() => {
        const urlAPI = 'https://my.api.mockaroo.com/orders.json?key=e49e6840';
        fetch(urlAPI).then(response => response.json())
        .then( item => console.log("this is the data: " + item))
        .then( item => setData(item))
    }, []);

    const getInput = (event) => {
        const inputID = event.target.value;
        setParcelID(inputID);
        console.log("The input Parcel ID is: " + parcelID);
    }

    const handleSearch = (event) =>{
        const inputID = parcelID.padStart(4, "0");
        const parcel = data.filter(item => item.id === inputID);
        setFound(parcel);
        PresentParcel(found);
    }

    const PresentParcel =()=> {
        console.log("the package found is: " + found);
        if(found.length === 0){
            return (
            <div>
                The Package is NOT found, please check the parcel ID and try again.
            </div>);
        }else
        {   
            return (
                <div>
                    <label>ID: </label>
                    <p>{found.id}</p>
                    <label>ETA: </label>
                    <p>{found.eta}</p>
                    <label>Location: </label>
                    <p>{found.location_name}</p>
                    <label>status: </label>
                    <p>{found.status}</p>
                    <label>ID: </label>
                    <p>{found.id}</p>
                </div>
            )
        }
    }

    return (
        <div className="header">
            <legend>Enter the Parcel ID(4 digits number):</legend>
            <input value = {parcelID} onChange = {getInput}/>
            <button onClick = {handleSearch}>Search</button>
            <p>This is the Parcel ID you are searching: {parcelID}</p>
            <PresentParcel />
        </div>
    );
}

export default Search;