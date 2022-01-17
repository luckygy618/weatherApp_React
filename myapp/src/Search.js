//import axios from 'axios'
import {useState,useEffect} from 'react'
import {Accordion,Button} from "react-bootstrap";

import {PanelGroup,Panel} from "react-bootstrap";
import React from "react";
import {useParams} from 'react-router-dom'
import {Alert,Pagination} from "react-bootstrap";

var daylist = ["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];


function SearchComponent(props) {
    const [wdata,setWdata] = useState([]);
    const [pageDate,setpageDate] = useState([]);
    const [pageNumber,setPageNumber] = useState(1);
    const [totalPages,setTotalPages] = useState(1);
    const [currentDate,setCurrentDate] =useState("");
    const pageSize = 3;

    const {updateSearchId} = useParams();//use useParams() to get the param from url, const {updateSearchId} is required
 
   
    function paginate(res,page_size,max_page_size) {
        page_size=page_size||10;
        max_page_size=max_page_size||100;
        page_size=page_size>max_page_size?max_page_size:page_size;
        var pages=Math.ceil( res.length / page_size),
            items=[];
        for( var p=1; p <= pages; p++) {
            var start= Math.ceil( page_size * (p-1) );
            items.push( res.slice(start,start+page_size) );
        }
        return items;
    }


    useEffect(()=> {
        var current = new Date();
                         
        var dataStr = "";
        dataStr =   "Date: " + current.getFullYear() + "-" + current.getMonth() +"-" + current.getDate() + ", Time: " + current.getHours()+":"+ current.getMinutes();
        setCurrentDate(dataStr);
        function getWeather(cityId) {
            return new Promise((resolve, reject) => {
                var req = "http://api.openweathermap.org/data/2.5/find?q=" + cityId+ "&cnt=50&units=metric&appid=b78cb80900695397a1f53c9d41103ea1";
    
                fetch(req)
                    .then(response => response.json())
                    .then(data => {
          
                        resolve(data);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        reject();
                    });
    
            });
    
    
        }

  var userStr = (updateSearchId.replace(/\s/g, "&nbsp;")).toUpperCase();
        var strComma = userStr.substr(userStr.length - 3, 1);
        var url=userStr.split(",");
     //   getData(url[0]);
        getWeather(url[0]).then((data)=>{
           // console.log(data);
           var tempArray=[];
            if(strComma == ","){
              var  countryCode = url[1];
                for(var i =0;i<data.list.length;i++){
              
                  if( data.list[i].sys.country == countryCode){
                    tempArray.push(data.list[i]);
            
                    setWdata(tempArray);
                    setpageDate(paginate(tempArray,3,3));
                    setTotalPages(tempArray.length/pageSize+1)
                  }
                }
            }else{
                setWdata(data.list);
           
                setpageDate(paginate(data.list,3,3));
                setTotalPages(data.list.length/pageSize+1);
              
            }
          
        }).catch((err)=>{console.log(err)})
       
    },[updateSearchId]);

    const accordian = (weahterRecord,index)=>{
        console.log(weahterRecord);
        return (
            <div>
            <PanelGroup  accordion id="accordion-uncontrolled-example" defaultActiveKey="2">
               <Panel onClick={e=>
                  props.addRecentlyViewed(weahterRecord)} eventKey={weahterRecord}>
                  <Panel.Heading>
                     <Panel.Title toggle>
                        <div>
                           <img  src={`http://openweathermap.org/images/flags/${weahterRecord.sys.country.toLowerCase()}.png`}/><span>     </span>
                           <span>{weahterRecord.name}, {weahterRecord.sys.country}</span>
                           <p>feels like -  {weahterRecord.main.feels_like}, {weahterRecord.weather[0].description}</p>
                           <span>
                           <img src={`http://openweathermap.org/img/wn/${weahterRecord.weather[0].icon}@2x.png`}/>
                           {weahterRecord.main.temp}&deg;C
                           </span>
                        </div>
                     </Panel.Title>
                  </Panel.Heading>
                  <Panel.Body collapsible>
                     <div id="background">
                        <section id='itroBackground' className="intro">
                           <div className="inner">
                              <div className="content">
                                 <div className="weather-app">
                                    <div className="left">
                                       <div id="toggleCelsius" className="temperature-celsius"><span
                                          id="temperatureCelsius">{weahterRecord.main.temp}&deg;C</span></div>
                                       <div className="location"><span id="loc">{weahterRecord.name}, {weahterRecord.sys.country}</span></div>
                                       <br/>
                                       <div className="day"><span id="date">{currentDate}</span></div>
                                       <div className="day"><span id="weekday">{daylist[new Date().getDay()]}</span></div>
                                    </div>
                                    <div className="right">
                                       <div className="top">
                                          <img id="icon" width="75px"
                                             src={`http://openweathermap.org/img/wn/${weahterRecord.weather[0].icon}@2x.png`}/>
                                          <p id="description"></p>
                                       </div>
                                       <div className="bottom">
                                          <div className="humidity">
                                             <span>Humidity:
                                             <span id="humidity">{weahterRecord.main.humidity}</span>%
                                             </span>
                                          </div>
                                          <div className="wind">
                                             <span>Wind: <span id="wind">{weahterRecord.wind.speed}</span> m/s</span>
                                          </div>
                                          <div className="wind">
                                             <span>Min: <span
                                                id="mintemp">{weahterRecord.main.temp_min}</span> &deg;C</span> / <span>Max: <span
                                                id="mmaxtemp">{weahterRecord.main.temp_max}</span> &deg;C</span>
                                          </div>
                                          <div className="Geo">
                                             <span>Geo Location: <span id="GeoLoc">{weahterRecord.coord.lat} , {weahterRecord.coord.lon}</span></span>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </section>
                     </div>
                  </Panel.Body>
               </Panel>
            </PanelGroup>
         </div>
        )
    }
    const pageButton = (p,index)=>{
        return (
            <Button active={index+1===pageNumber} onClick={e=>{setPageNumber(index+1)}}>{index+1} </Button>
        )
    }
 
  
    if(wdata.length>0 && pageDate.length>0){
        return (
            <div>
                {Array.from(pageDate[pageNumber-1]).map(accordian)}
                {pageDate.map(pageButton)}
            </div>
        );
    } else {
        return(
            <div>API Failed</div>
        )
    }

}

export default SearchComponent;