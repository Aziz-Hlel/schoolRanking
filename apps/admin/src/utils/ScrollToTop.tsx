import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollContainer = document.getElementById('main-content'); // adjust selector
    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: 0,
        left: 0,
        // behavior: 'smooth',
      });
    } else {
      // fallback for normal layouts
      window.scrollTo({ top: 0, left: 0 });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
