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

  setTimeout(()=> create(modules)); //requestanimationframe
  return storyFn();
});

// get an instance to the communication channel for the manager and preview
const channel = addons.getChannel();

// switch body class for story along with interface theme
channel.on('DARK_MODE', isDark => {
  console.log(isDark)
  if (isDark) {
    document.body.classList.add('body--dark');
  } else {
    document.body.classList.remove('body--dark');
  }
});
