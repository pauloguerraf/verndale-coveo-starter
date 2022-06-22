import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const History = ({ controller }) => {
  const [state, setState] = useState(controller.state);

  useEffect(() => controller.subscribe(() => setState(controller.state)), []);

  return (
    <div className="coveo-headless-search__history-control">
      <h2>History Control</h2>
      <div className="coveo-headless-search__history">
        <button
          className="coveo-headless-search__btn"
          disabled={state.past.length === 0}
          onClick={() => controller.back()}
        >
          Back
        </button>
        <button
          className="coveo-headless-search__btn"
          disabled={state.future.length === 0}
          onClick={() => controller.forward()}
        >
          Forward
        </button>
      </div>
    </div>
  );
};

History.propTypes = {
  controller: PropTypes.object.isRequired
};

export default History;
