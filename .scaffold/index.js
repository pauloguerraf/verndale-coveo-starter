const fs = require('fs');
const createPage = require('./utils/page');
const createModule = require('./utils/module');
const createJs = require('./utils/js');
const utils = require('./utils/utils');

const action = process.argv[2];
utils.setupReact();
return;


switch (action) {
  case 'page':
    createPage(process.argv);
    break;

  case 'module':
    createModule(process.argv);
    break;

  case 'js':
    createJs(process.argv);
    break;

  default:
    break;
}
