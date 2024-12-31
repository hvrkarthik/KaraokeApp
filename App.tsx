import * as React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './src/store/store';
import { MainStack } from './src/components/MainStack';
import { loadFavorites } from './src/utils/storage';
import { setFavorites } from './src/store/favoritesSlice';

store.dispatch(setFavorites(loadFavorites()));

export default function App() {
  return (
    <Provider store={store}>
        <MainStack />
    </Provider>
  );
}