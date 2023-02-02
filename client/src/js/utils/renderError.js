import { el } from 'redom';

const renderError = (error) => {
  const container = el(
    'div.container',
    el('h2.section-header.error-message', error)
  );
  return container;
};

export { renderError as default };
