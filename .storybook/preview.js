import { addDecorator } from '@storybook/html';
import create from '@verndale/core';
import modules from '../src/js/modules';
import '../src/scss/styles.scss';

const svgSheet = () => `
  <script>
    fetch('/images/svgsheet.svg')
      .then((blob) => blob.text())
      .then((response) => {
        const div = document.createElement('div')
        div.style.display = 'none'
        div.innerHTML = response
        document.body.insertBefore(div, document.body.childNodes[0])
      })
  </script>
`;

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' }
};

addDecorator(storyFn => {
  setTimeout(() => create(modules));
  return storyFn();
});

export const decorators = [
  story => `
  ${story()}
  ${svgSheet()}
`
];
