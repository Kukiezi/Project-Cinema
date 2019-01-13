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
import ResetPassword from '../Users/ResetPassword';

import Reservation from '../Reservations/Reservation';
import Events from '../Events/Events';

import { AdminPanel } from '../AdminPanel/AdminPanel';
import { MovieManagment } from '../AdminPanel/Movies/MovieManagment';
import DetailsPanel from '../AdminPanel/Movies/DetailsPanel';
import { AddMovie } from '../AdminPanel/Movies/AddMovie';
import { DeleteMovie } from '../AdminPanel/Movies/DeleteMovie';

import Screenings from '../Screenings/Screenings';
// import decode from 'jwt-decode';

class App extends React.Component<any, any> {


public render() {


//   const checkAuth = () => {
//     const token = localStorage.getItem('token');
//     const refreshToken = localStorage.getItem('refreshToken');
//     if (!token || !refreshToken){
//       return false;
//     }

    // try{
    //   const {exp} = decode(refreshToken);

    //   if (exp < new Date().getTime() / 1000){
    //     return false;
    //   }
    // } catch (e){
    //   return false;
    // }

//     return true
//   }

//  const AuthRoute = ({ component: Component, ...rest } : any) => (
//    <Route {...rest} render={props => (
//      checkAuth() ? (
//        <Component {...props} />
//      ) : (
//        <Redirect to={{ pathname: '/login'}} />
//      )
//    )} />
//  )

  return(

  <div>
    <Navbar/>
    <Switch>
     <Route path="/" component={Home} exact={true}/>
     <Route path="/AddMovie" component={AddMovie}/>
     <Route path="/DeleteMovie/:Id" component={DeleteMovie}/>
     <Route path="/Details/:Id" component={Details}/>
     <Route path="/DetailsPanel/:Id" component={DetailsPanel}/>
     <Route path="/ReserveTicket" component={ReserveTicket}/>
     <Route path="/ResetPassword" component={ResetPassword}/>
     <Route path="/AdminPanel" component={AdminPanel}/>
     <Route path="/MovieManagment" component={MovieManagment}/>
     <Route path="/Reservation/:Reserved" component={Reservation}/>
     <Route path="/Events" component={Events}/>
     <Route path="/Repertuar" component={Screenings}/>
     <Route component={NotExist}/>
     {/* <AuthRoute exact path="/auth" component={Auth}/> */}
    </Switch>
    <Footer footer={"2018"}/>
    
    </div>
  )

}
}


export default App;
