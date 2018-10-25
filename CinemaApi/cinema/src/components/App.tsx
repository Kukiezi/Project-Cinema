import * as React from 'react';
import 'src/assets/css/App.css'
import { Route, Switch} from 'react-router-dom';
import Fade from './Fade';
import Footer from './Footer';
import Home from "./Home";
import Details from "./Details";
import NotExist from "./NotExist";
import Navbar from './Navbar';
class App extends React.Component<any, any> {
public render() {
return(

  <div>
    <Fade>
    <Navbar/>
    </Fade>
    <Switch>
     <Route path="/" component={Home} exact={true}/>
     <Route path="/Details/:Id" component={Details}/>
     <Route component={NotExist}/>
    </Switch>
    <Footer footer={"2018"}/>
    </div>
)
}

}

export default App;
