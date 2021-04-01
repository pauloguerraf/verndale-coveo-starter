import scaffoldedModules from './scaffolded-modules.json';

const parsedScaffoldedModules = scaffoldedModules.map(module => {
  const config = {
    name: module.name,
    loader: () => import(module.url)
  };

  if (module.isReact) config.render = (...args) => {
    const React = require('react');
    const { render } = require('react-dom');
    args[1].forEach(node => render(<React.Component {...node.dataset} />, node));
  }
});

export default [
  ...parsedScaffoldedModules
];
