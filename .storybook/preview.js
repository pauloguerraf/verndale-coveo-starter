import 'focus-visible';
import create from '@verndale/core';
import svgxhr from 'webpack-svgstore/dist/helpers/svgxhr';
import modules from '../src/js/modules';
import '../src/scss/styles.scss';

svgxhr('/images/svgsheet.svg');

const viewports = {
  mobile: {
    name: 'Mobile',
    styles: {
      width: '375px',
      height: '812px'
    }
  },
  tablet: {
    name: 'Tablet',
    styles: {
      width: '768px',
      height: '1024px'
    }
  }
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewport: { viewports }
};

export const decorators = [
  storyFn => {
    setTimeout(() => create(modules));
    return storyFn();
  }
];
