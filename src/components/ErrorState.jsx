
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/redux/hooks';
import { fetchCountries } from '@/redux/slices/countriesSlice';

const ErrorState = ({ message }) => {
  const dispatch = useAppDispatch();

  const handleRetry = () => {
    dispatch(fetchCountries());
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border border-destructive/50 bg-destructive/10 p-6 text-center">
      <AlertCircle className="h-12 w-12 text-destructive" />
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <p className="text-muted-foreground">{message}</p>
      <Button onClick={handleRetry} variant="outline">
        Try Again
      </Button>
    </div>
  );
};

export default ErrorState;
