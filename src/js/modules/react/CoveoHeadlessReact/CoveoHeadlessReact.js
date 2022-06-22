import React from 'react';
import {
  buildSearchBox,
  buildResultList,
  buildFacet,
  buildHistoryManager
} from '@coveo/headless';
import headlessEngine from './engine';
import SearchBox from './components/SearchBox';
import ResultList from './components/ResultList';
import Facet from './components/Facet';
import History from './components/History';
import UrlManager from './components/UrlManager';

const CoveoHeadlessReact = () => {
  const searchBoxOptions = { numberOfSuggestions: 5 };
  const searchBoxController = buildSearchBox(headlessEngine, {
    searchBoxOptions
  });
  const resultListController = buildResultList(headlessEngine);
  const facetController = buildFacet(headlessEngine, {
    options: {
      numberOfValues: 3,
      field: 'author'
    }
  });
  const historyController = buildHistoryManager(headlessEngine);
  UrlManager(headlessEngine);

  return (
    <>
      <h2 className="coveo-headless-search__heading">Coveo Headless React</h2>
      <History controller={historyController} />
      <SearchBox controller={searchBoxController} />
      <Facet controller={facetController}></Facet>
      <ResultList controller={resultListController} engine={headlessEngine} />
    </>
  );
};

CoveoHeadlessReact.propTypes = {};

export default CoveoHeadlessReact;
