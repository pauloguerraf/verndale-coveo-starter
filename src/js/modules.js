import globModules from './glob-modules';

const modules = [
  {
    name: 'accordion',
    loader: () => import('./modules/accordion')
  }
];

export default [...globModules, ...modules];
