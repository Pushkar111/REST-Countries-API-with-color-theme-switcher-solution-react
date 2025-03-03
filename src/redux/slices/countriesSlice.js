
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
  filteredData: [],
  selectedCountry: null,
  status: 'idle',
  error: null,
  searchQuery: '',
  selectedRegion: 'all',
};

export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const fetchCountryByCode = createAsyncThunk(
  'countries/fetchCountryByCode',
  async (code, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
      return response.data[0];
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredData = filterCountries(state.data, state.searchQuery, state.selectedRegion);
    },
    setSelectedRegion: (state, action) => {
      state.selectedRegion = action.payload;
      state.filteredData = filterCountries(state.data, state.searchQuery, state.selectedRegion);
    },
    clearSelectedCountry: (state) => {
      state.selectedCountry = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.filteredData = filterCountries(action.payload, state.searchQuery, state.selectedRegion);
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchCountryByCode.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCountryByCode.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedCountry = action.payload;
      })
      .addCase(fetchCountryByCode.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

const filterCountries = (countries, searchQuery, region) => {
  return countries.filter((country) => {
    const matchesSearch = country.name.common.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = region === 'all' ? true : country.region?.toLowerCase() === region.toLowerCase();
    return matchesSearch && matchesRegion;
  });
};

export const { setSearchQuery, setSelectedRegion, clearSelectedCountry } = countriesSlice.actions;
export default countriesSlice.reducer;
