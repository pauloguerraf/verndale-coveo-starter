import { Component } from '@verndale/core';
import { Accordion } from '@verndale/front-end-components';

class Module extends Component {
  constructor(el) {
    super(el);

    new Accordion(document.querySelector('.accordion'),
      {
        selectedAccordion: 1
      });
  }
}

export default Module;
