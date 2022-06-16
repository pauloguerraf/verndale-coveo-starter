import {
  buildSearchEngine,
  getSampleSearchEngineConfiguration
} from '@coveo/headless';

const headlessEngine = buildSearchEngine({
  configuration: getSampleSearchEngineConfiguration()
});

export default headlessEngine;
