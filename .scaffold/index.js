const createPage = require('./utils/page');
const createModule = require('./utils/module');
const createJs = require('./utils/js');
const createReact = require('./utils/react');

const action = process.argv[2];

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

  case 'react':
    createReact(process.argv);
    break;

  default:
    break;
}
