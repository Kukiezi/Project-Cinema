import * as React from 'react';
import '../assets/css/App.css';
import { Route, Switch} from 'react-router-dom';
import  AdminPanel from '../components/AdminPanel';
import  MovieManagment from '../components/Movies/MoviesManagment';
import  ScreeningsManagement from '../components/Screenings/ScreeningsManagement';
import  AddScreening from '../components/Screenings/AddScreening';
import  EditScreening from '../components/Screenings/EditScreening';
import  DeleteScreening from '../components/Screenings/DeleteScreening';
import  AddMovie from '../components/Movies/AddMovie';
import  DeleteMovie from '../components/Movies/DeleteMovie';
import  DetailsPanel from '../components/Movies/DetailsPanel';
import CulturalEventManagment from './Events/CulturalEventManagment';
import DeleteCulturalEvent from './Events/DeleteCulturalEvent';
import EventDetailsPanel from './Events/EventDetailsPanel';
import AddCulturalEvent from './Events/AddCulturalEvent';

class App extends React.Component {


 render() {



  return(

  <div>

    <Switch>
     <Route path="/" component={AdminPanel} exact={true}/>
      <Route path="/AddMovie" component={AddMovie}/>
      <Route path="/DeleteMovie/:Id" component={DeleteMovie}/>  
      <Route path="/DeleteScreening/:Id" component={DeleteScreening}/>  
      <Route path="/DeleteCulturalEvent/:Id" component={DeleteCulturalEvent}/>  
     <Route path="/AdminPanel" component={AdminPanel}/>
     <Route path="/MovieManagment" component={MovieManagment}/>
     <Route path="/ScreeningsManagement" component={ScreeningsManagement}/>
     <Route path='/AddScreening' component={AddScreening}/>
     <Route path="/EditScreening/:Id" component={EditScreening}/>
     <Route path="/EventDetailsPanel/:Id" component={EventDetailsPanel}/>
     <Route path="/DetailsPanel/:Id" component={DetailsPanel}/>
      <Route path='/CulturalEventManagment' component={CulturalEventManagment}/>
      <Route path='/AddCulturalEvent' component={AddCulturalEvent}/>
    </Switch>

    
    </div>
  )

}
}


export default App;
