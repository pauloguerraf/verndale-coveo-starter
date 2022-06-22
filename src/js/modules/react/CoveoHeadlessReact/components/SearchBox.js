import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const SearchBox = ({ controller }) => {
  const [state, setState] = useState(controller.state);
  const isEnterKey = e => e.key === 'Enter';

  useEffect(
    () =>
      controller.subscribe(() => {
        setState(controller.state);
      }),
    []
  );

  const handleKeyDown = e => {
    if (isEnterKey(e)) controller.submit();
  };

  return (
    <>
      <div className="coveo-headless-search-bar">
        <div className="coveo-headless-search-input-container">
          <input
            className="coveo-headless-search-input"
            value={state.value}
            onChange={e => controller.updateText(e.target.value)}
            onKeyDown={e => handleKeyDown(e)}
          />
          {state.suggestions?.length > 0 && (
            <ul>
              {state.suggestions.map(suggestion => {
                const value = suggestion.rawValue;
                return (
                  <li
                    key={value}
                    onClick={() => controller.selectSuggestion(value)}
                  >
                    {value}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <button
          className="coveo-headless-search-btn"
          onClick={() => controller.submit()}
        >
          Search
        </button>
      </div>
    </>
  );
};

SearchBox.propTypes = {
  controller: PropTypes.object.isRequired
};

export default SearchBox;
