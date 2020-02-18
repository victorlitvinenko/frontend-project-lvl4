import 'core-js/stable';
import 'regenerator-runtime/runtime';
import gon from 'gon';

import '../assets/application.scss';
import '../assets/favicon.ico';
import run from './index.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

run(gon);
