import {FormControl, FormGroup, MenuItem, Nav, Navbar, NavDropdown,Button, NavItem} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {Link} from "react-router-dom";
import {useState} from "react";
import cityList from './current.city.list.json';

function MyNavbar(props) {
   const [updateSearchId, setUpdateSearchId] = useState([]);
   const [err, setErr] = useState([]);

   const checkInput = () => {
      var input = document.getElementById('enterCity').value;
      var found = false;
      if (input != "") {
         var str = input.replace(/\s/g, "&nbsp;");
         var found = verifyCity(input);
      }
      if (found == true) {
         setUpdateSearchId(str);
         setErr("");
      } else {
         setErr("Please enter a valid city name");
      }

   }

   const verifyCity = (str) => {

      var found = false;
      var userStr = str.replace(/\s/g, "&nbsp;");
      var strComma = userStr.substr(str.length - 3, 1);
      var reg1 = /[a-zA-z]+ *, *[a-zA-Z][a-zA-Z]/g;
      var reg2 = /[a-zA-Z]+/g;
      if (reg1.test(userStr) == true || reg2.test(userStr) == true) {

         for (var i = 0; i < cityList.length; i++) {
            //if no comma in the input then use $.each to loop through the country list file to find out the country ID
            if (strComma != ",") {
               if (userStr.toUpperCase() == (cityList[i].name).toUpperCase()) {
                  found = true;
               }
            } else {
               var countryCode = userStr.substr(userStr.length - 2, 2);
               var cityName = userStr.substr(0, userStr.length - 3);
               if (countryCode.toUpperCase() == (cityList[i].country).toUpperCase() && cityName.toUpperCase() == (cityList[i].name).toUpperCase()) {
                  found = true;
               }
            }
         }
      }

      return found;
   }

    return (
        <div >
        <Navbar inverse collapseOnSelect staticTop>
           <Navbar.Header>
              <LinkContainer to="/">
                 <Navbar.Brand>BTI425-Weather</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle />
           </Navbar.Header>
           <Navbar.Collapse>
              <Nav>
                 <NavDropdown title="Previously Viewed" id="basic-nav-dropdown">
                    {props.recentlyViewed.length > 0 ? props.recentlyViewed.map((cityWeatherObject, index)=>(
                    <LinkContainer to={`/City/${cityWeatherObject.name}`} key={index}>
                       <MenuItem ><Link className="btn btn-default" to={"/City/" + cityWeatherObject.name + "," +cityWeatherObject.sys.country}>{cityWeatherObject.name} : {cityWeatherObject.id}</Link></MenuItem>
                    </LinkContainer>
                    )) :  
                    <MenuItem>No Viewed History</MenuItem>
                    }
                 </NavDropdown>
              </Nav>
              <Navbar.Form pullRight>
                 <FormGroup>
                    <FormControl type="text" id="enterCity" onChange={checkInput} placeholder="Enter City ID" />
                 </FormGroup>
                 {' '}
                 <Link className="btn btn-default" to={"/City/" + updateSearchId}>
                 Search</Link>
                 {err !=""?
                 <div id="err">{err}</div>
                 :
                 <div></div>
                 }             
              </Navbar.Form>
           </Navbar.Collapse>
        </Navbar>
        <div id="err">{err}</div>
     </div>
    );
 
}

export default MyNavbar;
