
import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleTheme } from '@/redux/slices/themeSlice';

export const ThemeToggle = () => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector((state) => state.theme);
  
  const handleToggle = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  return (
    <Button variant="ghost" size="icon" onClick={handleToggle} aria-label="Toggle theme">
      {mode === 'light' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  );
};

export default ThemeToggle;
