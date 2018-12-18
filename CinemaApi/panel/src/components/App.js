import * as React from 'react';
import '../assets/css/App.css';
import { Route, Switch} from 'react-router-dom';
import  AdminPanel from '../components/AdminPanel';
import  MovieManagment from '../components/MoviesManagment';
import  AddMovie from '../components/AddMovie';
import  DeleteMovie from '../components/DeleteMovie';
import  DetailsPanel from '../components/DetailsPanel';

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
   
    </Switch>

    
    </div>
  )

}
}


export default App;
