import * as React from 'react';
import 'src/assets/css/App.css'
import { Route, Switch} from 'react-router-dom';
// import Fade from './Fade';
import Footer from './Footer';
import Home from "./Home";
import Details from "./Details";
import NotExist from "./NotExist";
import Navbar from './Navbar';

import { library } from '@fortawesome/fontawesome-svg-core'

import { faTicketAlt } from '@fortawesome/free-solid-svg-icons'
import ReserveTicket from './ReserveTicket';
import ResetPassword from './ResetPassword';

import Reservation from './Reservation';
import Events from './Events';

class App extends React.Component<any, any> {


public render() {
  library.add(faTicketAlt);


  return(

  <div>
    <Navbar/>
    <Switch>
     <Route path="/" component={Home} exact={true}/>
     <Route path="/Details/:Id" component={Details}/>
     <Route path="/ReserveTicket" component={ReserveTicket}/>
     <Route path="/ResetPassword" component={ResetPassword}/>
     <Route path="/Reservation/:idSeat" component={Reservation}/>
     <Route path="/Events" component={Events}/>
     <Route component={NotExist}/>
    </Switch>
    <Footer footer={"2018"}/>
    
    </div>
  )

}
}


export default App;
