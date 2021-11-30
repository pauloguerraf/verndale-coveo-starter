import 'focus-visible';
import create from '@verndale/core';
import svgxhr from 'webpack-svgstore/dist/helpers/svgxhr';
import modules from './modules';
import { publicPath } from '../../config';

let modulesCreated = false;

svgxhr(`/${publicPath}images/svgsheet.svg`);

document.addEventListener('DOMContentLoaded', () => {
  if (modulesCreated) return;
  modulesCreated = true;

  create(modules);
});
