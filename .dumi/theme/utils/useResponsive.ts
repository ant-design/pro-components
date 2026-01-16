import { useEffect, useState } from 'react';

export interface ResponsiveConfig {
  mobile: boolean;
  tablet: boolean;
  desktop: boolean;
}

const useResponsive = (): ResponsiveConfig => {
  const [responsive, setResponsive] = useState<ResponsiveConfig>({
    mobile: false,
    tablet: false,
    desktop: true,
  });

  useEffect(() => {
    const checkResponsive = () => {
      const width = window.innerWidth;
      setResponsive({
        mobile: width < 768,
        tablet: width >= 768 && width < 1024,
        desktop: width >= 1024,
      });
    };

    checkResponsive();
    window.addEventListener('resize', checkResponsive);
    return () => window.removeEventListener('resize', checkResponsive);
  }, []);

  return responsive;
};

export default useResponsive;
