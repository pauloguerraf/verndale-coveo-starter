import { buildUrlManager } from '@coveo/headless';

const UrlManager = engine => {
  const fragment = () => window.location.hash.slice(1);
  const urlManager = buildUrlManager(engine, {
    initialState: { fragment: fragment() }
  });
  const onHashChange = () => {
    urlManager.synchronize(fragment());
  };
  window.addEventListener('hashchange', onHashChange);

  const unsubscribeManager = urlManager.subscribe(() => {
    const hash = `#${urlManager.state.fragment}`;
    window.history.pushState(null, document.title, hash);
  });

  return () => {
    window.removeEventListener('hashchange', onHashChange);
    unsubscribeManager();
  };
};

export default UrlManager;
