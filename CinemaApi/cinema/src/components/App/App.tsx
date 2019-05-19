import * as React from 'react';
import 'src/assets/css/App.css'
import { Route, Switch } from 'react-router-dom';
// import Fade from './Fade';
import Footer from '../HomePage/Footer';
import Home from "../HomePage/Home";
import Details from "../Movies/Details";
import NotExist from "./NotExist";
import Navbar from '../Navbar/Navbar';
import ReserveTicket from '../Reservations/ReserveTicket';
import ConfirmReservation from '../Reservations/ConfirmReservation';
import ReviewSection from '../Movies/ReviewSection';

import PersonalData from '../Reservations/PersonalData';
import Reservation from '../Reservations/Reservation';
import Events from '../Events/Events';


import UserProfil from '../Users/UserProfil';
import decode from 'jwt-decode';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowUp, faArrowDown, faComment, faLongArrowAltLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import MovieSchedule from '../Screenings/MovieSchedule';
import Schedule from '../Screenings/Schedule';
// import decode from 'jwt-decode';

library.add(faArrowUp, faArrowDown, faComment, faLongArrowAltLeft, faTimes);
// dostaje użytkownika i w razie errora wylogowuje go bądź jeżeli dostaliśmy nowy token pomyślnie dodaje go do localStorage
function addToStorage(res: any){
  try{
   
    if (res.errorMessage !== null){
      if (res.errorMessage === "Prosimy o ponowne zalogowanie"){
        localStorage.removeItem("User");
        window.location.reload()
        return false;
      }
      
        return false;
    }
   

  } catch (e){
    return false;
  }
  localStorage.setItem("User", JSON.stringify(res))
  return true;
}
// komunikuje sie z api i prosi o nowy token dla użytkownika. Następnie odpala funkcje addToStorage
async function refreshToken(user: any){
  await fetch('https://cinemaapi.azurewebsites.net/api/refresh', {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({token: user.response.token, refreshToken: user.response.refreshToken})
  }).then(res2=>res2.json())
     .then(res2 => addToStorage(res2))
  
}
// pobiera usera ze storage i sprwadza ważność tokena, jeżeli jest nieważny to go wysyła do refreshToken
async function getStorage(){
  try{
  
    const userStorage = localStorage.getItem("User");
      if (userStorage !== null){
        const user = JSON.parse(userStorage);
        const { exp } = decode(user.response.token);
        if (exp < new Date().getTime() / 1000){
          await refreshToken(user);
        }
      }
    } catch (e){
      return false;
    }
    return true;
}
// początkuje proces autoryzacji
async function checkAuth(){
  const result = await getStorage();
  return result;
}
// route, który sprawdza autoryzacje przy każdym przejściu
const AuthRoute = ({ component: Component, ...rest } : any) => (
  // tslint:disable-next-line jsx-no-lambda
  <Route {...rest} render={props => (
    checkAuth() ? (
      <Component {...props} />
    ) : (
      <Component {...props} />
    )
  )} />
)

class App extends React.Component<any, any> {


 
public render() {
  return(

  <div>
    <Navbar/>
    <Switch>
     <AuthRoute path="/" component={Home} exact={true}/>
     <AuthRoute path="/Details/:Id" component={Details}/>
     <AuthRoute path="/ReserveTicket/:Screening/:Showtime" component={ReserveTicket}/>
     <AuthRoute path="/Reservation/:Reserved/:Screening/:UserId/:Showtime" component={Reservation}/>
     <AuthRoute path="/PersonalData/:Reserved/:Screening/:Showtime" component={PersonalData}/>
     <AuthRoute path="/Events" component={Events}/>
     <AuthRoute path="/Repertuar" component={MovieSchedule}/>
     <AuthRoute path="/UserProfil" component={UserProfil}/>
     <AuthRoute path="/ReviewSection/:Id" component={ReviewSection}/>
     <AuthRoute path="/Schedule/:Id" component={Schedule}/>
     <AuthRoute path="/ConfirmReservation/:Id" component={ConfirmReservation}/>
     <Route component={NotExist}/>
     {/* <AuthRoute exact path="/auth" component={Auth}/> */}
    </Switch>
    <Footer footer={"2018"}/>
    
    </div>
  )

}
}


export default App;
