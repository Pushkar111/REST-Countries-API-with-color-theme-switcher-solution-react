
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Country } from '@/redux/slices/countriesSlice';

interface CountryCardProps {
  country: Country;
}

const CountryCard = React.memo(({ country }: CountryCardProps) => {
  return (
    <Link to={`/country/${country.cca3}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-md">
        <div className="aspect-[4/3] w-full overflow-hidden">
          <img
            src={country.flags.png}
            alt={country.flags.alt || `Flag of ${country.name.common}`}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardHeader className="pb-2">
          <h2 className="line-clamp-1 text-xl font-bold">{country.name.common}</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <p>
              <span className="font-semibold">Population:</span>{' '}
              {country.population?.toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Region:</span> {country.region}
            </p>
            <p>
              <span className="font-semibold">Capital:</span>{' '}
              {country.capital?.join(', ') || 'N/A'}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
});

CountryCard.displayName = 'CountryCard';

export default CountryCard;
