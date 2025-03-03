
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCountryByCode, clearSelectedCountry } from '@/redux/slices/countriesSlice';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';

const CountryDetails = () => {
  const { countryCode } = useParams<{ countryCode: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedCountry, status, error } = useAppSelector((state) => state.countries);

  useEffect(() => {
    if (countryCode) {
      dispatch(fetchCountryByCode(countryCode));
    }

    return () => {
      dispatch(clearSelectedCountry());
    };
  }, [countryCode, dispatch]);

  const handleBackClick = () => {
    navigate(-1);
  };

  if (status === 'loading') {
    return <LoadingState />;
  }

  if (status === 'failed' && error) {
    return <ErrorState message={error} />;
  }

  if (!selectedCountry) {
    return null;
  }

  // Get languages as array
  const languages = selectedCountry.languages
    ? Object.values(selectedCountry.languages)
    : [];

  // Get currencies as array
  const currencies = selectedCountry.currencies
    ? Object.values(selectedCountry.currencies).map((currency) => currency.name)
    : [];

  // Get native name if available
  const nativeName = selectedCountry.name.nativeName
    ? Object.values(selectedCountry.name.nativeName)[0]?.common
    : selectedCountry.name.common;

  return (
    <div className="space-y-8">
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={handleBackClick}
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="overflow-hidden rounded-lg">
          <img
            src={selectedCountry.flags.svg}
            alt={selectedCountry.flags.alt || `Flag of ${selectedCountry.name.common}`}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{selectedCountry.name.common}</h1>

          <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Native Name:</span> {nativeName}
              </p>
              <p>
                <span className="font-semibold">Population:</span>{' '}
                {selectedCountry.population?.toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">Region:</span> {selectedCountry.region}
              </p>
              <p>
                <span className="font-semibold">Sub Region:</span>{' '}
                {selectedCountry.subregion || 'N/A'}
              </p>
              <p>
                <span className="font-semibold">Capital:</span>{' '}
                {selectedCountry.capital?.join(', ') || 'N/A'}
              </p>
            </div>

            <div className="space-y-2">
              <p>
                <span className="font-semibold">Top Level Domain:</span>{' '}
                {selectedCountry.tld?.join(', ') || 'N/A'}
              </p>
              <p>
                <span className="font-semibold">Currencies:</span>{' '}
                {currencies.length > 0 ? currencies.join(', ') : 'N/A'}
              </p>
              <p>
                <span className="font-semibold">Languages:</span>{' '}
                {languages.length > 0 ? languages.join(', ') : 'N/A'}
              </p>
            </div>
          </div>

          {selectedCountry.borders && selectedCountry.borders.length > 0 && (
            <div className="pt-4">
              <h2 className="mb-3 text-xl font-semibold">Border Countries:</h2>
              <div className="flex flex-wrap gap-2">
                {selectedCountry.borders.map((border) => (
                  <Button
                    key={border}
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/country/${border}`)}
                  >
                    {border}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
