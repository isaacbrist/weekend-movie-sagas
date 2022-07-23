import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import {createStore, combineReducers, applyMiddleware} from 'redux';
// Provider allows us to use redux within our react app
import {Provider} from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import {takeEvery, put} from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery('FETCH_MOVIES', fetchAllMovies);
  yield takeEvery('FETCH_DETAILS', fetchDetails);
}

function* fetchAllMovies() {
  // get all movies from the DB
  try {
    const movies = yield axios.get('/api/movie');
    console.log('get all:', movies.data);
    yield put({type: 'SET_MOVIES', payload: movies.data});
  } catch {
    console.log('get all error');
  }
}
//get all details of one movie
function* fetchDetails(action) {
  try {
    const detailsResponse = yield axios.get(`/api/movie/${action.payload}`);
    console.log(
      'In fetchDetails, this is detailsResponse.data',
      detailsResponse.data
    );
    yield put({type: 'SEND_DETAILS', payload: detailsResponse.data[0]}); //might need [0] after  data
  } catch (error) {
    console.log('error in fetchDetails', error);
  }
}
// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload;
    default:
      return state;
  }
};

// Used to store the movie genres
const genres = (state = [], action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return action.payload;
    default:
      return state;
  }
};
//Used to store the details of the specified movie
const details = (state = {}, action) => {
  switch (action.type) {
    case 'SEND_DETAILS':
      return action.payload;
    default:
      return state;
  }
};
// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
    details,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger)
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={storeInstance}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
