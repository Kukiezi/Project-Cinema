import * as React from 'react';
import 'src/assets/css/App.css'
import { Route, Switch} from 'react-router-dom';
import Fade from './Fade';
import Footer from './Footer';
import Home from "./Home";
import Details from "./Details";
import NotExist from "./NotExist";
import Navbar from './Navbar';
import { library } from '@fortawesome/fontawesome-svg-core'

import { faTicketAlt } from '@fortawesome/free-solid-svg-icons'
class App extends React.Component<any, any> {

  
public render() {
  library.add(faTicketAlt);
return(

  <div>
    <Fade>
    <Navbar/>
    </Fade>
    <Switch>
     <Route path="/" component={Home} exact={true}/>
     <Route path="/Details/:Id" component={Details}/>
     <Route path="/ReserveTicket" />
     <Route component={NotExist}/>
    </Switch>
    <Footer footer={"2018"}/>
    
    </div>
)
}

}

export default App;
