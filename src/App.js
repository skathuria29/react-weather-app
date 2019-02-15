import React from 'react'
import ReactDOM from 'react-dom'
import '@babel/polyfill';

import WeatherApp from './components/WeatherApp';
// import 'normalize.css/normalize.css'; //all browsers work on same styles base
import './styles/styles.scss';

ReactDOM.render(<WeatherApp />, document.getElementById('app'));

