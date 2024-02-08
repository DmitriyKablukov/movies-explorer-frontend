import './BurgerMenu.css';
import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';

export default function BurgerMenu({ isBurgerOpen, handleBurgerClick }) {
  const screenTablet = useMediaQuery({ query: `(max-width: 768px)` });

  function handleOnClick() {
    handleBurgerClick();
  }

  useEffect(() => {
    if (!screenTablet && isBurgerOpen) {
      handleBurgerClick();
    }
  }, [isBurgerOpen, screenTablet, handleBurgerClick]);

  return (
    <button
      className={`burger-button burger-button_${isBurgerOpen ? 'on' : 'off'} `}
      onClick={handleOnClick}
      type='button'
    >
      <span></span>
    </button>
  );
}
