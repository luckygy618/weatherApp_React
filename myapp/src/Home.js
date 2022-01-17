import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Panel, PanelGroup} from "react-bootstrap";
import React from "react";
var daylist = ["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];

function Home(props) {
    const [weatherData,setweatherData] = useState();
    const [location,setlocation] = useState();
    const [cityState,setcityState] = useState();
    const [cityID,setcityID] = useState();
   // let id = props.location ;

    var current = new Date();       
    var currentDate = "";
    currentDate =   "Date: " + current.getFullYear() + "-" + current.getMonth() +"-" + current.getDate() + ", Time: " + current.getHours()+":"+ current.getMinutes();



    const getData = async(city)=>{

        var req = "http://api.openweathermap.org/data/2.5/find?q=" + city+ "&cnt=50&units=metric&appid=b78cb80900695397a1f53c9d41103ea1";
        const res =  await axios.get(req);
        setweatherData(res.data)
    }

    useEffect(()=> {
        if ("geolocation" in navigator) {
            //       console.log("Available");
   
                   function task1() {
                       return new Promise((resolve, reject) => {
                           navigator.geolocation.getCurrentPosition(
                               function (position) {
   
                                   resolve(position);
                               },
                               function (error) {
                                   console.error("Error Code = " + error.code + " - " + error.message);
                                   this.setState({
                                       error: "Failed to get the current position, Please allow your broswer to access your location. Then refresh the page to try again."
                                   });
                                   reject();
                               }
                           );
   
                       });
   
   
                   }
   
   
                   function getCity(la, ln) {
                       return new Promise((resolve, reject) => {
                           var lat = la;
                           var lng = ln;
                           var req = "https://us1.locationiq.com/v1/reverse.php?key=pk.2ad640bc1aa1742b1cdf07408589148e&lat=" + lat + "&lon=" + lng + "&format=json";
   
                           fetch(req)
                               .then(response => response.json())
                               .then(data => {
                          //         console.log('Success:', data);
                                   resolve(data);
                               })
                               .catch((error) => {
                                   console.error('Error:', error);
                                   reject();
                               });
   
                       });
   
   
                   }
   
   
                   task1().then((data) => {
                         
                           getCity(data.coords.latitude, data.coords.longitude).then((data) => {
                               var city = data.address.city;
                               var country = data.address.country;
                               var country_code = data.address.country_code;
                               var state = data.address.state;
                               var string = "/search/" + city + "-" + country_code + "-" + state + "-" + country;
                       
                               var city = data.address.city;
                               var country = data.address.country;
                               var country_code = data.address.country_code;
                               var state = data.address.state;
                               setcityState(state);
   
                         var req = "http://api.openweathermap.org/data/2.5/find?q=" + city+ "&cnt=50&units=metric&appid=b78cb80900695397a1f53c9d41103ea1";
                         
                          fetch(req)
                              .then(response => response.json())
                              .then(data => {
                               var apiResult = data;
         
                               for (var i=0;i< apiResult.list.length;i++){  
                           
                                       if(country_code.toUpperCase() ==apiResult.list[i].sys.country  ){
                                  
                                           setweatherData(apiResult.list[i]);
                                      
                                   }
                              
                               }
                              })
                              .catch((error) => {
                                  console.error('Error:', error);
                                 
                              });
   
                           }).catch((err) => {
                               console.log(err)
                           });
   
   
                       })
                       .catch((err) => {
                           console.log(err)
                       
                       });
   
   
   
               }
   
    },[location]);

    if(weatherData){
        return(
            <div id="background">
            <section id='itroBackground' className="intro">
               <div className="inner">
                  <div className="content">
                     <div className="weather-app">
                        <div className="left">
                           <div id="toggleCelsius" className="temperature-celsius"><span
                              id="temperatureCelsius"></span></div>
                           <div className="location"><span id="loc">{weatherData.name}, {cityState}</span></div>
                           <br/>
                           <div className="day"><span id="loc"> {currentDate} {daylist[new Date().getDay()]}</span></div>
                        </div>
                        <div className="right">
                           <div className="top">
                              <img id="icon" width="75px"
                                 src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}/> {weatherData.main.temp}&deg;C
                              <p id="description"></p>
                           </div>
                           <div className="bottom">
                              <div className="humidity">
                                 <span>
                                 <span id="humidity"></span>
                                 <span></span>
                                 </span>
                              </div>
                              <div className="wind">
                                 <span>Wind: <span id="wind">{weatherData.wind.speed}</span> m/s</span>
                              </div>
                              <div className="wind">
                                 <span>Min: <span
                                    id="min">{weatherData.main.temp_min}</span> &deg;C</span> / <span>Max: <span
                                    id="max">{weatherData.main.temp_max}</span> &deg;C</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </div>
         )
    }
    else {
        return (
            <div></div>
        )
    };
}

export default Home;