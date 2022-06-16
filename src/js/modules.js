/* eslint-disable global-require */
import globModules from './glob-modules';

const reactModule = (Component, nodeList) => {
  const React = require('react');
  const { render } = require('react-dom');

  nodeList.forEach(node => render(<Component {...node.dataset} />, node));
};

const modules = [
  {
    name: 'CoveoAtomicSearchInterface',
    loader: () => import('./modules/CoveoAtomicSearchInterface')
  },
  {
    name: 'CoveoHeadlessSearchInterface',
    loader: () => import('./modules/react/CoveoHeadlessSearchInterface'),
    render: reactModule
  }
];

export default [...globModules, ...modules];
