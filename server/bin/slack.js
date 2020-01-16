#! /usr/bin/env node
/* eslint-disable no-console */

import getApp from '../index.js';

const port = process.env.PORT || 4000;
const app = getApp();
app.listen(port, '0.0.0.0', () => {
  console.log(`Server has been started on ${port}`);
});
