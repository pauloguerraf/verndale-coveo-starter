import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { loadSearchActions } from '@coveo/headless';

const ResultList = ({ controller, engine }) => {
  const [state, setState] = useState(controller.state);
  useEffect(() => controller.subscribe(() => setState(controller.state)), []);

  const { fetchMoreResults } = loadSearchActions(engine);

  return (
    <div>
      <ul className="coveo-headless-search__results">
        {state.results?.length === 0 ? (
          <div>No results</div>
        ) : (
          state.results?.map((result, i) => (
            <li key={i} className="coveo-headless-search__result">
              <a href={result.clickUri}>{result.title}</a>
              <p>{result.excerpt}</p>
            </li>
          ))
        )}
      </ul>
      {state.results?.length > 0 && (
        <div className="coveo-headless-search__load-more">
          <button
            className="coveo-headless-search__load-more-btn"
            onClick={() => {
              engine.dispatch(fetchMoreResults());
            }}
          >
            Load More Results
          </button>
        </div>
      )}
    </div>
  );
};

ResultList.propTypes = {
  controller: PropTypes.object.isRequired,
  engine: PropTypes.object.isRequired
};

export default ResultList;
