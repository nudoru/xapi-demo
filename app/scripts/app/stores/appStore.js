/*
Global Redux store

Refer for details on middleware and async middleware
https://medium.com/@meagle/understanding-87566abcfb7a#.1i0s2ov3h

Look at
 https://github.com/acdlite/redux-promise
 https://github.com/acdlite/redux-rx
 */

import {createStore, applyMiddleware} from 'redux';
import logger from './middlewareLogger'
import rootReducer from './reducerRoot';

const createStoreWithMiddleware = applyMiddleware(logger)(createStore);

const configureStore = (initialState) => {
  return createStoreWithMiddleware(rootReducer, initialState);
};

const appStore = configureStore();

// store with no middleware
//const appStore = createStore(rootReducer);

export default appStore;


