import create from '@verndale/core';
import modules from './modules';

let modulesCreated = false;

document.addEventListener('DOMContentLoaded', () => {
  if (modulesCreated) return;
  modulesCreated = true;

  create(modules);
});
