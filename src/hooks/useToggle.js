import { useEffect, useState } from 'react';

function useToggle(toggleRef) {
  const [toggle, setToggle] = useState(false);

  const onToggleChange = () => setToggle((prev) => !prev);

  const clickToggleOutside = (event) => {
    if (!toggleRef.current?.contains(event.target)) {
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

  return [toggle, onToggleChange];
}

export default useToggle;
