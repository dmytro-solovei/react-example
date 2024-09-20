import { useEffect } from 'react';

export const useOutsideClick = (ref, callback, active = true) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    if (active) {
      document.addEventListener('click', handleClick);
    }

    return () => {
      document.removeEventListener('click', handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, callback]);
};

