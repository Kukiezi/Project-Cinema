import * as React from 'react';
import '../assets/css/App.css';
import { Route, Switch} from 'react-router-dom';
import  AdminPanel from '../components/AdminPanel';
import  MovieManagment from '../components/Movies/MoviesManagment';
import  AddMovie from '../components/Movies/AddMovie';
import  DeleteMovie from '../components/Movies/DeleteMovie';
import  DetailsPanel from '../components/Movies/DetailsPanel';
import CulturalEventManagment from './Events/CulturalEventManagment';
import AddCulturalEvent from './Events/AddCulturalEvent';

class App extends React.Component {


 render() {



  return(

  <div>

    <Switch>
     <Route path="/" component={AdminPanel} exact={true}/>
      <Route path="/AddMovie" component={AddMovie}/>
      <Route path="/DeleteMovie/:Id" component={DeleteMovie}/>  
     <Route path="/AdminPanel" component={AdminPanel}/>
     <Route path="/MovieManagment" component={MovieManagment}/>
     <Route path="/DetailsPanel/:Id" component={DetailsPanel}/>
      <Route path='/CulturalEventManagment' component={CulturalEventManagment}/>
      <Route path='/AddCulturalEvent' component={AddCulturalEvent}/>
    </Switch>

    
    </div>
  )

}
}


export default App;
