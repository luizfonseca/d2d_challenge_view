import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import moment from 'moment/min/moment-with-locales';
import Moment from 'react-moment';

// Sets the moment instance to use.
Moment.globalMoment = moment;


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
