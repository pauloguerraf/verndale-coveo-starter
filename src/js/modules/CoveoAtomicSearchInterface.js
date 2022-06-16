import { Component } from '@verndale/core';
import '@coveo/atomic';
import { defineCustomElements } from '@coveo/atomic/loader';

class CoveoAtomicSearchInterface extends Component {
  setupDefaults() {
    this.dom = {
      searchInterface: this.el.querySelector('atomic-search-interface'),
      searchBox: this.el.querySelector('atomic-search-box')
    };
    defineCustomElements(window); // IMPORTANT to define the custom elements when using import '@coveo/atomic'
    this.init();
  }

  async init() {
    await customElements.whenDefined(this.dom.searchInterface.localName);
    const searchInterface = document.querySelector('atomic-search-interface');
    await searchInterface.initialize({
      accessToken: 'xx564559b1-0045-48e1-953c-3addd1ee4457',
      organizationId: 'searchuisamples'
    });
    searchInterface.executeFirstSearch();
  }

  addListeners() {}
}

export default CoveoAtomicSearchInterface;
