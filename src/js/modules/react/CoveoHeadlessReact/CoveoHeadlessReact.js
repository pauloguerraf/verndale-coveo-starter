import React from 'react';
import { buildSearchBox, buildResultList } from '@coveo/headless';
import headlessEngine from './engine';
import SearchBox from './components/SearchBox';
import ResultList from './components/ResultList';

const CoveoHeadlessReact = () => {
  const options = { numberOfSuggestions: 5 };
  const searchBoxController = buildSearchBox(headlessEngine, { options });
  const resultListController = buildResultList(headlessEngine);

  return (
    <>
      <h2 className="coveo-headless-heading">Coveo Headless React</h2>
      <SearchBox controller={searchBoxController} />
      <ResultList controller={resultListController} />
    </>
  );
};

CoveoHeadlessReact.propTypes = {};

export default CoveoHeadlessReact;
