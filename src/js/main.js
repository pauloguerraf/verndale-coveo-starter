import create from '@verndale/core';
import svgxhr from 'webpack-svgstore/dist/helpers/svgxhr';
import modules from './modules';

let modulesCreated = false;

svgxhr('/images/svgsheet.svg');

document.addEventListener('DOMContentLoaded', () => {
  if (modulesCreated) return;
  modulesCreated = true;

  create(modules);
});
