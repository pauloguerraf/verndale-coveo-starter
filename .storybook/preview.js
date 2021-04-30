import { addDecorator } from '@storybook/html';
import create from '@verndale/core';
import svgxhr from 'webpack-svgstore-plugin/src/helpers/svgxhr';
import modules from '../src/js/modules';
import '../src/scss/styles.scss';

const __svg__ = {
  path: '../src/static/images/svg-sprites/**/*.svg',
  name: 'images/svgsheet.svg'
};

svgxhr(__svg__);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' }
};

addDecorator(storyFn => {
  setTimeout(() => create(modules));
  return storyFn();
});
