#! /usr/bin/env node
/* eslint-disable no-console */

import getApp from '..';

const port = process.env.PORT || 5000;
const app = getApp();
app.listen(port, '0.0.0.0', () => {
  console.log(`Server has been started on ${port}`);
});
