
import { Loader2 } from 'lucide-react';

const LoadingState = () => {
  return (
    <div className="flex h-40 w-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="ml-2">Loading...</span>
    </div>
  );
};

export default LoadingState;
