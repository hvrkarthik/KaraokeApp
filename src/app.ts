import * as React from 'react';
import * as ReactNativeScript from 'react-nativescript';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { MainStack } from './components/MainStack';
import { loadFavorites } from './utils/storage';
import { setFavorites } from './store/favoritesSlice';

// Initialize favorites from storage
store.dispatch(setFavorites(loadFavorites()));

ReactNativeScript.start(
  React.createElement(
    Provider,
    { store },
    React.createElement(MainStack, {}, null)
  )
);