import React from 'react';
import { buildSearchBox, buildResultList, buildFacet } from '@coveo/headless';
import headlessEngine from './engine';
import SearchBox from './components/SearchBox';
import ResultList from './components/ResultList';
import Facet from './components/Facet';

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

  return (
    <>
      <h2 className="coveo-headless-heading">Coveo Headless React</h2>
      <SearchBox controller={searchBoxController} />
      <Facet controller={facetController}></Facet>
      <ResultList controller={resultListController} />
    </>
  );
};

CoveoHeadlessReact.propTypes = {};

export default CoveoHeadlessReact;
