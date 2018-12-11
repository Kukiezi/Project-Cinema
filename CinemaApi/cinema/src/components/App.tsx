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

import { AdminPanel } from './AdminPanel';
import { MovieManagment } from './MovieManagment';
import DetailsPanel from './DetailsPanel';
import { AddMovie } from './AddMovie';
import { DeleteMovie } from './DeleteMovie';
class App extends React.Component<any, any> {


public render() {
  library.add(faTicketAlt);


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
     <Route component={NotExist}/>
    </Switch>
    <Footer footer={"2018"}/>
    
    </div>
  )

}
}


export default App;
