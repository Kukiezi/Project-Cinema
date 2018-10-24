import * as React from 'react';
import 'src/assets/css/App.css'
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from "./Home";
import Details from "./Details";
import NotExist from "./NotExist";
import Navbar from './Navbar';
class App extends React.Component<any, any> {
public render() {
return(
  <BrowserRouter>
  <div>
  <Navbar/>
    <Switch>
     <Route path="/" component={Home} exact={true}/>
     <Route path="/Details" component={Details}/>
     <Route component={NotExist}/>
    </Switch>
    </div>
  </BrowserRouter>
)
}

}

export default App;
