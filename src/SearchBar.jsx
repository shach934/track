import React, { useState, useEffect} from 'react';
import "./search.css";

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
        setSearch(true);
        PresentParcel();
    }

    const PresentParcel =()=> {
        if(searched){
            data.map(item => console.log(item.id));
            if(found.length === 0){
                console.log("here")
                return (
                <div className="resultNot">
                    The Package is NOT found, please check the parcel ID and try again.
                </div>);
            }else
            {   
                return (
                    <div className="result">
                        <label>ID: {found[0].id}</label>
                        <label>ETA: {found[0].eta}</label>
                        <label>Location: {found[0].location_name}</label>
                        <label>status: {found[0].status}</label>
                    </div>
                )
            }
        }else{
            return null;    
        }
        
    }

    return (
        <div className="search">
            <label>Enter the Parcel ID(4 digits number):</label>
            <input placeholder="Enter parcel ID" value = {parcelID} onChange = {getInput}/>
            <button onClick = {handleSearch}>Search</button>
            <PresentParcel />
        </div>
    );
}

export default Search;