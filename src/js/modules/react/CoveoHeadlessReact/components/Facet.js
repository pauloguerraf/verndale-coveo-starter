import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Facet = ({ controller }) => {
  const [state, setState] = useState(controller.state);
  useEffect(() => controller.subscribe(() => setState(controller.state)), []);

  if (!state.values.length) {
    return <div className="coveo-headless-search__facets">No facet values</div>;
  }

  return (
    <ul className="coveo-headless-search__facets">
      <li>
        <ul>
          {state.values.map(value => (
            <li key={value.value} className="coveo-headless-search__facet-item">
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={controller.isValueSelected(value)}
                  onChange={() => controller.toggleSelect(value)}
                  disabled={state.isLoading}
                />
                <span className="checkmark"></span>
              </label>
              <div>
                {value.value} ({value.numberOfResults} results)
              </div>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  );
};

Facet.propTypes = {
  controller: PropTypes.object.isRequired
};

export default Facet;
