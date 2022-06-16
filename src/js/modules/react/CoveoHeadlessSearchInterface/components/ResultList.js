import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ResultList = ({ controller }) => {
  const [state, setState] = useState(controller.state);
  useEffect(
    () =>
      controller.subscribe(() => {
        setState(controller.state);
      }),
    []
  );

  return (
    <div className="coveo-headless-results ">
      {state.results?.length === 0 ? (
        <div>No results</div>
      ) : (
        state.results?.map((result, i) => (
          <a key={i} href={result.clickUri}>
            {result.title}
          </a>
        ))
      )}
    </div>
  );
};

ResultList.propTypes = {
  controller: PropTypes.object.isRequired
};

export default ResultList;
