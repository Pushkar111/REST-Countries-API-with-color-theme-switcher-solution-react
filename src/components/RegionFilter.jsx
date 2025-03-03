
import { useCallback } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setSelectedRegion } from '@/redux/slices/countriesSlice';

const RegionFilter = () => {
  const dispatch = useAppDispatch();
  const selectedRegion = useAppSelector((state) => state.countries.selectedRegion);

  const handleRegionChange = useCallback(
    (value) => {
      dispatch(setSelectedRegion(value));
    },
    [dispatch]
  );

  return (
    <Select value={selectedRegion} onValueChange={handleRegionChange}>
      <SelectTrigger className="w-full sm:w-[180px]">
        <SelectValue placeholder="Filter by Region" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Regions</SelectItem>
        <SelectItem value="Africa">Africa</SelectItem>
        <SelectItem value="Americas">Americas</SelectItem>
        <SelectItem value="Asia">Asia</SelectItem>
        <SelectItem value="Europe">Europe</SelectItem>
        <SelectItem value="Oceania">Oceania</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default RegionFilter;
