import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './assets/css/index.css'
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';


ReactDOM.render(
<BrowserRouter>
  <ScrollToTop>
    <App />
  </ScrollToTop>
</BrowserRouter>,
  
  document.getElementById('root') as HTMLElement
);


registerServiceWorker();
