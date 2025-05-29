import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = ({ steps = '' }) => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, steps]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;
