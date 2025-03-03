
import { useState, useCallback, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useAppDispatch } from '@/redux/hooks';
import { setSearchQuery } from '@/redux/slices/countriesSlice';

const SearchInput = () => {
  const dispatch = useAppDispatch();
  const [localQuery, setLocalQuery] = useState('');

  // Debounce search query to avoid too many dispatches
  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setSearchQuery(localQuery));
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [localQuery, dispatch]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(e.target.value);
  }, []);

  return (
    <div className="relative w-full sm:max-w-xs">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search for a country..."
        className="pl-10"
        value={localQuery}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchInput;
