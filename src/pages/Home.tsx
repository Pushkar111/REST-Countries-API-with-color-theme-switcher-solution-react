
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCountries } from '@/redux/slices/countriesSlice';
import SearchInput from '@/components/SearchInput';
import RegionFilter from '@/components/RegionFilter';
import CountryCard from '@/components/CountryCard';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';

const Home = () => {
  const dispatch = useAppDispatch();
  const { status, filteredData, error } = useAppSelector((state) => state.countries);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCountries());
    }
  }, [dispatch, status]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput />
        <RegionFilter />
      </div>

      {status === 'loading' && <LoadingState />}
      
      {status === 'failed' && error && <ErrorState message={error} />}
      
      {status === 'succeeded' && (
        <>
          {filteredData.length === 0 ? (
            <div className="mt-12 text-center">
              <h2 className="text-xl font-semibold">No countries found</h2>
              <p className="mt-2 text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredData.map((country) => (
                <CountryCard key={country.cca3} country={country} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
