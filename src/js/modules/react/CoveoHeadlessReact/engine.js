import {
  buildSearchEngine,
  getSampleSearchEngineConfiguration
} from '@coveo/headless';

const headlessEngine = buildSearchEngine({
  configuration: getSampleSearchEngineConfiguration(),
  loggerOptions: { level: 'info' }
});

export default headlessEngine;
