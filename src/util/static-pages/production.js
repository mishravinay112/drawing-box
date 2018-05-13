import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import reducers from '../../reducers';
import axios from 'axios';

//Use this when need to add some data from start
const getDataFromApi = url => {
  return axios.get(url)
    .then(response => JSON.parse(response))
    .catch(error => {
      // error handling here
      return {
        data: null,
        error: error
      };
    });
};

export default (head, renderProps) => {
  const store = createStore(reducers);
  const preloadedState = store.getState();
  const html = renderToString(
    <Provider store={store}>
      <Router {...renderProps} />
    </Provider>
  );

  return `
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width">
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        <link type='text/css' rel='stylesheet' href='/bundle.css'>
      </head>
      <body>
        <div id='app'>${html}
        </div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
        </script>
        <script src='/bundle.js'></script>
      </body>
    </html>
  `;
};
