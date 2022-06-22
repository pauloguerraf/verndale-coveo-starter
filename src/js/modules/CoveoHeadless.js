import { Component } from '@verndale/core';
import {
  buildSearchEngine,
  getSampleSearchEngineConfiguration,
  buildSearchBox,
  buildResultList
} from '@coveo/headless';

class CoveoHeadless extends Component {
  setupDefaults() {
    this.dom = {
      searchBox: this.el.querySelector('.coveo-headless-search__input'),
      searchButton: this.el.querySelector('.coveo-headless-search__btn'),
      resultList: this.el.querySelector('.coveo-headless-search__results')
    };
    this.init();
    this.updateResults();
  }

  init() {
    this.headlessEngine = buildSearchEngine({
      configuration: getSampleSearchEngineConfiguration(),
      loggerOptions: { level: 'info' }
    });
    this.searchBoxController = buildSearchBox(this.headlessEngine);
    this.resultListController = buildResultList(this.headlessEngine);
    this.resultListController.subscribe(() => {
      this.updateResults();
    });
  }

  addListeners() {
    this.dom.searchBox.addEventListener(
      'input',
      this.handleInputChange.bind(this)
    );
    this.dom.searchBox.addEventListener(
      'keyup',
      this.handleInputKeyUp.bind(this)
    );
    this.dom.searchButton.addEventListener(
      'click',
      this.handleSearchSubmit.bind(this)
    );
  }

  updateResults() {
    if (this.resultListController.state.results.length > 0)
      this.dom.resultList.style.display = 'block';
    else this.dom.resultList.style.display = 'none';

    this.dom.resultList.innerHTML = '';

    this.resultListController.state.results.forEach(result => {
      const link = document.createElement('a');
      link.href = result.clickUri;
      link.innerText = result.title;

      const excerpt = document.createElement('p');
      excerpt.innerHTML = result.excerpt;

      const li = document.createElement('li');
      li.classList.add('coveo-headless-search__result');
      li.appendChild(link);
      li.appendChild(excerpt);

      this.dom.resultList.appendChild(li);
    });
  }

  handleInputChange() {
    this.searchBoxController.updateText(this.dom.searchBox.value);
  }

  handleInputKeyUp(e) {
    if (e.keyCode === 13) this.searchBoxController.submit();
  }

  handleSearchSubmit() {
    this.searchBoxController.submit();
  }
}

export default CoveoHeadless;
