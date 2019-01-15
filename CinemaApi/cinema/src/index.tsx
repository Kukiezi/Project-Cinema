import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './assets/css/index.css'
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import { Route, BrowserRouter } from 'react-router-dom';
// import ScrollToTop from './components/App/ScrollToTop';



ReactDOM.render(
<BrowserRouter>

    <Route component={App} />

</BrowserRouter>,
  
  document.getElementById('root') as HTMLElement
);


registerServiceWorker();
