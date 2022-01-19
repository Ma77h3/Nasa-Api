import React , {useState, useEffect }from 'react'
import axios from 'axios'
import LikeButton from './LikeButton';
import '../css/DataFetching.css'
import Loading from './Loading';


function DataFetching() {

    //store api key in a variable
    const DemoKey = "z9OPqKkoyFfHIpNxUGU0nxPiUFixv28rbjRowU9h";

    //create a useState variable to the url for the url to allow the user to change it
    const [url, setUrl] = useState("https://api.nasa.gov/planetary/apod?start_date=2022-01-01&api_key="+ DemoKey)

    //create a useState variable loading to determine if loading screen should be on or not
    const [loading, setLoading] = useState(true);

    //create a useState data for all the data that is return from the api request
    const [data, setData] = useState()

    //function when the user enters a date in the date picker and wants to browse images from a certain date
    const handleSubmit= () =>{
        //update the url by changing the default date to what was put in the input field
        setUrl("https://api.nasa.gov/planetary/apod?start_date="+ document.getElementById('inputField').value + "&api_key="+ DemoKey)
    }

    //use effect function (handling fetch request)
    // triggers on inital load in and whenever the url variable changes

    useEffect(() => {
        //change the screen to the loading screen
        setLoading(true);
        //fetch request using axios
        axios.get(url)
        .then(res =>{
            //if successful 
            //copy the from the response into the data variable
            setData(res.data);
            //switch off the loading screen
            setLoading(false);
        })
        .catch(err =>{
            //if unsuccessful
            //log the error message in the console
            console.log(err)
        })
    }, [url])

    //if loading is true, show the loading screen
    if (loading === true){
        return (
            <Loading/>
        )
    }

    //if not return the website
    return (
        <div>
            <div id="websiteTitle">Spacestagram</div>
            <div id='datePickerParent'>
                <div id ="datePicker-title">Browse NASA's Astronomy Picture of the Day starting from the date entered in the box below</div>
                <input id="inputField" type="text" placeholder="YYYY-MM-DD"></input>
                <button id="btn" onClick={handleSubmit}>Browse</button>
            </div>
            
            <div id="flexbox">
            {//the data variable will be an array of object with all the photos and information about them
            //iterate through the area to display each image
            data.map(photo=>(
                    <div key={photo.url} id='border'>

                            {//check whether the url corresponds to an image or video and use the apporiate tag
                            //add the like button below
                            photo.media_type==="image" ? (
                                <img id="img"src={photo.hdurl} alt={photo.url}/>
                            ) : (
                                <iframe id="video"src={photo.url}/>
                            )}
                            <div id="title">{"Title: " + photo.title}</div>
                            <div id="date">{"Date: " + photo.date}</div>
                            
                        
                            <LikeButton/>
                        </div>

                ))}
            </div>
            
        </div>
    )
}

export default DataFetching
