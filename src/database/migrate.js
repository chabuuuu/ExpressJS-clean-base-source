/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
require('ts-node/register');
require('dotenv').config();

require('./umzug').migrator.runAsCLI();
