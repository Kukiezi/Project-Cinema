import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './assets/css/index.css'
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import { Router, Route } from 'react-router-dom';
// import ScrollToTop from './components/App/ScrollToTop';
import history from './History';


ReactDOM.render(
<Router history={history}>

    <Route component={App} />

</Router>,
  
  document.getElementById('root') as HTMLElement
);


registerServiceWorker();
