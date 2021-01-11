import { addons } from '@storybook/addons';
import { addDecorator } from '@storybook/html';
import create from '@verndale/core';
import modules from '../src/js/modules';
import '../src/scss/styles.scss';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}

addDecorator(storyFn => {
  var ajax = new XMLHttpRequest();
  ajax.open('GET', '/images/svgsheet.svg', true);
  ajax.send();
  ajax.onload = function() {
      var div = document.createElement('div');
      div.style.display = 'none';
      div.innerHTML = ajax.responseText;
      document.body.insertBefore( div, document.body.childNodes[0]);
  }

  setTimeout(() => create(modules));
  return storyFn();
});
