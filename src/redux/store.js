
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import countriesReducer from './slices/countriesSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    countries: countriesReducer,
  },
});
