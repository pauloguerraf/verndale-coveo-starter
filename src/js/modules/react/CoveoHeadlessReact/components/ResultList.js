import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ResultList = ({ controller }) => {
  const [state, setState] = useState(controller.state);
  useEffect(() => controller.subscribe(() => setState(controller.state)), []);

  return (
    <ul className="coveo-headless-search-results">
      {state.results?.length === 0 ? (
        <div>No results</div>
      ) : (
        state.results?.map((result, i) => (
          <li key={i} className="coveo-headless-search-result">
            <a href={result.clickUri}>{result.title}</a>
            <p>{result.excerpt}</p>
          </li>
        ))
      )}
    </ul>
  );
};

ResultList.propTypes = {
  controller: PropTypes.object.isRequired
};

export default ResultList;
