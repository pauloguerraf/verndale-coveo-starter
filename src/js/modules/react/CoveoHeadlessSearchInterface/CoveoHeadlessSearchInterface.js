import React from 'react';
import { buildSearchBox, buildResultList } from '@coveo/headless';
import headlessEngine from './engine';
import SearchBox from './components/SearchBox';
import ResultList from './components/ResultList';

const CoveoHeadlessSearchInterface = () => {
  const options = { numberOfSuggestions: 5 };
  const searchBoxController = buildSearchBox(headlessEngine, { options });
  const resultListController = buildResultList(headlessEngine);

  return (
    <>
      <SearchBox controller={searchBoxController} />
      <ResultList controller={resultListController} />
    </>
  );
};

CoveoHeadlessSearchInterface.propTypes = {};

export default CoveoHeadlessSearchInterface;
