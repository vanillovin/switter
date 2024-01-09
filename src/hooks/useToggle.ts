import { RefObject, useEffect, useState } from 'react';

function useToggle(toggleRef: RefObject<HTMLDivElement>) {
  const [toggle, setToggle] = useState(false);

  const onToggleChange = () => {
    setToggle((prev) => !prev);
  };

  const clickToggleOutside = (event: MouseEvent) => {
    if (toggleRef.current && !toggleRef.current.contains(event.target as Node)) {
      setToggle(false);
    }
  };

  useEffect(() => {
    if (toggle) {
      document.addEventListener('mousedown', clickToggleOutside);
    }
    return () => {
      document.addEventListener('mousedown', clickToggleOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggle]);

  return { toggle, onToggleChange };
}

export default useToggle;
