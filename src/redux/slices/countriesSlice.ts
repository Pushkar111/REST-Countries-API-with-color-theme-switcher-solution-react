import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Country {
  name: {
    common: string;
    official: string;
    nativeName?: Record<string, { official: string; common: string }>;
  };
  tld?: string[];
  cca2: string;
  ccn3?: string;
  cca3: string;
  independent?: boolean;
  status?: string;
  unMember?: boolean;
  currencies?: Record<string, { name: string; symbol: string }>;
  capital?: string[];
  altSpellings?: string[];
  region?: string;
  subregion?: string;
  languages?: Record<string, string>;
  translations?: Record<string, { official: string; common: string }>;
  latlng?: number[];
  landlocked?: boolean;
  borders?: string[];
  area?: number;
  flag?: string;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  demonyms?: Record<string, { f: string; m: string }>;
  population?: number;
  continents?: string[];
}

interface CountriesState {
  data: Country[];
  filteredData: Country[];
  selectedCountry: Country | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  searchQuery: string;
  selectedRegion: string;
}

const initialState: CountriesState = {
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
      const response = await axios.get<Country[]>('https://restcountries.com/v3.1/all');
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
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await axios.get<Country[]>(`https://restcountries.com/v3.1/alpha/${code}`);
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
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.filteredData = filterCountries(state.data, state.searchQuery, state.selectedRegion);
    },
    setSelectedRegion: (state, action: PayloadAction<string>) => {
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
        state.error = action.payload as string;
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
        state.error = action.payload as string;
      });
  },
});

const filterCountries = (countries: Country[], searchQuery: string, region: string): Country[] => {
  return countries.filter((country) => {
    const matchesSearch = country.name.common.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = region === 'all' ? true : country.region?.toLowerCase() === region.toLowerCase();
    return matchesSearch && matchesRegion;
  });
};

export const { setSearchQuery, setSelectedRegion, clearSelectedCountry } = countriesSlice.actions;
export default countriesSlice.reducer;
