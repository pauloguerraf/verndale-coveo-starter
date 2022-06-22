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
    name: 'CoveoHeadless',
    loader: () => import('./modules/CoveoHeadless')
  },
  {
    name: 'CoveoHeadlessReact',
    loader: () => import('./modules/react/CoveoHeadlessReact'),
    render: reactModule
  }
];

export default [...globModules, ...modules];
