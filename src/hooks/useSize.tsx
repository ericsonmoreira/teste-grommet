import { ResponsiveContext } from 'grommet';
import { useContext } from 'react';

type UseSizeDate = 'small' | 'medium' | 'large';

export function useSize(): UseSizeDate {
  const size = useContext(ResponsiveContext);
  return size as UseSizeDate;
}
