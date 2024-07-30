require('ts-node/register');
require('dotenv').config()

require('./umzug').migrator.runAsCLI();