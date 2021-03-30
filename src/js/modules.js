import scaffoldedModules from './scaffolded-modules.json';

export default [
  ...scaffoldedModules.map(module => ({
    name: module.name,
    loader: () => import(module.url)
  }))
];
